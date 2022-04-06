const pool = require('../../database/dbConection');

const readT_publicaciones = async() => {

    try {
        

        let respuesta = await pool.query(`SELECT * FROM v_t_publicaciones`);
        


        for (let i = 0; i < respuesta.rows.length; i++) {
            let id_publicacion = respuesta.rows[i].id_publicacion;

            let respuesta2 = await pool.query(`select * from f_fotos_publicacion_id(${id_publicacion})`);
            let respuesta3 = await pool.query(`SELECT * FROM f_comentarios_publicacion(${id_publicacion})`);
            respuesta.rows[i].fotos = respuesta2.rows;
            respuesta.rows[i].comentarios = respuesta3.rows;
        }
      
      
       
        if (JSON.stringify(respuesta.rows) === '[]') {
            respuesta = null;
        } else {
            respuesta = respuesta.rows;
        }

        return respuesta;
        
    } catch (error) {
        console.log(error);
        throw new Error(`Error al consultar comentarios ${error}`);
    }

}

const crearPublicacion = async(req) => {

    try {

        const { id_clientes, id_mascotas, descripcion_publicacion } = req.body;

        const date = new Date;

        const fecha_publicacion = Intl.DateTimeFormat('es-MX').format(date);
        
        let respuesta = await pool.query(`SELECT * FROM f_insert_publicacion($1, $2, $3, $4)`,
            [
                id_clientes,
                id_mascotas,
                descripcion_publicacion,
                fecha_publicacion
            ]
        );

        if (JSON.stringify(respuesta.rows) === '[]') {
            respuesta = null;
        } else {
            respuesta = respuesta.rows;
        }

        return respuesta;
        
    } catch (error) {
        console.log(error);
        throw new Error(`Error al crear publicación ${error}`);
    }

}

const buscarIdPublicacion = async(id) => {

    try {

        let respuesta = await pool.query(`SELECT * FROM v_t_publicaciones WHERE id_publicacion = $1`,[id]);

        if (JSON.stringify(respuesta.rows) === '[]') {
            respuesta = null;
        } else {
            respuesta = respuesta.rows;
        }

        return respuesta;
        
    } catch (error) {
        console.log(error);
        throw new Error(`Error al buscar Id publicación ${error}`);
    }

}

const actualizarPublicacion = async(req) => {

    try {

        const { id_publicacion, id_clientes, id_mascotas, descripcion_publicacion} = req.body;

        const date = new Date;

        const fecha_publicacion = Intl.DateTimeFormat('es-MX').format(date);
        
        let respuesta = await pool.query(`SELECT * FROM f_update_publicacion($1, $2, $3, $4, 5$)`,
            [   
                id_publicacion,
                id_clientes,
                id_mascotas,
                descripcion_publicacion,
                fecha_publicacion
            ]
        );

        if (JSON.stringify(respuesta.rows) === '[]') {
            respuesta = null;
        } else {
            respuesta = respuesta.rows;
        }

        return respuesta;
        
    } catch (error) {
        console.log(error);
        throw new Error(`Error al actualizar publicación ${error}`);
    }

}

const eliminarPublicacion = async(id) => {

    try {

        let respuesta = await pool.query(`DELETE FROM t_publicaciones WHERE id_publicacion = $1 RETURNING *`,[id]);

        return respuesta.rows[0];
        
    } catch (error) {
        console.log(error);
        throw new Error(`Error al eliminar publicación ${error}`);
    }

}

const darLikePublicacion = async(id) => {

    try {

        let respuesta = await pool.query(`SELECT * FROM f_like_publicacion($1)`,[id]);

        if (JSON.stringify(respuesta.rows) === '[]') {
            respuesta = null;
        } else {
            respuesta = respuesta.rows[0].likes_publicacion;
        }

        return respuesta;
        
    } catch (error) {
        console.log(error);
        throw new Error(`Error al dar like a la publicación ${error}`);
    }

}

module.exports = {
    readT_publicaciones,
    crearPublicacion,
    buscarIdPublicacion,
    actualizarPublicacion,
    eliminarPublicacion,
    darLikePublicacion
};