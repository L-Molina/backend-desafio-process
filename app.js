// session
const session = require("express-session"); 

// passport
const passport = require("passport"); 

// cookieParser
const cookieParser = require("cookie-parser");

// dotenv
const dotenv = require("dotenv");
dotenv.config();

// minimist
const minimist = require("minimist");

// process
const { fork } = require("child_process");

// chat
const chat = require("./src/utils/chat");

// router
const router = require("./src/routes")

// express
const express = require("express");
const app = express();

// socket.io 
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

// Mongo Atlas
const MongoStore = require("connect-mongo");
const advanceOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// dataBase
app.use(cookieParser());
let mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/test';

// middleware
/* session */
app.use(
  session({
    store: new MongoStore({ 
      mongoUrl: mongoUrl,
      mongoOptions: advanceOptions   
    }),     
    secret: "coderhouse",
    resave: true,
    saveUninitialized: true,
    rolling: true, 
    cookie: { maxAge: 60000 },
  })
);

/* autenticacion */
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + "/public"));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

// plantillas
app.set('views', './src/views');
app.set('view engine', 'ejs');

// io.on
io.on('connection', async function(socket) {
  console.log('Un cliente se ha conectado'); 
  const messages = await chat.showMessage();  
  socket.emit('messages', messages);
 
  io.sockets.emit('productos');

  socket.on ('new-message', async function (data){
    try {
      chat.saveMessage(data);
      const messages = await chat.showMessage();      
      io.sockets.emit('messages', messages);
    } catch (err) {
      console.log(err);
    }
  });
});

// PORT
let puerto = 8080
let data = minimist(["-p",process.argv.slice(2)])
if(typeof(data.p) === "number"){
  puerto = data.p
};

// httpServer
httpServer.listen(puerto, function() {
  console.log(`Servidor corriendo en puerto ${puerto}`);
});