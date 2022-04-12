const pool = require('../../database/dbConection');
const { decryptPassword } = require("../utils/encryptPassword");

const readT_clientesLogin = async (req) => {

    try {

        const { correo, password } = req.body;

        let respuesta = await pool.query(`SELECT * FROM t_clientes WHERE correo = $1`, [correo]);

        if (JSON.stringify(respuesta.rows) === '[]') {
            respuesta = null;
        } else {

            let passwordValido = await decryptPassword(password, respuesta.rows[0].contraseña);

            if (passwordValido) {
                respuesta = respuesta.rows[0];
            } else {
                respuesta = null;
            }
        }

        return respuesta;

    } catch (error) {
        console.log(error);
        throw new Error(`Error al validar cliente ${error}`);
    }

}

module.exports = {
    readT_clientesLogin
};