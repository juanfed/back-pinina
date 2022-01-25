const jwt = require("jsonwebtoken");
const { OAuth2Client } = require('google-auth-library'); // autenticacion google
const client = new OAuth2Client(process.env.CLIENT_ID); // autenticacion google

/**
 * Decodifica  el token dado y  retorna un objeto con los
 * datos del usuario
 * @param {string} token  el token de google
 * @return {object} usuario
 */

async function generarToken(usuarioDb) {
    const tokenGenerado = jwt.sign(
        {
        nombre: usuarioDb.primer_nombre,
        apellidos: usuarioDb.primer_apellido,
        correo: usuarioDb.correo,
        id: usuarioDb.id,
        origen_cuenta: usuarioDb.origen_cuenta
        },
        "" + process.env.SECRETPRIVATEKEY,
        { expiresIn: '5h' }
    ); // firma el token genera_
    return tokenGenerado;
}

async function decodificarToken(token) { // decodifica y google valida el token
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID,

        });
        const payload = ticket.getPayload(); // carga los datos 
        return payload   //retorna la carga de los datos

    } catch (error) {
        return res.status(400).json({
            code: -2,
            msg: error
        });
    }
}

module.exports = {
    decodificarToken,
    generarToken
}