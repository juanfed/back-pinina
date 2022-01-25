const pool = require('../../database/dbConection');
const { decryptPassword } = require("../utils/encryptPassword");

const readT_usuarioLogin = async(req) => {
    try {
        const { correo, password } = req.body;

        let respuesta = await pool.query(`SELECT * from f_readusuregister
                        ($1::character varying)`, [
                correo
            ]);;
       
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
            let passwordValido = await decryptPassword(password, respuesta.rows[0].password)
            
            if(passwordValido) {
                respuesta = respuesta.rows[0];
            } else {
                respuesta = null;
            }
        }
    
        return respuesta;
    } catch (err) {
        console.log(err)
        throw new Error(`login.controller.js->readT_usuarioLogin()\n${err}`);
    }
}

module.exports = {
    readT_usuarioLogin
}