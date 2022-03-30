const pool = require("../../database/dbConection");
const createT_examen5 = async(req) => {
try {

const { id_tipo_examen,descripcion,fecha_examen,resultados } = req.body;

let respuesta =
    await pool.query(`SELECT * FROM f_createexatexamg
                ($1::numeric,$2::text,$3::text,$4::text)`, [
        id_tipo_examen,descripcion,fecha_examen,resultados
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
    throw new Error(`T_examen5.controller.js->createT_examen5()
${err}`);
}
}
const updateT_examen5 = async (req) => {
    try {
    
        const { id_examen,id_tipo_examen,descripcion,fecha_examen,resultados } = req.body;
    
        let respuesta =
            await pool.query(`SELECT * FROM f_updateexatexamg
                        ($1::numeric,$2::numeric,$3::text,$4::text,$5::text)`, [
                id_examen,id_tipo_examen,descripcion,fecha_examen,resultados
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
            throw new Error(`T_examen5.controller.js->updateT_examen5()
${err}`);
        }
    }

const deleteT_examen5 = async (id_examen) => {
    try {
    
        let respuesta =
            await pool.query(`SELECT * FROM f_deleteexatexamg
                        ($1::numeric)`, [
                id_examen
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
            throw new Error(`T_examen5.controller.js->deleteT_examen5()
${err}`);
        }
    }
const readT_examen5 = async(req) => {
    try {
    
        const { id_examen } = req.body;
    
        let respuesta =
            await pool.query(`SELECT * from f_readexatexamg
                        ($1::numeric)`, [
                id_examen
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
            throw new Error(`T_examen5.controller.js->readT_examen5()
${err}`);
        }
}

const readGT_examen5 = async () => {
    try {
    
        let respuesta =
            await pool.query(`SELECT * from f_readGexatexamg()`);
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
            throw new Error(`T_examen5.controller.js->readGT_examen5()
${err}`);
        }
}
module.exports = {
    
        readT_examen5
    ,
        readGT_examen5
    ,
        createT_examen5
    ,
        updateT_examen5
    ,
        deleteT_examen5
    
}