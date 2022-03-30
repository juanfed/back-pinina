const pool = require("../../database/dbConection");
const createT_historias_clinicas5 = async(req) => {
try {

const { profesional,id_usuario,id_formula,id_mascotas,observaciones,fecha_grabacion,hora,diagnostico,antecedentes,sintomas,id_examen } = req.body;

let respuesta =
    await pool.query(`SELECT * FROM f_createhistexamg
                ($1::numeric,$2::numeric,$3::numeric,$4::numeric,$5::text,$6::text,$7::text,$8::text,$9::text,$10::text,$11::numeric)`, [
        profesional,id_usuario,id_formula,id_mascotas,observaciones,fecha_grabacion,hora,diagnostico,antecedentes,sintomas,id_examen
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
    throw new Error(`T_historias_clinicas5.controller.js->createT_historias_clinicas5()
${err}`);
}
}
const updateT_historias_clinicas5 = async (req) => {
    try {
    
        const { id_historias,profesional,id_usuario,id_formula,id_mascotas,observaciones,fecha_grabacion,hora,diagnostico,antecedentes,sintomas } = req.body;
    
        let respuesta =
            await pool.query(`SELECT * FROM f_updatehistexamg
                        ($1::numeric,$2::numeric,$3::numeric,$4::numeric,$5::numeric,$6::text,$7::text,$8::text,$9::text,$10::text,$11::text)`, [
                id_historias,profesional,id_usuario,id_formula,id_mascotas,observaciones,fecha_grabacion,hora,diagnostico,antecedentes,sintomas
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
            throw new Error(`T_historias_clinicas5.controller.js->updateT_historias_clinicas5()
${err}`);
        }
    }

const deleteT_historias_clinicas5 = async (id_historias) => {
    try {
    
        let respuesta =
            await pool.query(`SELECT * FROM f_deletehistexamg
                        ($1::numeric)`, [
                id_historias
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
            throw new Error(`T_historias_clinicas5.controller.js->deleteT_historias_clinicas5()
${err}`);
        }
    }
const readT_historias_clinicas5 = async(req) => {
    try {
    
        const { id_examen } = req.body;
    
        let respuesta =
            await pool.query(`SELECT * from f_readhistexamg
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
            throw new Error(`T_historias_clinicas5.controller.js->readT_historias_clinicas5()
${err}`);
        }
}

const readGT_historias_clinicas5 = async () => {
    try {
    
        let respuesta =
            await pool.query(`SELECT * from f_readGhistexamg()`);
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
            throw new Error(`T_historias_clinicas5.controller.js->readGT_historias_clinicas5()
${err}`);
        }
}
module.exports = {
    
        readT_historias_clinicas5
    ,
        readGT_historias_clinicas5
    ,
        deleteT_historias_clinicas5
    ,
        updateT_historias_clinicas5
    ,
        createT_historias_clinicas5
    
}