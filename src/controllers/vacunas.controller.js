const pool = require('../../database/dbConection');

const readT_vacunas = async (req) => {
  try {

    const { id_mascotas, id_usuario } = req.body;

    let respuesta = await pool.query(`SELECT * FROM f_readvacunas($1, $2)`,
    [id_mascotas, id_usuario]);  

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
    throw new Error(`vacunas.controller.js->f_readvacunas()\n${err}`);
  }
};

const createT_vacunas = async (
  id_tipo_vacunas,
  fecha_vacuna,
  dosis,
  fecha_proxima_vacuna,
  sintomas_vacuna,
  id_mascotas,
  id_usuario
) => {
  try {
    let respuesta = await pool.query(
      `SELECT id_tipo_vacunas, fecha_vacuna, dosis, fecha_proxima_vacuna, sintomas_vacuna, id_mascotas,  id_usuario from f_createvacunas
                                    ($1::numeric,$2::text,$3::text,$4::text,$5::text,$6::numeric,$7::numeric)`,
      [
        id_tipo_vacunas,
        fecha_vacuna,
        dosis,
        fecha_proxima_vacuna,
        sintomas_vacuna,
        id_mascotas,
       
        id_usuario,
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
    throw new Error(`vacunas.controller.js->f_createvacunas()\n${err}`);
  }
};

const updateT_vacunas = async (
  id_vacuna,
  id_tipo_vacunas,
  fecha_vacuna,
  dosis,
  fecha_proxima_vacuna,
  sintomas_vacuna,
  id_mascotas,
  id_clientes,
  id_usuario
) => {
  try {
    let respuesta = await pool.query(
      `SELECT id_tipo_vacunas, fecha_vacuna, dosis, fecha_proxima_vacuna, sintomas_vacuna, id_mascotas, id_clientes, id_usuario from f_updatevacunas
                                      ($1::numeric,$2::numeric,$3::text,$4::text,$5::text,$6::text,$7::numeric,$8::numeric,$9::numeric)`,
      [
        id_vacuna,
        id_tipo_vacunas,
        fecha_vacuna,
        dosis,
        fecha_proxima_vacuna,
        sintomas_vacuna,
        id_mascotas,
        id_clientes,
        id_usuario,
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
    throw new Error(`vacunas.controller.js->f_updatevacunas()\n${err}`);
  }
};

const searcht_vacunaId = async (id_vacuna) => {
  try {
    let respuesta = await pool.query(
      `SELECT * FROM f_searcht_vacunaId($1::numeric)`,
      [id_vacuna]
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
    throw new Error(`vacuna.controller.js->f_searcht_vacunaId()\n${error}`);
  }
};

const deleteT_vacuna = async (id_vacuna) => {
  try {
    let respuesta = await pool.query(
      `SELECT * from f_deletevacuna
                                  ($1::numeric)`,
      [id_vacuna]
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
    throw new Error(`vacuna.controller.js->f_deletevacuna()\n${err}`);
  }
};

const readallt_tipos_vacuna = async (req) => {
  try {
    let respuesta = await pool.query(
      `SELECT * from public.readallt_tipos_vacuna()`
    );

    //Verificar que el resultado de la consulta no arroja ningún mensaje

    if (JSON.stringify(respuesta.rows) === '[]') {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      respuesta = respuesta.rows;
    }

    return respuesta;
  } catch (err) {
    console.log(err);
    throw new Error(`vacunas.controller.js->readallt_tipos_vacuna()\n${err}`);
  }
};

const readT_tiposvacuna_tipomascota = async (id_tipo_mascota) => {
  try {

    let respuesta = await pool.query(
      `SELECT * from public.f_readvacunas_tipomascota($1::numeric)`,
      [id_tipo_mascota]
    );

    //Verificar que el resultado de la consulta no arroja ningún mensaje

    if (JSON.stringify(respuesta.rows) === '[]') {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      respuesta = respuesta.rows;
    }

    return respuesta;
  } catch (err) {
    console.log(err);
    throw new Error(`vacunas.controller.js->readT_tiposvacuna_tipomascota()\n${err}`);
  }
};

module.exports = {
  createT_vacunas,
  deleteT_vacuna,
  readT_vacunas,
  readallt_tipos_vacuna,
  searcht_vacunaId,
  updateT_vacunas,
  readT_tiposvacuna_tipomascota
};
