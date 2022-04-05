const pool = require('../../database/dbConection');

const readT_publicaciones = async() => {

    try {

        let respuesta = pool.query(`SELECT * FROM t_publicaciones`);

        if (JSON.stringify(respuesta.rows) === '[]') {
            respuesta = null;
        } else {
            respuesta = respuesta.rows;
        }

        return respuesta;
        
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }

}

module.exports = {
    readT_publicaciones
};