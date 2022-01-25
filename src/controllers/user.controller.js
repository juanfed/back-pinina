const pool = require('../../database/dbConection');
const { encryptPassword } = require("../utils/encryptPassword");  

const createT_usuario_mail = async(data) => {
    try {
    
        const { correo, origen_cuenta, codigo_ubicacion_geografica, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, telefono, firewall } = data;
        
        // Generación de password temporal
        let password_temp= await pool.query(`SELECT * FROM f_create_temp_password()`);
        password_temp = password_temp.rows[0].password_temp;

        // Encriptación de password temporal
        let passwordHash = await encryptPassword(password_temp);

        let respuesta =
            await pool.query(`SELECT * FROM f_register_mail($1::character varying, $2::character varying,
                $3::character varying, $4::character varying, $5::character varying, $6::character varying,
                $7::character varying, $8::character varying, $9::numeric, $10::numeric)`, [
                correo, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido,
                telefono, firewall, passwordHash, codigo_ubicacion_geografica, origen_cuenta
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

        return {
            respuesta,
            password_temp
        };

    } catch (err) {
        console.log(err)
        throw new Error(`user.controller.js->createT_usuario_mail()\n${err}`);
    }
}

const readT_usuarioCorreo = async(correo) => {
    try {
        let respuesta =
            await pool.query(`SELECT * from f_readusuregister
                        ($1::character varying)`, [
                correo
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
        console.log(err)
        throw new Error(`user.controller.js->readT_usuarioCorreo()\n${err}`);
    }
}

module.exports = {
    readT_usuarioCorreo,
    createT_usuario_mail
}