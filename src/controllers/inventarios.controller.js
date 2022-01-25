const pool = require('../../database/dbConection');

const readT_inventarios = async () => {
  try {
    let respuesta = await pool.query(
      `SELECT * from f_readinventarios()`);

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
    throw new Error(`inventarios.controller.js->readT_inventarios()\n${err}`);
  }
};

const readT_inventarios_veterinaria = async (id_usuario) => {
  try {
    let respuesta = await pool.query(
      `SELECT * from f_readinventarios_veterinaria($1::numeric)`,
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
    throw new Error(`inventarios.controller.js->readT_inventarios_veterinaria()\n${err}`);
  }
};

const readT_inventarios_veterinaria_fotos = async (id_usuario) => {
  try {
    let respuesta = await pool.query(
      `SELECT * from f_readinventarios_fotosid($1::numeric)`,
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
    throw new Error(`inventarios.controller.js->readT_inventarios_veterinaria_fotos()\n${err}`);
  }
};

const readT_inventarios_producto = async (id_tipo_producto) => {
  try {
    let respuesta = await pool.query(
      `SELECT * from f_readinventarios_producto($1::numeric)`,
      [id_tipo_producto]
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
    throw new Error(`inventarios.controller.js->readT_inventarios_producto()\n${err}`);
  }
};

const readT_inventarios_mascota = async (id_tipo_mascota) => {
  try {
    let respuesta = await pool.query(
      `SELECT * from f_readinventarios_mascota($1::numeric)`,
      [id_tipo_mascota]
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
    throw new Error(`inventarios.controller.js->readT_inventarios_mascota()\n${err}`);
  }
};

const createT_inventarios = async (req) => {
  try {
    let { nombre_producto,
      precio_producto,
      cantidad_producto,
      id_tipo_producto,
      id_usuario,
      id_tipo_mascota } = req.body;

    let respuesta = await pool.query(
      `SELECT * from f_createinventarios ($1::character varying, $2::numeric, $3::numeric,
          $4::numeric, $5::numeric, $6::numeric)`,
      [
        nombre_producto,
        precio_producto,
        cantidad_producto,
        id_tipo_producto,
        id_usuario,
        id_tipo_mascota
      ]
    );

    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === '[]') {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      respuesta = respuesta.rows[0];
    }

    return respuesta;
  } catch (err) {
    console.log(err);
    throw new Error(`inventarios.controller.js->createT_inventarios()\n${err}`);
  }
};

const updateT_inventarios = async (req) => {
  try {
    let { id_inventario,
      nombre_producto,
      precio_producto,
      cantidad_producto,
      id_tipo_producto,
      id_usuario,
      id_tipo_mascota } = req.body;

    let respuesta = await pool.query(
      `SELECT * from f_updateinventarios ($1::numeric, $2::character varying, $3::numeric,
          $4::numeric, $5::numeric, $6::numeric, $7::numeric)`,
      [
        id_inventario,
        nombre_producto,
        precio_producto,
        cantidad_producto,
        id_tipo_producto,
        id_usuario,
        id_tipo_mascota
      ]
    );

    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === '[]') {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      respuesta = respuesta.rows[0];
    }

    return respuesta;
  } catch (err) {
    console.log(err);
    throw new Error(`inventarios.controller.js->updateT_inventarios()\n${err}`);
  }
};

const searchT_inventarioId = async (id_inventario) => {
  try {
    let respuesta = await pool.query(
      `SELECT * FROM f_searcht_inventarioid($1::numeric)`,
      [id_inventario]
    );
    /**Para verificar que se retorne la fila con los datos actualizados
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === '[]') {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      respuesta = respuesta.rows[0];
    }

    return respuesta;
  } catch (error) {
    throw new Error(`inventarios.controller.js->searchT_inventarioId()\n${error}`);
  }
};

const deleteT_inventario = async (id_inventario) => {
  try {
    let respuesta = await pool.query(
      `SELECT * from f_deleteinventario ($1::numeric)`,
      [id_inventario]
    );

    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === '[]') {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      respuesta = respuesta.rows[0];
    }

    return respuesta;
  } catch (err) {
    console.log(err);
    throw new Error(`inventarios.controller.js->deleteT_inventario()\n${err}`);
  }
};

const readT_ofertas = async (req) => {
  try {
    let { id_inventario, porcentaje_oferta } = req.body;

    let respuesta = await pool.query(
      `SELECT * from f_readt_ofertas($1::numeric, $2::numeric)`,
      [id_inventario, porcentaje_oferta]
    );

    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === '[]') {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      respuesta = respuesta.rows[0];
    }

    return respuesta;
  } catch (err) {
    console.log(err);
    throw new Error(`inventarios.controller.js->readT_ofertas()\n${err}`);
  }
};

const read_descuento = async (req) => {
  try {
    let { id_inventario, porcentaje_oferta } = req.body;

    let respuesta = await pool.query(
      `SELECT * from f_read_descuento($1::numeric, $2::numeric)`,
      [id_inventario, porcentaje_oferta]
    );
    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === '[]') {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      respuesta = respuesta.rows[0];
    }

    return respuesta;
  } catch (err) {
    console.log(err);
    throw new Error(`inventarios.controller.js->read_descuento()\n${err}`);
  }
};

const createT_ofertas = async (req) => {
  try {
    let { porcentaje_oferta,
      tipo_descuento,
      id_inventario } = req.body;

    let respuesta = await pool.query(
      `SELECT * from f_createofertas ($1::numeric, $2::numeric, $3::numeric)`,
      [
        porcentaje_oferta,
        tipo_descuento,
        id_inventario
      ]
    );

    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === '[]') {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      respuesta = respuesta.rows[0];
    }

    return respuesta;
  } catch (err) {
    console.log(err);
    throw new Error(`inventarios.controller.js->createT_ofertas()\n${err}`);
  }
};

const updateT_ofertas = async (req) => {
  try {
    let { id_oferta,
      porcentaje_oferta,
      tipo_descuento,
      id_inventario } = req.body;

    let respuesta = await pool.query(
      `SELECT * from f_updateofertas ($1::numeric, $2::numeric, $3::numeric, $4::numeric)`,
      [
        id_oferta,
        porcentaje_oferta,
        tipo_descuento,
        id_inventario
      ]
    );

    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === '[]') {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      respuesta = respuesta.rows[0];
    }

    return respuesta;
  } catch (err) {
    console.log(err);
    throw new Error(`inventarios.controller.js->updateT_ofertas()\n${err}`);
  }
};

const searchT_ofertaId = async (id_oferta) => {
  try {
    let respuesta = await pool.query(
      `SELECT * FROM f_searcht_ofertaid($1::numeric)`,
      [id_oferta]
    );
    /**Para verificar que se retorne la fila con los datos actualizados
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === '[]') {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      respuesta = respuesta.rows[0];
    }

    return respuesta;
  } catch (error) {
    throw new Error(`inventarios.controller.js->searchT_ofertaId()\n${error}`);
  }
};

const deleteT_ofertas = async (id_inventario) => {
  try {
    let respuesta = await pool.query(
      `SELECT * from f_deleteofertas ($1::numeric)`,
      [id_inventario]
    );

    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === '[]') {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      respuesta = respuesta.rows[0];
    }

    return respuesta;
  } catch (err) {
    console.log(err);
    throw new Error(`inventarios.controller.js->deleteT_ofertas()\n${err}`);
  }
};

const readT_ofertas_all = async () => {
  try {
    let respuesta = await pool.query(`SELECT * from f_readofertas()`);

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
    throw new Error(`inventarios.controller.js->readT_ofertas()\n${err}`);
  }
};

const readT_ofertas_veterinaria = async (id_usuario) => {
  try {
    let respuesta = await pool.query(
      `SELECT * from f_readofertas_veterinaria($1::numeric)`,
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
    throw new Error(`inventarios.controller.js->readT_ofertas_veterinaria()\n${err}`);
  }
};

const readT_ofertas_producto = async (id_tipo_producto) => {
  try {
    let respuesta = await pool.query(
      `SELECT * from f_readofertas_producto($1::numeric)`,
      [id_tipo_producto]
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
    throw new Error(`inventarios.controller.js->readT_ofertas_producto()\n${err}`);
  }
};

const readT_ofertas_mascota = async (id_tipo_mascota) => {
  try {
    let respuesta = await pool.query(
      `SELECT * from f_readofertas_mascota($1::numeric)`,
      [id_tipo_mascota]
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
    throw new Error(`inventarios.controller.js->readT_ofertas_mascota()\n${err}`);
  }
};

const compararfotoinve = async (id_inventario, consecutivo) => {
  try {
    let respuesta = await pool.query(
      ' SELECT * from  public.f_compararfotosinventario($1::numeric, $2::numeric) ',
      [id_inventario, consecutivo]
    );

    if (JSON.stringify(respuesta.rows) === '[]') {
      respuesta = null;
    } else {
      respuesta = respuesta.rows;
    }

    return respuesta;
  } catch (err) {
    throw new Error(
      `inventarios.controller.js->compararfotoinve()\n${err}`
    );
  }
};

const fotosPorId = async (id) => {
  try {
    let respuesta = await pool.query(
      ` SELECT * FROM f_readfotosforId_inventario( $1::numeric) `,
      [id]
    );

    /**Se verifica si la respuesta es vacia
     */
    if (JSON.stringify(respuesta.rows) === '[]') {
      //Se le asigna null a la respuesta
      respuesta = 0;
    } else {
      /**En caso contrario quiere decir que si arrojó 1 registro
       * se retorna el array */
      respuesta = respuesta.rows;
    }
    return respuesta;
  } catch (err) {
    throw new Error(
      `inventarios.controller.js->fotosPorId()\n${err}`
    );
  }
};

const crearFoto = async (ruta_guardado, nombre_imagen, id_inventario, consecutivo) => {
  try {
    let id = false;

    const respuesta = await pool.query(
      `SELECT * from public.f_insert_t_fotos_inventarios($1::text,$2::text,$3::numeric, $4::numeric)`,
      [ruta_guardado, nombre_imagen, id_inventario, consecutivo]
    );

    /**Si rowCount es igual a 1 quiere decir que el INSERT
     * se ejecutó correctamente */
    if (respuesta.rowCount === 1) {
      /**Se obtiene el id del registro que se acaba
       * de insertar
       */
      id = respuesta.rows[0].id;
      // console.log(id)
    } else {
      /**En caso contrario quiere decir que rowCount NO vale 1,
       * y el INSERT no se ejecutó
       */
      //Se le asigna 0
      id = 0;
    }

    return id;
  } catch (err) {
    throw new Error(`inventarios.controller.js->crearFoto()\n${err}`);
  }
};

const actualizarfotoinventario = async (
  id_inventario,
  consecutivo,
  nombre_imagen,
  ruta_guardado
) => {
  try {
    let respuesta = await pool.query(
      ' SELECT * from	f_update_t_fotos_inventarios($1::text,$2::text, $3::numeric,$4::numeric)',
      [ruta_guardado, nombre_imagen, id_inventario, consecutivo]
    );

    if (JSON.stringify(respuesta.rows) === '[]') {
      respuesta = null;
    } else {
      respuesta = respuesta.rows[0].id;
    }
    return respuesta;
  } catch (err) {
    throw new Error(
      `inventarios.controller.js->actualizarfotoinventario()\n${err}`
    );
  }
};

const readIdT_fotos_inventariosPorid = async (id_inventario) => {
  try {
    let respuesta = await pool.query(
      `SELECT id from  public.f_getidfotoinventariobyid($1::numeric)`,
      [id_inventario]
    );

    if (JSON.stringify(respuesta.rows) === '[]') {
      respuesta = null;
    } else {
      respuesta = respuesta.rows;
    }

    return respuesta;
  } catch (error) {
    console.log(error);

    throw new Error(
      `inventarios.controller.js->readIdT_fotos_inventariosPorid()\n${error}`
    );
  }
};

module.exports = {
  readT_inventarios,
  readT_inventarios_veterinaria,
  readT_inventarios_veterinaria_fotos,
  readT_inventarios_producto,
  readT_inventarios_mascota,
  createT_inventarios,
  updateT_inventarios,
  searchT_inventarioId,
  deleteT_inventario,
  readT_ofertas,
  read_descuento,
  createT_ofertas,
  updateT_ofertas,
  deleteT_ofertas,
  searchT_ofertaId,
  readT_ofertas_all,
  readT_ofertas_veterinaria,
  readT_ofertas_producto,
  readT_ofertas_mascota,
  compararfotoinve,
  fotosPorId,
  crearFoto,
  actualizarfotoinventario,
  readIdT_fotos_inventariosPorid
};