const pool = require('../../database/dbConection');

const crearComentario = async(req) => {

    try {

        const { id_publicacion, comentario, id_clientes} = req.body;

        const date = new Date;

        const fecha_comentario = Intl.DateTimeFormat('en-US').format(date);
        
        let respuesta = await pool.query(`SELECT * FROM f_insert_comentario_publicacion($1, $2, $3, $4)`,
            [
                id_publicacion,
                comentario,
                id_clientes,
                fecha_comentario
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
        throw new Error(`Error al crear comentario ${error}`);
    }

}

const mostraComentarios = async(req) => {

    try {
        const {id_publicacion}  = req.body;
        let respuesta = await pool.query(`SELECT * FROM f_comentarios_publicacion(${id_publicacion})`);

        if (JSON.stringify(respuesta.rows) === '[]') {
            respuesta = null;
        } else {
            respuesta = respuesta.rows;
        }

        return respuesta;
        
    } catch (error) {
        console.log(error);
        throw new Error(`Error al mostrar comentarios ${error}`);
    }

}

const comentarioIdExiste = async(id) => {

    try {

        let respuesta = await pool.query(`select * from f_comentario_id($1)`,[id]);

        if (JSON.stringify(respuesta.rows) === '[]') {
            respuesta = null;
        } else {
            respuesta = respuesta.rows[0];
        }

        return respuesta;
        
    } catch (error) {
        console.log(error);
        throw new Error(`Error al consultar id comentario-existe ${error}`);
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
        throw new Error(`Error al actualizar comentario ${error}`);
    }

}

const eliminarComentario = async(id) => {

    try {

        let respuesta = await pool.query(`SELECT * FROM f_delete_comentario_publicacion($1)`,[id]);

        return respuesta.rows[0];
        
    } catch (error) {
        console.log(error);
        throw new Error(`Error al eliminar comentario ${error}`);
    }

}

module.exports = {
    crearComentario,
    mostraComentarios,
    comentarioIdExiste,
    //actualizarComentario
    eliminarComentario
};