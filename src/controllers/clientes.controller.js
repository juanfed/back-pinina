const pool = require('../../database/dbConection');
const { encryptPassword } = require("../utils/encryptPassword");
const readT_clientes = async (req) => {
  try {
    const { id_usuario } = req.body;

    let respuesta = await pool.query(
      `SELECT * from f_readt_usuarios_byid
                                ($1)`,
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
      id_tipo_identificacion,
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
      codigo_ubicacion_geografica_localidad

    } = req.body;

    let respuesta = await pool.query(
      `SELECT * FROM f_updateusuario($1::numeric, $2::integer,
                            $3::character varying, $4::character varying, $5::character varying, $6::character varying,
                            $7::character varying, $8::character varying, $9::character varying,
                            $10::character varying, $11::numeric, $12::numeric, $13::numeric, $14::numeric
                          )`,
      [
        id_clientes,
        id_tipo_identificacion,
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
        codigo_ubicacion_geografica_localidad

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
      `SELECT id_usuario,
      id_tipo_identificacion,
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
      `SELECT * from f_searchusuario($1::numeric, $2::character varying)`,
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
const createT_usuario_registro = async (req) => {
  try {

    let { primer_nombre, segundo_nombre,
      primer_apellido, segundo_apellido, correo, contraseña, codigo_ubicacion_geografica_pais, nombre_completo, apellidos
    } = req.body;
    contraseña = await encryptPassword(contraseña);

    const nombres = nombre_completo.split(' ');
    if (nombre_completo && apellidos) {
      try {
        primer_nombre = nombres[0];
        segundo_nombre = nombres[1];
        if (segundo_nombre == undefined) {
          segundo_nombre = "";
        }

      } catch (err) {
        return null;


      }
      try {

        apellidos = apellidos.split(' ');
        primer_apellido = apellidos[0];
        segundo_apellido = apellidos[1];
        if (segundo_apellido == undefined) {
          segundo_apellido = "";
        }
      } catch (err) {
        return null;
      }
      console.log(primer_nombre, segundo_nombre, primer_apellido, segundo_apellido)
    
      
        //registro simple
       
        let respuesta = await pool.query(`Select * from f_create_usuario_registro($1,$2,$3,$4,$5,$6,$7)`,
          [primer_nombre,
            segundo_nombre,
            primer_apellido,
            segundo_apellido,
            correo,
            contraseña,
            codigo_ubicacion_geografica_pais

          ])
        if (JSON.stringify(respuesta.rows) === '[]') {
          //Se le asigna null a la respuesta
          return null;
        } else {
          return respuesta.rows;
        }

    }


  } catch (err) {
    console.log(err);
    throw new Error(`Error en createT_usuario_registro()\n${err}`);
  }
};

const createT_clientes = async (req) => {
  try {

    let { tipo_identificacion, identificacion, primer_nombre, segundo_nombre,
      primer_apellido, segundo_apellido, direccion, telefono, correo, contraseña, codigo_ubicacion_geografica_pais, codigo_ubicacion_geografica_departamento, codigo_ubicacion_geografica_ciudad, codigo_ubicacion_geografica_localidad
    } = req.body;
    contraseña = await encryptPassword(contraseña);


    let respuesta = await pool.query(`SELECT * FROM f_create_usuario_registro($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
      [
        tipo_identificacion,
        identificacion,
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        direccion,
        telefono,
        correo,
        contraseña,
        codigo_ubicacion_geografica_pais,
        codigo_ubicacion_geografica_departamento,
        codigo_ubicacion_geografica_ciudad,
        codigo_ubicacion_geografica_localidad
      ]
    );

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

const searcht_clientesId = async (id_usuario) => {
  try {
    let respuesta = await pool.query(
      `SELECT * FROM f_searchT_usuarioId($1::numeric)`,
      [id_usuario]
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

    let respuesta = await pool.query(`SELECT * FROM f_usuario_correo($1)`, [correo]);

    if (JSON.stringify(respuesta.rows) === '[]') {
      //Se le asigna null a la respuesta
      return null
    } else {
      return respuesta.rows[0];
    }

  } catch (error) {
    throw new Error(`Error en searchT_clienteCorreo()\n${error}`);
  }
}
const deleteT_clientes = async (req) => {
  try {
    const { identificacion } = req.body;

    let respuesta = await pool.query(
      `SELECT * from f_delete_usuario
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
    throw new Error(`clientes.controller.js->getT_clientesporIdclienteYIdUsuario()\n${err}`);
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
  createT_usuario_registro,
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
