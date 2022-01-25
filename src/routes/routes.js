const express = require('express');
const app = express();
const fileUpload = require('express-fileupload'); // libreria para cargar archivos dentro de una aplicacion

// transforma lo que viene y lo deja en req.files  utilizado para subir los archivos
app.use(fileUpload());

//importamos el objeto router, es necesario especificar el objeto

app.use(require('./fotos.routes').router);
app.use(require('./historialmascotas.routes').router);

//Se exporta app que tiene configurados los métodos HTTP
module.exports = app;
