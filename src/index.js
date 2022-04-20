require('dotenv').config({ path: 'variables.env' });
const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require("jsonwebtoken");
const path = require('path');
const fileUpload = require('express-fileupload');
//const path = require('path');

// Enable cors
const configCors = {
  origin: process.env.FRONTEND_URL,
};
app.use(cors());

const publicPath = path.resolve(__dirname, './uploads/uploads2');
app.use(express.static(publicPath));
app.use(express.static('src/uploads'));
//middleware para subir archivos
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

// Permision to read values by json format
app.use(express.json());
//app.use(express.static(path.resolve(__dirname, '../public')));

// Routes
app.use('/', require('./routes/user.routes'));
app.use('/', require('./routes/login.routes'));
app.use('/', require('./routes/clientes.routes'));
app.use("/", require('./routes/code.routes'));

app.use('/', require('./routes/ubicacionesGeograficas.routes'));
 app.use(function(req, res, next) {
  const authHeader = req.headers.authorization;

  if(!authHeader){
    return res.status(403).json({
      error: 'No está autorizado para realizar esta acción'
    });
  } else {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.SECRETPRIVATEKEY, function(err, user) {
      if (err) {
        return res.status(403).json({
          error: 'No está autorizado para realizar esta acción'
        });
      } else {
        next();
      }
    });
  }

}); 


app.use('/', require('./routes/adminuser.routes'));
app.use('/', require('./routes/clientes.routes'));
app.use('/', require('./routes/mascotas.routes'));
app.use('/', require('./routes/citas.routes'));
app.use('/', require('./routes/desparasitaciones.routes'));
app.use('/', require('./routes/vacunas.routes'));
app.use('/', require('./routes/hospitalizacion.routes'));

app.use("/", require('./routes/inventarios.routes'));

app.use('/', require('./routes/vacTVacuc.routes'));
app.use('/', require('./routes/lists/tipSxx9z.list.routes.js'));

app.use('/', require('./routes/exaTExamg.routes'));
app.use('/', require('./routes/hisTExamg.son.routes'));
app.use('/', require('./routes/modals/masoaNMb.modal.routes.js'));
app.use('/', require('./routes/testimg.routes'));
app.use('/', require('./routes/publicacionesComentarios.routes'));
app.use('/', require('./routes/publicacionFotos.routes'));
app.use('/', require('./routes/loginClientes.routes'));

//REPLACE

app.use('/', require('./routes/publicaciones.routes'));

app.use(require('./routes/routes'));
/// imagenes de manera publica

// Port
const port = process.env.PORT || 4001;





// Listen
app.listen(port, '0.0.0.0', () => {
  console.log('Server is Running at port ' + port);
});
