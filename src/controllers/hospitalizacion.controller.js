const pool = require('../../database/dbConection');

const readT_hospitalizacion = async (req) => {
  try {

    const { id_mascotas, id_usuario } = req.body;

    let respuesta = await pool.query(`SELECT * FROM f_readt_hospitalizacion($1, $2)`,[id_mascotas, id_usuario]);

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
    throw new Error(
      `hospitalizacion.controller.js->f_readT_hospitalizacion()\n${err}`
    );
  }
};
const insertarT_hospitalizacion = async (
  tipo_hozpitalizacion,
  hora_hoz,
  razon_hoztext,
  descripcion_hoz,
  profesional,
  fecha_entrada_hoz,
  fecha_salida_hoz,
  estado_hoz,
  id_mascotas,
  id_usuario
) => {
  try {
    let respuesta = await pool.query(
      `SELECT id_hozpitalizacion, tipo_hozpitalizacion,
      hora_hoz,
      razon_hoztext,
      descripcion_hoz,
      profesional,
      fecha_entrada_hoz,
      fecha_salida_hoz,
      estado_hoz,
      id_mascota,
      id_usuario from f_insertar_hospitalizacion
                                      ($1::text,$2::text,$3::text,$4::text,$5::numeric, $6::text,$7::text,$8::numeric,$9::numeric,$10::numeric)`,
      [
        tipo_hozpitalizacion,
        hora_hoz,
        razon_hoztext,
        descripcion_hoz,
        profesional,
        fecha_entrada_hoz,
        fecha_salida_hoz,
        estado_hoz,
        id_mascotas,
      
        id_usuario
      ]
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
    throw new Error(
      `hospitalizacion.controller.js->f_insertar_hospitalizacion()\n${err}`
    );
  }
};

const insertar_signos_vitales = async (
  tr,
  fc,
  temp,
  pulso,
  peso,
  id_mascotas,
  id_hozpitalizacion
) => {
  try {
    let respuesta = await pool.query(
      `SELECT
      tr,
      fc,
      temp,
      pulso,
      peso,
      id_mascota,
      id_hozpitalizacion from f_insertar_signos_vitales
                                        ($1::text,$2::text,$3::text,$4::text,$5::text, $6::numeric,$7::numeric)`,
      [tr, fc, temp, pulso, peso, id_mascotas, id_hozpitalizacion]
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
    throw new Error(
      `hospitalizacion.controller.js->f_insertar_signos_vitales()\n${err}`
    );
  }
};

const updateT_hospitalizacion = async (
  tipo_hozpitalizacion,
  hora_hoz,
  razon_hoztext,
  descripcion_hoz,
  profesional,
  fecha_entrada_hoz,
  fecha_salida_hoz,
  estado_hoz,
  id_mascotas,
  id_clientes,
  id_usuario,
  id_hozpitalizacion
) => {
  try {
    let respuesta = await pool.query(
      `SELECT * from f_updateT_hospitalizacion
      ($1::text,$2::text,$3::text,$4::text,$5::numeric, $6::text,$7::text,$8::numeric,$9::numeric,$10::numeric,$11::numeric,$12::numeric)`,
      [
        tipo_hozpitalizacion,
        hora_hoz,
        razon_hoztext,
        descripcion_hoz,
        profesional,
        fecha_entrada_hoz,
        fecha_salida_hoz,
        estado_hoz,
        id_mascotas,
        id_clientes,
        id_usuario,
        id_hozpitalizacion,
      ]
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
    throw new Error(
      `hospitalizacion.controller.js->f_updateT_hospitalizacion()\n${err}`
    );
  }
};

const updateT_signos_vitales = async (
  tr,
  fc,
  temp,
  pulso,
  peso,
  id_mascotas,
  id_hozpitalizacion,
  id_signos_vitales
) => {
  try {
    let respuesta = await pool.query(
      `SELECT * from f_updateT_signos_vitales
      ($1::text,$2::text,$3::text,$4::text,$5::text, $6::numeric,$7::numeric,$8::numeric)`,
      [
        tr,
        fc,
        temp,
        pulso,
        peso,
        id_mascotas,
        id_hozpitalizacion,
        id_signos_vitales,
      ]
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
    throw new Error(
      `hospitalizacion.controller.js->f_updateT_signos_vitales()\n${err}`
    );
  }
};

const searcht_hozpitalizacionId = async (id_hozpitalizacion) => {
  try {
    let respuesta = await pool.query(
      `SELECT * FROM f_searcht_hozpitalizacionId($1::numeric)`,
      [id_hozpitalizacion]
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
      `hospitalizacion.controller.js->f_searcht_hozpitalizacionId()\n${error}`
    );
  }
};

const searcht_signos_vitalesId = async (id_signos_vitales) => {
  try {
    let respuesta = await pool.query(
      `SELECT * FROM f_searcht_signos_vitalesId($1::numeric)`,
      [id_signos_vitales]
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
      `hospitalizacion.controller.js->f_searcht_signos_vitalesId()\n${error}`
    );
  }
};

const deleteT_hozpitalizacion = async (id_hozpitalizacion) => {
  try {
    let respuesta = await pool.query(
      `SELECT * from f_deleteT_hozpitalizacion
                                    ($1::numeric)`,
      [id_hozpitalizacion]
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
    throw new Error(
      `hospitalizacion.controller.js->f_deleteT_hozpitalizacion()\n${err}`
    );
  }
};
module.exports = {
  deleteT_hozpitalizacion,
  insertarT_hospitalizacion,
  insertar_signos_vitales,
  searcht_hozpitalizacionId,
  searcht_signos_vitalesId,
  updateT_hospitalizacion,
  updateT_signos_vitales,
  readT_hospitalizacion,
};
