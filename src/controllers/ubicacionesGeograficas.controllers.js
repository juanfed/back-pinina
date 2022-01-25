const pool = require('../../database/dbConection');

const obtenerTodos = async () => {
  try {
    let respuesta = await pool.query(
      'SELECT id_codigo,descripcion FROM f_readdepartamentosCol()'
    );

    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === '[]') {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      /**En caso contrario quiere decir que si arrojó 1 o varios registros
       * por lo tanto se le asigna a la respuesta los valores de los atributos
       * de todos los registros encontrados*/
      respuesta = respuesta.rows;
    }

    return respuesta;
  } catch (err) {
    throw new Error(
      `Archivo departamentos.controller.js -> obtenerTodos()\n${err}`
    );
  }
};

const obtenerPorIdUndeMunicipio = async (id_unde) => {
  try {
    let respuesta = await pool.query(
      'SELECT id_codigo,descripcion FROM f_readt_municipiobyId($1::numeric)',
      [id_unde]
    );

    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === '[]') {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      /**En caso contrario quiere decir que si arrojó 1 o varios registros
       * por lo tanto se le asigna a la respuesta los valores de los atributos
       * de todos los registros encontrados*/
      respuesta = respuesta.rows;
    }

    return respuesta;
  } catch (err) {
    throw new Error(
      `Archivo municipios.controller.js -> f_readt_municipiobyId()\n${err}`
    );
  }
};

const readGCountries = async () => {
  try {
    let respuesta = await pool.query(
      'SELECT id_codigo,descripcion from f_readgubiregister();'
    );

    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === '[]') {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      /**En caso contrario quiere decir que si arrojó 1 o varios registro
       * por lo tanto se le asigna a la respuesta los valores de los atributos
       * de todos los registros encontrados*/
      respuesta = respuesta.rows;
    }

    return respuesta;
  } catch (err) {
    throw new Error(
      `ubicacionesGeograficas.controller.js -> readGCountries()\n${err}`
    );
  }
};

const read_departamentos = async (id_codigo) => {
  try {
    let respuesta = await pool.query(
      'SELECT id_codigo,descripcion FROM f_searcht_localidad_departamentos($1::numeric)',
      [id_codigo]
    );

    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === '[]') {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      /**En caso contrario quiere decir que si arrojó 1 o varios registros
       * por lo tanto se le asigna a la respuesta los valores de los atributos
       * de todos los registros encontrados*/
      respuesta = respuesta.rows;
    }

    return respuesta;
  } catch (err) {
    throw new Error(
      `ubicacionesGeograficas.controller.js -> read_departamentos()\n${err}`
    );
  }
};

const read_municipios = async (id_codigo) => {
  try {
    let respuesta = await pool.query(
      'SELECT id_codigo,descripcion FROM f_searcht_localidad_municipios($1::numeric)',
      [id_codigo]
    );

    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === '[]') {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      /**En caso contrario quiere decir que si arrojó 1 o varios registros
       * por lo tanto se le asigna a la respuesta los valores de los atributos
       * de todos los registros encontrados*/
      respuesta = respuesta.rows;
    }

    return respuesta;
  } catch (err) {
    throw new Error(
      `ubicacionesGeograficas.controller.js -> read_municipios()\n${err}`
    );
  }
};

module.exports = {
  readGCountries,
  obtenerTodos,
  obtenerPorIdUndeMunicipio,
  read_departamentos,
  read_municipios
};
