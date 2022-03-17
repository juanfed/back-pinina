const pool = require("../../database/dbConection");
const createT_vacunas7 = async(req) => {
try {

const { id_tipo_vacunas,id_mascotas,id_clientes,id_usuario,sintomas_vacuna,fecha_vacuna,dosis,fecha_proxima_vacuna } = req.body;

let respuesta =
    await pool.query(`SELECT * FROM f_createvactvacuc
                ($1::numeric,$2::numeric,$3::numeric,$4::numeric,$5::text,$6::text,$7::text,$8::text)`, [
        id_tipo_vacunas,id_mascotas,id_clientes,id_usuario,sintomas_vacuna,fecha_vacuna,dosis,fecha_proxima_vacuna
    ]);
/**Para verificar que el resultado de la consulta no arroja ningún registro
 * se convierte la respuesta en un JSONArray y se compara con []
 */
if (JSON.stringify(respuesta.rows) === '[]') {

    //Se le asigna null a la respuesta
    respuesta = null;
}
/**En caso contrario quiere decir que si arrojó 1 registro
 * por lo tanto se le asigna a la respuesta los valores de los atributos
 * del registro encontrado que está en la primera posición del array */
else {
    respuesta = respuesta.rows[0];
}

return respuesta;

} catch (err) {
    throw new Error(`T_vacunas7.controller.js->createT_vacunas7()
${err}`);
}
}
const updateT_vacunas7 = async (req) => {
    try {
    
        const { id_vacuna,id_tipo_vacunas,id_mascotas,id_clientes,id_usuario,sintomas_vacuna,fecha_vacuna,dosis,fecha_proxima_vacuna } = req.body;
    
        let respuesta =
            await pool.query(`SELECT * FROM f_updatevactvacuc
                        ($1::numeric,$2::numeric,$3::numeric,$4::numeric,$5::numeric,$6::text,$7::text,$8::text,$9::text)`, [
                id_vacuna,id_tipo_vacunas,id_mascotas,id_clientes,id_usuario,sintomas_vacuna,fecha_vacuna,dosis,fecha_proxima_vacuna
            ]);
        /**Para verificar que el resultado de la consulta no arroja ningún registro
         * se convierte la respuesta en un JSONArray y se compara con []
         */
        if (JSON.stringify(respuesta.rows) === '[]') {
    
            //Se le asigna null a la respuesta
            respuesta = null;
        }
        /**En caso contrario quiere decir que si arrojó 1 registro
         * por lo tanto se le asigna a la respuesta los valores de los atributos
         * del registro encontrado que está en la primera posición del array */
        else {
            respuesta = respuesta.rows[0];
        }
    
        return respuesta;
    
        } catch (err) {
            throw new Error(`T_vacunas7.controller.js->updateT_vacunas7()
${err}`);
        }
    }

const deleteT_vacunas7 = async (id_vacuna) => {
    try {
    
        let respuesta =
            await pool.query(`SELECT * FROM f_deletevactvacuc
                        ($1::numeric)`, [
                id_vacuna
            ]);
        /**Para verificar que el resultado de la consulta no arroja ningún registro
         * se convierte la respuesta en un JSONArray y se compara con []
         */
        if (JSON.stringify(respuesta.rows) === '[]') {
    
            //Se le asigna null a la respuesta
            respuesta = null;
        }
        /**En caso contrario quiere decir que si arrojó 1 registro
         * por lo tanto se le asigna a la respuesta los valores de los atributos
         * del registro encontrado que está en la primera posición del array */
        else {
            respuesta = respuesta.rows[0];
        }
        
        return respuesta;
    
        } catch (err) {
            throw new Error(`T_vacunas7.controller.js->deleteT_vacunas7()
${err}`);
        }
    }
const readT_vacunas7 = async(req) => {
    try {
    
        const { id_vacuna } = req.body;
    
        let respuesta =
            await pool.query(`SELECT * from f_readvactvacuc
                        ($1::numeric)`, [
                id_vacuna
            ]);
        /**Para verificar que el resultado de la consulta no arroja ningún registro
         * se convierte la respuesta en un JSONArray y se compara con []
         */
        if (JSON.stringify(respuesta.rows) === '[]') {
    
            //Se le asigna null a la respuesta
            respuesta = null;
        }
        /**En caso contrario quiere decir que si arrojó 1 registro
         * por lo tanto se le asigna a la respuesta los valores de los atributos
         * del registro encontrado que está en la primera posición del array */
        else {
            respuesta = respuesta.rows;
        }
    
        return respuesta;
    
        } catch (err) {
            throw new Error(`T_vacunas7.controller.js->readT_vacunas7()
${err}`);
        }
}

const readGT_vacunas7 = async () => {
    try {
    
        let respuesta =
            await pool.query(`SELECT * from f_readGvactvacuc()`);
        /**Para verificar que el resultado de la consulta no arroja ningún registro
         * se convierte la respuesta en un JSONArray y se compara con []
         */
        if (JSON.stringify(respuesta.rows) === '[]') {
    
            //Se le asigna null a la respuesta
            respuesta = null;
        }
        /**En caso contrario quiere decir que si arrojó 1 registro
         * por lo tanto se le asigna a la respuesta los valores de los atributos
         * del registro encontrado que está en la primera posición del array */
        else {
            respuesta = respuesta.rows;
        }
    
        return respuesta;
    
        } catch (err) {
            throw new Error(`T_vacunas7.controller.js->readGT_vacunas7()
${err}`);
        }
}
module.exports = {
    
        readT_vacunas7
    ,
        readGT_vacunas7
    ,
        createT_vacunas7
    ,
        updateT_vacunas7
    ,
        deleteT_vacunas7
    
}