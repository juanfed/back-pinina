const pool = require('../../database/dbConection');

const readT_empresa_usuario = async (idUser) => {
  try {
    let respuesta = await pool.query(
      `SELECT * from f_readgt_empresa_usuario
                        ($1::numeric)`,
      [idUser]
    );
    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === "[]") {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      /**En caso contrario quiere decir que si arrojó 1 registro
       * por lo tanto se le asigna a la respuesta los valores de los atributos
       * del registro encontrado que está en la primera posición del array */
      respuesta = respuesta.rows[0];
    }

    return respuesta;
  } catch (err) {
    console.log(err);
    throw new Error(`adminuser.controller.js->readT_empresa_usuario()\n${err}`);
  }
};

const readT_usuario_empresas = async (req) => {
  try {
    //
    const { id } = req.body;

    let respuesta = await pool.query(
      `SELECT * from f_readgt_usuario_empresas
                        ($1::numeric)`,
      [id]
    ); // Verifica si hay una relación con la tabla empresas
    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === "[]") {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      /**En caso contrario quiere decir que si arrojó 1 registro
       * por lo tanto se le asigna a la respuesta los valores de los atributos
       * del registro encontrado que está en la primera posición del array */
      respuesta = respuesta.rows;
    }

    return respuesta;
  } catch (err) {
    console.log(err);
    throw new Error(
      `adminuser.controller.js->readT_usuario_empresas()\n${err}`
    );
  }
};

const readT_usuario_modulos = async (req) => {
  try {
    //
    const { id } = req.body;

    let respuesta = await pool.query(
      `SELECT * from f_readgt_usuario_modulos
                        ($1::numeric)`,
      [id]
    ); // Verifica si hay una relación con la tabla modulos
    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === "[]") {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      /**En caso contrario quiere decir que si arrojó 1 registro
       * por lo tanto se le asigna a la respuesta los valores de los atributos
       * del registro encontrado que está en la primera posición del array */
      respuesta = respuesta.rows;
    }

    return respuesta;
  } catch (err) {
    console.log(err);
    throw new Error(`adminuser.controller.js->readT_usuario_modulos()\n${err}`);
  }
};

const searchModulesProfile = async (req) => {
  try {
    let respuesta = await pool.query(`SELECT * from f_readgt_modulos()`); // Mapea la tabla usuarios

    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === "[]") {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      /**En caso contrario quiere decir que si arrojó 1 registro
       * por lo tanto se le asigna a la respuesta los valores de los atributos
       * del registro encontrado que está en la primera posición del array */
      respuesta = respuesta.rows;
    }

    return respuesta;
  } catch (error) {
    console.log(error);
    throw new Error(`adminuser.controller.js->searchModulesProfile()\n${error}`);
  }
};

const searchUserForDocument = async (identificacion, id_usuario) => {
  try {
    let respuesta = await pool.query(
      `SELECT * from f_readusudocumento
                            ($1::character varying, $2::numeric)`,
      [identificacion, id_usuario]
    ); // Mapea la tabla usuarios

    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === "[]") {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      /**En caso contrario quiere decir que si arrojó 1 registro
       * por lo tanto se le asigna a la respuesta los valores de los atributos
       * del registro encontrado que está en la primera posición del array */
      respuesta = respuesta.rows[0];
    }

    return respuesta;
  } catch (error) {
    console.log(error);
    throw new Error(
      `adminuser.controller.js->searchUserForDocument()\n${error}`
    );
  }
};

const readT_usuarioCorreo = async (correo, id_usuario) => {
  try {
    let respuesta = await pool.query(
      `SELECT * from f_readforcorreo
                        ($1::character varying, $2::numeric)`,
      [correo, id_usuario]
    );
    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === "[]") {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      /**En caso contrario quiere decir que si arrojó 1 registro
       * por lo tanto se le asigna a la respuesta los valores de los atributos
       * del registro encontrado que está en la primera posición del array */
      respuesta = respuesta.rows[0];
    }

    return respuesta;
  } catch (error) {
    console.log(error);
    throw new Error(`adminuser.controller.js->readT_usuarioCorreo()\n${error}`);
  }
};

const createUserModule = async (req) => {
  try {
    const {
      id_usuario,
      id_empresa,
      id_modulo,
      t_adm,
      t_restri,
      usuario_grabacion = "pedro andres",
      fecha_grabacion = "2021/04/04",
      usuario_modificacion = "maria jimenez",
      fecha_modificacion = "2021/04/04",
      firewall = "firewall",
    } = req.body;
    let respuesta = await pool.query(
      `SELECT * from f_createt_usuario_modulos
                        ($1::numeric, $2::numeric[], $3::numeric, $4::boolean[], $5::boolean[], $6::character varying, $7::date, $8::character varying, $9::date, $10::character varying)`,
      [
        id_usuario,
        id_modulo,
        id_empresa,
        t_adm,
        t_restri,
        usuario_grabacion,
        fecha_grabacion,
        usuario_modificacion,
        fecha_modificacion,
        firewall,
      ]
    );
    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === "[]") {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      /**En caso contrario quiere decir que si arrojó 1 registro
       * por lo tanto se le asigna a la respuesta los valores de los atributos
       * del registro encontrado que está en la primera posición del array */
      respuesta = respuesta.rows[0];
    }

    return respuesta;
  } catch (error) {
    console.log(error);
    throw new Error(`adminuser.controller.js->createUserModule()\n${error}`);
  }
};

const createUserBusiness = async (req) => {
  try {
    const {
      id_usuario,
      id_empresa,
      t_adm,
      t_restri,
      usuario_grabacion = "pedro andres",
      fecha_grabacion = "2021/04/04",
      usuario_modificacion = "maria jimenez",
      fecha_modificacion = "2021/04/04",
      firewall = "firewall",
    } = req.body;
    let respuesta = await pool.query(
      `SELECT * from f_createt_usuario_empresas
                        ($1::numeric, $2::numeric, $3::boolean, $4::boolean, $5::character varying, $6::date, $7::character varying, $8::date, $9::character varying)`,
      [
        id_usuario,
        id_empresa,
        t_adm,
        t_restri,
        usuario_grabacion,
        fecha_grabacion,
        usuario_modificacion,
        fecha_modificacion,
        firewall,
      ]
    );
    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === "[]") {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      /**En caso contrario quiere decir que si arrojó 1 registro
       * por lo tanto se le asigna a la respuesta los valores de los atributos
       * del registro encontrado que está en la primera posición del array */
      respuesta = respuesta.rows[0];
    }

    return respuesta;
  } catch (error) {
    console.log(error);
    throw new Error(`adminuser.controller.js->createUserBusiness()\n${error}`);
  }
};

const deleteT_usuario_empresas = async (req) => {
  try {
    const { id } = req.body;
    let respuesta = await pool.query(
      `SELECT * from f_deletet_usuario_empresas($1::numeric)`,
      [id]
    );
    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === "[]") {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      /**En caso contrario quiere decir que si arrojó 1 registro
       * por lo tanto se le asigna a la respuesta los valores de los atributos
       * del registro encontrado que está en la primera posición del array */
      respuesta = respuesta.rows[0];
    }

    return respuesta;
  } catch (err) {
    console.log(err);
    throw new Error(
      `adminuser.controller.js->deleteT_usuario_empresas()\n${err}`
    );
  }
};

const deleteT_usuario_modulos = async (req) => {
  try {
    const { id } = req.body;
    let respuesta = await pool.query(
      `SELECT * from f_deletet_usuario_modulos ($1::numeric[])`,
      [id]
    );
    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === "[]") {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      /**En caso contrario quiere decir que si arrojó 1 registro
       * por lo tanto se le asigna a la respuesta los valores de los atributos
       * del registro encontrado que está en la primera posición del array */
      respuesta = respuesta.rows[0];
    }

    return respuesta;
  } catch (err) {
    console.log(err);
    throw new Error(
      `adminuser.controller.js->deleteT_usuario_empresas()\n${err}`
    );
  }
};

const deleteT_usuario_modulos_all = async (req) => {
  try {
    const { id_usuario, id_empresa } = req.body;
    let respuesta = await pool.query(
      `SELECT * from f_deletet_usuario_modulos_all ($1::numeric, $2::numeric)`,
      [id_usuario, id_empresa]
    );
    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === "[]") {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      /**En caso contrario quiere decir que si arrojó 1 registro
       * por lo tanto se le asigna a la respuesta los valores de los atributos
       * del registro encontrado que está en la primera posición del array */
      respuesta = respuesta.rows[0];
    }

    return respuesta;
  } catch (err) {
    console.log(err);
    throw new Error(
      `adminuser.controller.js->deleteT_usuario_empresas()\n${err}`
    );
  }
};

const readgV_razon_social = async () => {
  try {
    let respuesta = await pool.query(`SELECT * FROM v_razon_social`); // Verifica la razon_social en la tabla empresas

    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === "[]") {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      /**En caso contrario quiere decir que si arrojó 1 registro
       * por lo tanto se le asigna a la respuesta los valores de los atributos
       * del registro encontrado que está en la primera posición del array */
      respuesta = respuesta.rows;
    }

    return respuesta;
  } catch (error) {
    throw new Error(`adminuser.controller.js->readgV_razon_social()\n${error}`);
  }
};

const readgV_usuarios_empresa = async () => {
  try {
    let respuesta = await pool.query(`SELECT * FROM v_usuarios_empresa`); // Verifica la razon_social en la tabla empresas

    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === "[]") {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      /**En caso contrario quiere decir que si arrojó 1 registro
       * por lo tanto se le asigna a la respuesta los valores de los atributos
       * del registro encontrado que está en la primera posición del array */
      respuesta = respuesta.rows;
    }

    return respuesta;
  } catch (error) {
    console.log(error);
    throw new Error(`adminuser.controller.js->readgV_usuarios_empresa()\n${error}`);
  }
};

const readgV_usuarios_perfiles = async () => {
  try {
    let respuesta = await pool.query(`SELECT * FROM v_usuarios_perfiles`); // Verifica la razon_social en la tabla empresas

    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === "[]") {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      /**En caso contrario quiere decir que si arrojó 1 registro
       * por lo tanto se le asigna a la respuesta los valores de los atributos
       * del registro encontrado que está en la primera posición del array */
      respuesta = respuesta.rows;
    }

    return respuesta;
  } catch (error) {
    console.log(error);
    throw new Error(`adminuser.controller.js->readgV_usuarios_perfiles()\n${error}`);
  }
};

const readgV_usuarios_modulos = async () => {
  try {
    let respuesta = await pool.query(`SELECT * FROM v_usuarios_modulos`); // Verifica la razon_social en la tabla empresas

    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === "[]") {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      /**En caso contrario quiere decir que si arrojó 1 registro
       * por lo tanto se le asigna a la respuesta los valores de los atributos
       * del registro encontrado que está en la primera posición del array */
      respuesta = respuesta.rows;
    }

    return respuesta;
  } catch (error) {
    console.log(error);
    throw new Error(`adminuser.controller.js->readgV_usuarios_modulos()\n${error}`);
  }
};

const readgV_usuarios_conex = async (id_usuario) => {
  try {
    let respuesta = await pool.query(`SELECT * FROM f_readv_usuarios_conex($1::numeric)`,
      [id_usuario]
    ); // Verifica la razon_social en la tabla empresas

    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === "[]") {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      /**En caso contrario quiere decir que si arrojó 1 registro
       * por lo tanto se le asigna a la respuesta los valores de los atributos
       * del registro encontrado que está en la primera posición del array */
      respuesta = respuesta.rows;
    }

    return respuesta;
  } catch (error) {
    console.log(error);
    throw new Error(`adminuser.controller.js->readgV_usuarios_conex()\n${error}`);
  }
};

const readOwnerBusiness = async (req) => {
  const { id_usuario } = req.body;
  try {
    let respuesta = await pool.query(
      `SELECT * from f_readownerbusiness
                        ($1::numeric)`,
      [id_usuario]
    );
    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === "[]") {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      /**En caso contrario quiere decir que si arrojó 1 registro
       * por lo tanto se le asigna a la respuesta los valores de los atributos
       * del registro encontrado que está en la primera posición del array */
      respuesta = respuesta.rows;
    }

    return respuesta;
  } catch (err) {
    console.log(err);
    throw new Error(`adminuser.controller.js->readOwnerBusiness()\n${err}`);
  }
};

const readT_usuario_modulos_correo = async (id_usuario, id_empresa, id_modulo) => {
  try {
    let respuesta = await pool.query(`SELECT * from f_readt_usuario_modulos_correos($1::numeric, $2::numeric,
      $3::numeric[])`, [id_usuario, id_empresa, id_modulo]);

    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === "[]") {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      /**En caso contrario quiere decir que si arrojó 1 registro
       * por lo tanto se le asigna a la respuesta los valores de los atributos
       * del registro encontrado que está en la primera posición del array */
      respuesta = respuesta.rows[0];
    }

    return respuesta;
  } catch (error) {
    console.log(error);
    throw new Error(`adminuser.controller.js->readT_usuario_modulos_correo()\n${err}`);
  }
};

const readT_usuario_empresas_correo = async (id_usuario, id_empresa) => {
  try {
    let respuesta = await pool.query(`SELECT * from f_readt_usuario_empresas_correo($1::numeric, $2::numeric)`,
    [id_usuario, id_empresa]);

    /**Para verificar que el resultado de la consulta no arroja ningún registro
     * se convierte la respuesta en un JSONArray y se compara con []
     */
    if (JSON.stringify(respuesta.rows) === "[]") {
      //Se le asigna null a la respuesta
      respuesta = null;
    } else {
      /**En caso contrario quiere decir que si arrojó 1 registro
       * por lo tanto se le asigna a la respuesta los valores de los atributos
       * del registro encontrado que está en la primera posición del array */
      respuesta = respuesta.rows[0];
    }

    return respuesta;
  } catch (error) {
    console.log(error);
    throw new Error(`adminuser.controller.js->readT_usuario_empresas_correo()\n${err}`);
  }
};

module.exports = {
  readT_empresa_usuario,
  readT_usuario_empresas,
  readT_usuario_modulos,
  searchModulesProfile,
  searchUserForDocument,
  readT_usuarioCorreo,
  createUserModule,
  createUserBusiness,
  deleteT_usuario_empresas,
  deleteT_usuario_modulos,
  deleteT_usuario_modulos_all,
  readgV_razon_social,
  readgV_usuarios_empresa,
  readgV_usuarios_perfiles,
  readgV_usuarios_modulos,
  readgV_usuarios_conex,
  readOwnerBusiness,
  readT_usuario_modulos_correo,
  readT_usuario_empresas_correo
}