# backend-desafio-process
## Instalación

1. Forkear y clonar el repo

2. En la raíz del proyecto, correr el siguiente comando para instalar todas las dependecias del proyecto: 

   ```
   npm install
   ```

3. Requisitos:

   - Instalar XAMPP
   - Iniciar Apache y MySQL
   - En http://localhost/phpmyadmin/ crear la base de datos "ecommerce" para poder usarla
   - Crear un archivo .env con la variable MONGO_URL="Ruta de Mongo Atlas"

4. Para correr el proyecto, disponible en http://localhost:8080, usar uno de los siguientes comandos:

   ```
   node app.js xxxx
   npm start xxxx
   ```
Nota: xxxx es el numero de puerto a utilizar. El proyecto estará disponible en http://localhost:xxxx

5. 
  - /info devuelve la Info solicitada en el desafio
  - /api/randoms genera numeros randoms, y luego devuelve los mismos con la cantidad de veces que salio cada uno. Si se quiere especificar una cantidad de numeros a genera colocarlo como query en la misma ruta. Ejemplo: /api/randoms?cant=5000000
