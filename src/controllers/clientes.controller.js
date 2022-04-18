const pool = require('../../database/dbConection');
const { encryptPassword } = require("../utils/encryptPassword");  
const readT_clientes = async (req) => {
  try {
    const { id_usuario } = req.body;

    let respuesta = await pool.query(
      `SELECT * from f_readclientes
                                ($1::numeric)`,
      [id_usuario]
    );

    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === '[]') {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      respuesta = respuesta.rows;
    }

    return respuesta;
  } catch (err) {
    console.log(err);
    throw new Error(`clientes.controller.js->readT_clientes()\n${err}`);
  }
};

const updateT_clientes = async (req) => {
  try {
    const {
      id_clientes,
      tipo_identificacion,
      identificacion,
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      direccion,
      telefono,
      correo,
      codigo_ubicacion_geografica_pais,
      codigo_ubicacion_geografica_departamento,
      codigo_ubicacion_geografica_ciudad,
      codigo_ubicacion_geografica_localidad,
      id_usuario,
    } = req.body;

    let respuesta = await pool.query(
      `SELECT * FROM f_updateclientes($1::numeric, $2::character varying,
                            $3::character varying, $4::character varying, $5::character varying, $6::character varying,
                            $7::character varying, $8::character varying, $9::character varying,
                            $10::character varying, $11::numeric, $12::numeric, $13::numeric, $14::numeric,
                            $15::numeric)`,
      [
        id_clientes,
        tipo_identificacion,
        identificacion,
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        direccion,
        telefono,
        correo,
        codigo_ubicacion_geografica_pais,
        codigo_ubicacion_geografica_departamento,
        codigo_ubicacion_geografica_ciudad,
        codigo_ubicacion_geografica_localidad,
        id_usuario,
      ]
    );

    /**Para verificar que se retorne la fila con los datos actualizados
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === '[]') {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      respuesta = respuesta.rows;
    }

    return respuesta;
  } catch (err) {
    console.log(err);
    throw new Error(`clientes.controller.js->updateT_clientes()\n${err}`);
  }
};

const update_clienteMascota = async (
  id_clientes,
  identificacion,
  primer_nombre,
  segundo_nombre,
  primer_apellido,
  segundo_apellido,
  direccion,
  correo,
  telefono
) => {
  try {
    let respuesta = await pool.query(
      `SELECT id_clientes,
      tipo_identificacion,
      identificacion,
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      direccion,
      correo,
      telefono
       FROM f_updateclientesperfilmascota($1::numeric,
            $2::character varying, $3::character varying, $4::character varying, $5::character varying,
            $6::character varying,$7::character varying,$8::character varying,$9::character varying)`,
      [
        id_clientes,
        identificacion,
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        direccion,
        telefono,
        correo,
      ]
    );

    /**Para verificar que se retorne la fila con los datos actualizados
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === '[]') {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      respuesta = respuesta.rows;
    }

    return respuesta;
  } catch (err) {
    console.log(err);
    throw new Error(
      `clientes.controller.js->f_updateclientesperfilmascota()\n${err}`
    );
  }
};

const readallt_clientes = async (req) => {
  try {
    let respuesta = await pool.query(
      `SELECT * from  public.f_readallclientes()`,
      [id]
    );

    //Verificar que el resultado de la consulta no arroja ningún mensaje

    if (respuesta === '') {
      //Se le asigna null a la respuesta
      respuesta = 'No se encontro clientes';
    }

    return respuesta;
  } catch (err) {
    console.log(err);
    throw new Error(`clientes.controller.js->readT_clientes()\n${err}`);
  }
};

const searchT_clientes = async (id_usuario, param_busqueda) => {
  try {
    let respuesta = await pool.query(
      `SELECT * from f_searchclientes
                            ($1::numeric, $2::character varying)`,
      [id_usuario, param_busqueda]
    );

    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === '[]') {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      respuesta = respuesta.rows;
    }

    return respuesta;
  } catch (err) {
    console.log(err);
    throw new Error(`clientes.controller.js->readallt_clientes()\n${err}`);
  }
};

const createT_clientes = async (req) => {
  try {
    let {

      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      correo,
      contraseña,
      codigo_ubicacion_geografica_pais

    } = req.body;
    




    contraseña = await encryptPassword(contraseña);
   
    let query = `SELECT * FROM f_create_usuario_registro(\'${primer_nombre}\',\'${segundo_nombre}\',\'${primer_apellido}\',\'${segundo_apellido}\',\'${correo}\',${codigo_ubicacion_geografica_pais},\'${contraseña}\')`;
    let respuesta = await pool.query(query);
    /**Para verificar que se retorne la fila con los datos actualizados
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === '[]') {
      //Se le asigna null a la respuesta
      return null;
    } else {
      return respuesta.rows;
    }
  } catch (err) {
    console.log(err);
    throw new Error(`Error en createT_clientes()\n${err}`);
  }
};

const searcht_clientesId = async (id_clientes) => {
  try {
    let respuesta = await pool.query(
      `SELECT * FROM f_searchT_clienteId($1::numeric)`,
      [id_clientes]
    );
    /**Para verificar que se retorne la fila con los datos actualizados
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === '[]') {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      respuesta = respuesta.rows;
    }

    return respuesta;
  } catch (error) {
    throw new Error(`clientes.controller.js->searchT_clienteId()\n${error}`);
  }
};
const searchT_clienteCorreo = async (correo) => {
  try {
  
    let cliente = await pool.query(`select * from f_usuario_correo(\'${correo}\')`);
    if (JSON.stringify(cliente.rows) === '[]') {
      //Se le asigna null a la respuesta
      return null
    } else {
      return cliente.rows;
    }
  } catch (error) {
    throw new Error(`Error en searchT_clienteCorreo()\n${error}`);
  }
}
const deleteT_clientes = async (req) => {
  try {
    const { identificacion } = req.body;

    let respuesta = await pool.query(
      `SELECT * from f_deleteclientes
                                ($1::character varying)`,
      [identificacion]
    );

    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === '[]') {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      respuesta = respuesta.rows;
    }

    return respuesta;
  } catch (err) {
    console.log(err);
    throw new Error(`clientes.controller.js->deleteT_clientes()\n${err}`);
  }
};

const getT_clientesporIdclienteYIdUsuario = async (id_clientes, id_usuario) => {
  try {
    let respuesta = await pool.query(
      `SELECT * from f_searchT_clientesporIdclienteYIdUsuario
                                ($1::numeric,$2::numeric)`,
      [id_clientes, id_usuario]
    );

    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === '[]') {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      respuesta = respuesta.rows;
    }

    return respuesta;
  } catch (err) {
    console.log(err);
    throw new Error(`clientes.controller.js->deleteT_clientes()\n${err}`);
  }
};

const getT_mascotaIdporIdclienteYIdusuario = async (
  id_clientes,
  id_usuario
) => {
  try {
    let respuesta = await pool.query(
      `SELECT id_clientes, tipo_identificacion, identificacion, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, direccion, telefono, correo, password, codigo_ubicacion_geografica_pais, descripcion_pais, codigo_ubicacion_geografica_departamento, descripcion_departamento, codigo_ubicacion_geografica_ciudad, descripcion_ciudad, codigo_ubicacion_geografica_localidad, descripcion_localidad, estado, id_usuario, id_mascotas, nombre_mascota, fecha_nacimiento, edad_mascota, escala_edad, esterilizado, descripcion_mascota, id_clientesmas, id_color, color, id_raza, raza, id_tipo_mascota, nombre_tipo, id_tamanio, tamanio, genero_mascota, tipo, id_foto_mascota FROM f_searchT_mascotaIdporIdclienteYIdusuarioId($1::numeric,$2::numeric)`,
      [id_clientes, id_usuario]
    );
    /**Para verificar que se retorne la fila con los datos actualizados
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === '[]') {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      respuesta = respuesta.rows;
    }

    return respuesta;
  } catch (error) {
    throw new Error(
      `clientes.controller.js->f_searchT_mascotaIdporIdclienteYIdusuarioId()\n${error}`
    );
  }
};

module.exports = {
  searchT_clienteCorreo,
  readT_clientes,
  updateT_clientes,
  readallt_clientes,
  createT_clientes,
  searchT_clientes,
  deleteT_clientes,
  update_clienteMascota,
  searcht_clientesId,
  getT_mascotaIdporIdclienteYIdusuario,
  getT_clientesporIdclienteYIdUsuario,
};
