const pool = require('../../database/dbConection');

const crearComentario = async(req) => {

    try {

        const { id_publicacion, comentario, id_clientes} = req.body;
        
        let respuesta = await pool.query(`SELECT * FROM f_insert_comentario($1, $2, $3)`,
            [
                id_publicacion,
                comentario,
                id_clientes
            ]
        );

        if (JSON.stringify(respuesta.rows) === '[]') {
            respuesta = null;
        } else {
            respuesta = respuesta.rows[0];
        }

        return respuesta;
        
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }

}

const mostraComentarios = async(req) => {

    try {
        
        let respuesta = await pool.query(`SELECT * FROM t_comentarios_publicaciones`);

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

const comentarioIdExiste = async(id) => {

    try {

        let respuesta = await pool.query(`SELECT * FROM t_comentarios_publicaciones WHERE comentario_id = $1`,[id]);

        if (JSON.stringify(respuesta.rows) === '[]') {
            respuesta = null;
        } else {
            respuesta = respuesta.rows[0];
        }

        return respuesta;
        
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }

}

const actualizarComentario = async(req) => {

    try {

        const { comentario_id, id_publicacion, comentario, id_clientes} = req.body;

        let respuesta = await pool.query(`SELECT * FROM f_update_comentario($1, $2, $3, $4)`,
            [   
                comentario_id,
                id_publicacion,
                comentario,
                id_clientes
            ]
        );

        if (JSON.stringify(respuesta.rows) === '[]') {
            respuesta = null;
        } else {
            respuesta = respuesta.rows[0];
        }

        return respuesta;
        
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }

}

const eliminarComentario = async(id) => {

    try {

        let respuesta = await pool.query(`DELETE FROM t_comentarios_publicaciones WHERE comentario_id = $1 RETURNING *`,[id]);

        return respuesta.rows[0];
        
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }

}

module.exports = {
    crearComentario,
    mostraComentarios,
    comentarioIdExiste,
    actualizarComentario,
    eliminarComentario
};