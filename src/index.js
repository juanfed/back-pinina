require('dotenv').config({ path: 'variables.env' });
const express = require('express');
const app = express();
const cors = require('cors');
//const path = require('path');

// Enable cors
const configCors = {
  origin: process.env.FRONTEND_URL,
};
app.use(cors());

// Permision to read values by json format
app.use(express.json());
//app.use(express.static(path.resolve(__dirname, '../public')));

// Routes
app.use('/', require('./routes/ubicacionesGeograficas.routes'));
app.use('/', require('./routes/user.routes'));
app.use('/', require('./routes/login.routes'));
app.use('/', require('./routes/adminuser.routes'));
app.use('/', require('./routes/clientes.routes'));
app.use('/', require('./routes/mascotas.routes'));
app.use('/', require('./routes/citas.routes'));
app.use('/', require('./routes/desparasitaciones.routes'));
app.use('/', require('./routes/vacunas.routes'));
app.use('/', require('./routes/hospitalizacion.routes'));
app.use("/", require('./routes/code.routes'));
app.use("/", require('./routes/inventarios.routes'));

//REPLACE

app.use(require('./routes/routes'));
/// imagenes de manera publica
app.use(express.static('src/uploads'));
// Port
const port = process.env.PORT || 4001;

// Listen
app.listen(port, '0.0.0.0', () => {
  console.log('Server is Running at port ' + port);
});
