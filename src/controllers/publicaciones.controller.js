const pool = require('../../database/dbConection');

const readT_publicaciones = async() => {

    try {

        let respuesta = await pool.query(`SELECT * FROM v_t_publicaciones`);

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
        throw new Error(`${error}`);
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
        throw new Error(`${error}`);
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
        throw new Error(`${error}`);
    }

}

const eliminarPublicacion = async(id) => {

    try {

        let respuesta = await pool.query(`DELETE FROM t_publicaciones WHERE id_publicacion = $1 RETURNING *`,[id]);

        return respuesta.rows[0];
        
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }

}

module.exports = {
    readT_publicaciones,
    crearPublicacion,
    buscarIdPublicacion,
    actualizarPublicacion,
    eliminarPublicacion
};