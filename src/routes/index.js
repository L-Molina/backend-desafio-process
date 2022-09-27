const express = require("express");
const router = express.Router();

const products = require("./product/productRouter");
const productsList = require("./product/productListRouter");
const productsFaker = require("./product/productFakerRouter");
const home = require("./home/homeRouter");
const homeFaker = require("./home/homeFakerRouter");
const login = require("./login/loginRouter");
const loginError = require("./login/loginErrorRouter");
const logout = require("./login/logoutRouter");
const register = require("./login/registerRouter");
const info = require("./other/infoRouter");
const randoms = require("./other/randomsRouter");

//middleware
router.use("/productos", products);
router.use("/lista-productos", productsList);
router.use("/", home);
router.use("/login", login);
router.use("/loginerror", loginError);
router.use("/register", register);
router.use("/logout", logout);
router.use("/api/productos-test", homeFaker);
router.use("/api/faker-list", productsFaker);
router.use("/info", info);
router.use("/api/randoms", randoms);

module.exports = router;