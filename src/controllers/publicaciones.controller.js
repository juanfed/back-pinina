const pool = require('../../database/dbConection');
const fs = require('fs');

const readT_publicaciones = async (req) => {

    try {


        let respuesta = await pool.query(`SELECT * FROM f_publicaciones_seguidos(${req.params.id_clientes})`);


        //por cada publicacion se extraen los datos de fotos de publicacion, comentarios y la foto de perfil de la mascota
        for (let i = 0; i < respuesta.rows.length; i++) {
            let id_publicacion = respuesta.rows[i].id_publicacion;

            let respuesta2 = await pool.query(`select * from f_fotos_publicacion_id(${id_publicacion})`);
            let respuesta3 = await pool.query(`SELECT * FROM f_comentarios_publicacion(${id_publicacion})`);
            let respuesta4 = await pool.query(`SELECT * FROM f_foto_perfil_mascota(${respuesta.rows[i].id_mascotas})`)

            respuesta.rows[i].fotos = respuesta2.rows;
            respuesta.rows[i].comentarios = respuesta3.rows;
            respuesta.rows[i].foto_perfil_mascota = respuesta4.rows;
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

const crearPublicacion = async (req) => {

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
            respuesta = respuesta.rows[0];
        }

        return respuesta;

    } catch (error) {
        console.log(error);
        throw new Error(`Error al crear publicación ${error}`);
    }

}

const buscarIdPublicacion = async (id) => {

    try {

        let respuesta = await pool.query(`SELECT * FROM v_t_publicaciones WHERE id_publicacion = $1`, [id]);

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

const actualizarPublicacion = async (req) => {

    try {

        const { id_publicacion, id_clientes, id_mascotas, descripcion_publicacion } = req.body;

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

const eliminarPublicacion = async (id) => {

    try {
        
        let respuesta = await pool.query(`SELECT * FROM f_eliminar_comentarios_likes_fotos($1)`, [id]);

        for (let i = 0; i < respuesta.rows.length; i++) {
            fs.unlinkSync(`src/uploads/uploads2/${respuesta.rows[i].nombre_imagen}`);
        }

        respuesta = await pool.query(`SELECT * FROM f_eliminar_publicacion($1)`, [id]);

        if (JSON.stringify(respuesta.rows) === '[]') {
            respuesta = null;
        } else {
            respuesta = respuesta.rows[0];
        }

        return respuesta;

    } catch (error) {
        console.log(error);
        throw new Error(`Error al eliminar publicación ${error}`);
    }

}

const darLikePublicacion = async (id_publicacion, id_clientes) => {

    try {
        try {
            let respuesta2 = await pool.query(`Select * from f_likes_publicacion(${id_clientes},${id_publicacion})`)
        } catch (Err) {
            let respuesta = await pool.query(`SELECT * FROM f_no_like_publicacion($1)`, [id_publicacion]);
            let respuesta3 = await pool.query(`SELECT * FROM f_borrar_likes_publicacion(${id_clientes},${id_publicacion})`)
            return respuesta.rows;
        }
        let respuesta = await pool.query(`SELECT * FROM f_like_publicacion($1)`, [id_publicacion]);

        if (JSON.stringify(respuesta.rows) === '[]') {
            respuesta = null;
        } else {
            respuesta = respuesta.rows[0];
        }
        return respuesta;

    } catch (error) {
        console.log(error);
        throw new Error(`Error al dar like a la publicación ${error}`);
    }

}

const buscarIdCliente = async (id) => {

    try {

        let respuesta = await pool.query(`SELECT * FROM f_searcht_usuario_id($1)`, [id]);

        if (JSON.stringify(respuesta.rows) === '[]') {
            respuesta = null;
        } else {
            respuesta = respuesta.rows[0];
        }

        return respuesta;

    } catch (error) {
        console.log(error);
        throw new Error(`Error al buscar Id publicación ${error}`);
    }

}

const seguirCuentaUsuario = async (req) => {

    try {

        const { id_usuario, id_clientes } = req.params;
        if (id_clientes == id_usuario) {
            throw new Error("No se puede seguir");
        }
        //se llama a la funcion donde el segundo parametro es el seguidor y el primero la cuenta que sigue
        let respuesta;
        let sigue = await pool.query(`select * from f_sigue(${id_clientes}, ${id_usuario})`);
        if (JSON.stringify(sigue.rows) === '[]') {
            respuesta = await pool.query(`select * from f_seguir($1,$2)`, [id_clientes, id_usuario]);
            respuesta.rows[0].sigue = true;
        } else {
            respuesta = await pool.query(`Select * from f_no_seguir(${id_clientes}, ${id_usuario})`);
            respuesta.rows[0].sigue = false;
        }


        if (JSON.stringify(respuesta.rows) === '[]') {
            respuesta = null;
        } else {
            respuesta = respuesta.rows[0];
        }

        return respuesta;

    } catch (error) {
        console.log(error);
        throw new Error(`Error al seguir cuenta ${error}`);
    }

}

module.exports = {
    readT_publicaciones,
    crearPublicacion,
    buscarIdPublicacion,
    actualizarPublicacion,
    eliminarPublicacion,
    darLikePublicacion,
    buscarIdCliente,
    seguirCuentaUsuario
};