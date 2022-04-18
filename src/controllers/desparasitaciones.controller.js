const pool = require('../../database/dbConection');

const readT_desparasitante = async(req) => {
    try {
        const { id_usuario, id_mascotas } = req.body;

        let respuesta =
            await pool.query(`SELECT * from f_readdesparasitante
                                ($1::numeric, $2::numeric)`, [
                id_usuario, id_mascotas
            ]);
        
        /**Para verificar que el resultado de la consulta no arroja ningún registro
         * se convierte la respuesta en un JSONArray y se compara con []
         */
        if (JSON.stringify(respuesta.rows) === '[]') {
    
            //Se le asigna null a la respuesta
            respuesta = null;
        }
        else {
            respuesta = respuesta.rows;
        }

        return respuesta;

    } catch (err) {
        console.log(err)
        throw new Error(`clientes.controller.js->readT_desparasitante()\n${err}`);
    }
}

const createT_desparasitante = async(req) => {
    try {
        const {id_tipo_desparasitante, fecha_desparasitante, dosis, fecha_proximo_des,
            sintomas_desparasitante, id_mascotas} = req.body;

        let respuesta =
            await pool.query(`SELECT * FROM f_createdesparasitaciones($1::numeric,
                            $2::text, $3::text, $4::text, $5::text, $6::numeric)`, [
                id_tipo_desparasitante, fecha_desparasitante, dosis, fecha_proximo_des,
                sintomas_desparasitante, id_mascotas
            ]);
        
        /**Para verificar que se retorne la fila con los datos actualizados
         * se convierte la respuesta en un JSONArray y se compara con []
         */
         if (JSON.stringify(respuesta.rows) === '[]') {
    
            //Se le asigna null a la respuesta
            respuesta = null;
        }
        else {
            respuesta = respuesta.rows;
        }

        return respuesta;

    } catch (err) {
        console.log(err)
        throw new Error(`clientes.controller.js->createT_desparasitante()\n${err}`);
    }
}

const deleteT_desparasitante = async(req) => {
    try {
        const { id_desparasitante } = req.body;

        let respuesta =
            await pool.query(`SELECT * from f_deletedesparasitante
                                ($1::integer)`, [
                id_desparasitante
            ]);
        
        /**Para verificar que el resultado de la consulta no arroja ningún registro
         * se convierte la respuesta en un JSONArray y se compara con []
         */
        if (JSON.stringify(respuesta.rows) === '[]') {
    
            //Se le asigna null a la respuesta
            respuesta = null;
        }
        else {
            respuesta = respuesta.rows;
        }

        return respuesta;

    } catch (err) {
        console.log(err)
        throw new Error(`clientes.controller.js->deleteT_desparasitante()\n${err}`);
    }
}

const updateT_desparasitante = async(req) => {
    try {
        const {id_desparasitante, id_tipo_desparasitante, fecha_desparasitante, dosis,
            fecha_proximo_des, sintomas_desparasitante, id_mascotas} = req.body;

        let respuesta =
            await pool.query(`SELECT * FROM f_updatedesparasitaciones($1::integer,
                            $2::numeric, $3::text, $4::text, $5::text, $6::text, $7::numeric)`, [
                id_desparasitante, id_tipo_desparasitante, fecha_desparasitante, dosis,
                fecha_proximo_des, sintomas_desparasitante, id_mascotas
            ]);
        
        
        /**Para verificar que se retorne la fila con los datos actualizados
         * se convierte la respuesta en un JSONArray y se compara con []
         */
         if (JSON.stringify(respuesta.rows) === '[]') {
    
            //Se le asigna null a la respuesta
            respuesta = null;
        }
        else {
            respuesta = respuesta.rows;
        }

        return respuesta;

    } catch (err) {
        console.log(err)
        throw new Error(`clientes.controller.js->updateT_desparasitante()\n${err}`);
    }
}

const searchT_desparasitante = async(req) => {
    try {
        const { id_usuario, param_busqueda } = req.body;

        let respuesta =
            await pool.query(`SELECT * from f_searchdesparasitante
                                ($1::numeric, $2::text)`, [
                id_usuario, param_busqueda
            ]);
        
        /**Para verificar que el resultado de la consulta no arroja ningún registro
         * se convierte la respuesta en un JSONArray y se compara con []
         */
        if (JSON.stringify(respuesta.rows) === '[]') {
    
            //Se le asigna null a la respuesta
            respuesta = null;
        }
        else {
            respuesta = respuesta.rows;
        }

        return respuesta;

    } catch (err) {
        console.log(err)
        throw new Error(`clientes.controller.js->searchT_desparasitante()\n${err}`);
    }
}

const readT_tipodesparasitante_tipomascota = async (id_tipo_mascota) => {
    try {
  
      let respuesta = await pool.query(
        `SELECT * from public.f_readdesparasitantes_tipomascota($1::numeric)`,
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
      throw new Error(`desparasitaciones.controller.js->readT_tipodesparasitante_tipomascota()\n${err}`);
    }
  };

module.exports = {
    readT_desparasitante,
    createT_desparasitante,
    deleteT_desparasitante,
    updateT_desparasitante,
    searchT_desparasitante,
    readT_tipodesparasitante_tipomascota
}