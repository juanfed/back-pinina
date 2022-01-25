const pool = require("../../database/dbConection");
const { encryptPassword } = require("../utils/encryptPassword");

const createT_code_register = async (req) => {
  const {
    correo,
    primer_nombre,
    segundo_nombre,
    primer_apellido,
    segundo_apellido,
    telefono,
    firewall,
    ubicacion,
  } = req.body;
  try {
    let respuesta = await pool.query(
      `SELECT * from f_register_user($1::character varying , $2::character varying , $3::character varying , $4::character varying , $5::character varying , $6::character varying , $7::character varying , $8::numeric)`,
      [
        correo,
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        telefono,
        firewall,
        ubicacion,
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
    throw new Error(`codeuser.controller.js->createT_code_register()\n${error}`);
  }
};

const createT_code_password = async (req) => {
  const { correo, firewall } = req.body;
  try {
    let respuesta = await pool.query(
      `SELECT * from f_register_auth($1::character varying , $2::character varying)`,
      [correo, firewall]
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
    throw new Error(`codeuser.controller.js->createT_code_password()\n${error}`);
  }
};

const createT_user_veri = async (req) => {
  const {
    correo,
    primer_nombre,
    segundo_nombre,
    primer_apellido,
    segundo_apellido,
    telefono,
    codigo,
    password,
    ubicacion,
    firewall,
  } = req.body;

  let passwordHash = await encryptPassword(password);

  try {
    let respuesta = await pool.query(
      `SELECT * from f_register_user_veri($1::character varying, $2::character varying , $3::character varying , $4::character varying , $5::character varying ,  $6::character varying , $7::numeric ,$8::numeric ,  $9::character varying , $10::character varying)`,
      [
        correo,
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        telefono,
        ubicacion,
        codigo,
        passwordHash,
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
    throw new Error(`codeuser.controller.js->createT_user_veri()\n${error}`);
  }
};

const password_user_veri = async (req) => {
  const { correo, codigo, firewall } = req.body;
  try {
    let respuesta = await pool.query(
      `SELECT * from f_register_auth_veri($1::character varying, $2::numeric , $3::character varying)`,
      [correo, codigo, firewall]
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
    throw new Error(`codeuser.controller.js->password_user_veri()\n${error}`);
  }
};

const update_usu_password = async (req) => {
  const { id_usuario, password } = req.body;

  let passwordHash = await encryptPassword(password);

  try {
    let respuesta = await pool.query(
      `SELECT * from f_update_usu_pass($1::numeric, $2::character varying)`,
      [id_usuario, passwordHash]
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
    throw new Error(`codeuser.controller.js->update_usu_password()\n${error}`);
  }
};

const update_usu = async (req) => {
  const { 
    id_usuario,
    primer_nombre,
    segundo_nombre,
    primer_apellido,
    segundo_apellido,
    telefono,
    ubicacion 
  } = req.body;

  try {
    let respuesta = await pool.query(
      `SELECT * from f_update_usu($1::numeric, $2::character varying, $3::character varying,
          $4::character varying, $5::character varying, $6::character varying, $7::numeric)`,
      [id_usuario, primer_nombre, segundo_nombre, primer_apellido, 
      segundo_apellido, telefono, ubicacion]
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
    throw new Error(`codeuser.controller.js->update_usu()\n${error}`);
  }
};

const update_usu_email = async (req) => {
  const { id_usuario, correo } = req.body;

  try {
    let respuesta = await pool.query(
      `SELECT * from f_update_usu_email($1::numeric, $2::character varying)`,
      [id_usuario, correo]
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
    throw new Error(`codeuser.controller.js->update_usu_email()\n${error}`);
  }
};

const readT_usuario_codigo = async (req) => {
  const { correo } = req.body;

  try {
    let respuesta = await pool.query(
      `SELECT * from f_readt_usuario_codigo($1::character varying)`,
      [correo]
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
    throw new Error(`codeuser.controller.js->readT_usuario_codigo()\n${error}`);
  }
};

const readT_codigo_verificacion = async (req) => {
  const { correo } = req.body;

  try {
    let respuesta = await pool.query(
      `SELECT * from f_readt_codigo_verificacion($1::character varying)`,
      [correo]
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
    throw new Error(`codeuser.controller.js->readT_usuario_codigo()\n${error}`);
  }
};

const readT_usuario = async (req) => {
  const { correo } = req.body;

  try {
    let respuesta = await pool.query(
      `SELECT * from f_readusuregister($1::character varying)`,
      [correo]
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
    throw new Error(`codeuser.controller.js->readT_usuario()\n${error}`);
  }
};

module.exports = {
  createT_code_register,
  createT_user_veri,
  createT_code_password,
  password_user_veri,
  update_usu,
  update_usu_password,
  update_usu_email,
  readT_usuario_codigo,
  readT_codigo_verificacion,
  readT_usuario
};
