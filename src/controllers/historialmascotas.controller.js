const pool = require('../../database/dbConection');

const insert_historial_clinico = async (
  fecha_grabacion,
  hora,
  profesional,
  antecedentes,
  sintomas,
  observaciones,
  diagnostico,
  id_usuario,
  id_formula,
  id_mascotas
) => {
  try {
    let respuesta = await pool.query(
      `SELECT * from  public.f_insert_historial_clinico(
                $1::text,
                $2::text,
                $3::numeric,
                $4::text,
                $5::text,
                $6::text,
                $7::text,
                $8::numeric,
                $9::numeric,
                $10::numeric)`,
      [
        fecha_grabacion,
        hora,
        profesional,
        antecedentes,
        sintomas,
        observaciones,
        diagnostico,
        id_usuario,
        id_formula,
        id_mascotas,
      ]
    );

    /**Se verifica si la respuesta es vacio
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
    throw new Error(`  insert_historial_clinico()\n${err}`);
  }
};

const update_historial_clinico = async (
  id_historias,
  fecha_grabacion,
  hora,
  profesional,
  antecedentes,
  sintomas,
  observaciones,
  diagnostico,
  id_usuario,
  id_formula,
  id_mascotas
) => {
  try {
    let respuesta = await pool.query(
      `SELECT * from  public.f_update_historial_clinico(
                $1::numeric,
                $2::text,
                $3::text,
                $4::numeric,
                $5::text,
                $6::text,
                $7::text,
                $8::text,
                $9::numeric,
                $10::numeric,
                $11::numeric)`,
      [
        id_historias,
        fecha_grabacion,
        hora,
        profesional,
        antecedentes,
        sintomas,
        observaciones,
        diagnostico,
        id_usuario,
        id_formula,
        id_mascotas,
      ]
    );

    /**Se verifica si la respuesta es vacio
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
    throw new Error(`  update_historial_clinico()\n${err}`);
  }
};

const insert_formulas = async (
  id_medicina,
  dosificacion,
  frecuencia,
  dias,
  recomendacion
) => {
  try {
    let respuesta = await pool.query(
      `select *  from   f_insert_formulas(
                $1::numeric,
                $2::text,
                $3::text,
                $4::text,
                $5::text)`,
      [id_medicina, dosificacion, frecuencia, dias, recomendacion]
    );

    /**Se verifica si la respuesta es vacio
     */
    if (JSON.stringify(respuesta.rows) === '[]') {
      //Se le asigna null a la respuesta
      respuesta = 0;
    } else {
      /**En caso contrario quiere decir que si arrojó 1 registro
       * se retorna el array */
      respuesta = respuesta.rows[0].id_formula;
    }
    return respuesta;
  } catch (err) {
    throw new Error(`  insert_historial_clinico()\n${err}`);
  }
};

const read_medicinas = async () => {
  try {
    let respuesta = await pool.query(`select * from f_readmedicinas()`, []);

    /**Se verifica si la respuesta es vacio
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
    throw new Error(`  read_medicinas ()\n${err}`);
  }
};

const insert_notas = async (nota, id_historias) => {
  try {
    let respuesta = await pool.query(
      `select * from f_insert_notas_historias(
                $1::text,
                $2::numeric
                )`,
      [nota, id_historias]
    );

    /**Se verifica si la respuesta es vacio
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
    throw new Error(`  insert_notas ()\n${err}`);
  }
};

const insert_examen = async (
  id_tipo_examen,
  descripcion,
  fecha_examen,
  resultados
) => {
  try {
    let respuesta = await pool.query(
      `select * from f_insert_examen_historias($1::numeric,$2::text,$3::text,$4::text)`,
      [id_tipo_examen, descripcion, fecha_examen, resultados]
    );

    /**Se verifica si la respuesta es vacio
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
    throw new Error(` insert_examen()\n${err}`);
  }
};

const read_examen = async () => {
  try {
    let respuesta = await pool.query(`select * from f_readexamen()`, []);

    /**Se verifica si la respuesta es vacio
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
    throw new Error(`  read_examen ()\n${err}`);
  }
};

const readt_examenidhidm = async (req, res) => {
  try {
    const { id_historias, id_mascotas } = req.body;
    let respuesta = await pool.query(
      `SELECT * from f_readt_examenbyid((SELECT id_examen from f_readt_examenidhidm($1::numeric,$2::numeric)))`,
      [id_historias, id_mascotas]
    );

    /**Se verifica si la respuesta es vacio
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
  } catch (error) {
    throw new Error(`  readt_examenidhidm ()\n${error}`);
  }
};

const readt_historias_clinicas = async (req) => {
  try {
    
    const { id_usuario, id_mascotas} = req.body;

    let respuesta = await pool.query(`SELECT * FROM f_read_historias_clinicas($1, $2)`,[id_usuario, id_mascotas]);

    /* let respuesta1 = await pool.query(
      ` select * from f_read_historias_clinicas($1::numeric,$2::numeric,$3::numeric)`,
      [id_usuario, id_mascotas, id_clientes]
    ); */

    /**Se verifica si la respuesta es vacio
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
    throw new Error(`  insert_notas ()\n${err}`);
  }
};

const read_historiaid = async (id_historias) => {
  try {
    let respuesta = await pool.query(
      ` select * from f_readhistoriaid($1::numeric)`,
      [id_historias]
    );

    /**Se verifica si la respuesta es vacio
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
    throw new Error(`  f_readhistoriaid ()\n${err}`);
  }
};

module.exports = {
  insert_historial_clinico,
  insert_formulas,
  read_medicinas,
  insert_notas,
  insert_examen,
  read_examen,
  readt_historias_clinicas,
  update_historial_clinico,
  read_historiaid,
  readt_examenidhidm,
};
