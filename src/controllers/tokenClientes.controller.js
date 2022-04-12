const jwt = require('jsonwebtoken');

const generarToken = async (clienteDb) => {

    try {

        const tokenGenerado = jwt.sign(
            {   
                nombre: clienteDb.primer_nombre,
                apellidos: clienteDb.primer_apellido,
                correo: clienteDb.correo,
                id: clienteDb.id_clientes
            },
            "" + process.env.SECRETPRIVATEKEY,
            { expiresIn: '5h' }
        );

        return tokenGenerado;

    } catch (error) {
        console.log(error);
        throw new Error(`Ocurrio un error en la creación del token del cliente ${error}`);
    }

}

const decodificarToken = async (token) => {

    try {

        const payload = await jwt.verify(token, "" + process.env.SECRETPRIVATEKEY);

        return payload;

    } catch (error) {
        console.log(error);
        throw new Error(`Ocurrio un error al verificar el token del cliente ${error}`);
    }

}

module.exports = {
    generarToken,
    decodificarToken
};