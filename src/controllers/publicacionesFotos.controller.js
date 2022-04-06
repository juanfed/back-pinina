const pool = require('../../database/dbConection');

const mostrarFotos = async (req) => {

    try {

        const id_publicacion  = req.params.id_publicacion;


        let respuesta = await pool.query(`select * from f_fotos_publicacion_id(${id_publicacion})`);

        if (JSON.stringify(respuesta.rows) === '[]') {
            respuesta = null;
        } else {
            respuesta = respuesta.rows[0];
        }

        return respuesta;

    } catch (error) {
        console.log(error)
        throw new Error (`Error en mostrarFotos ${error}`)
    }

}

module.exports = {mostrarFotos};