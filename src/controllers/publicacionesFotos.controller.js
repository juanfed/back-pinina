const pool = require('../../database/dbConection');

const mostrarFotos = async (req) => {

    try {

        const id_publicacion = req.params.id_publicacion;


        let respuesta = await pool.query(`select * from f_fotos_publicacion_id(${id_publicacion})`);

        if (JSON.stringify(respuesta.rows) === '[]') {
            respuesta = null;
        } else {
            respuesta = respuesta.rows[0];
        }

        return respuesta;

    } catch (error) {
        console.log(error)
        throw new Error(`Error en mostrarFotos ${error}`)
    }

}



const subirFotoPublicacion = async (id_publicacion, id_mascotas, req) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0 || !req.files.imagen) {
            return null;

        } else {
            let out;
            for (let i = 0; i < req.files.length; i++) {
                const { imagen } = req.files[i];
                const uploadPath = path.join('src/uploads/uploads2/', imagen.name);
                const nombre_imagen = imagen.name;
                imagen.mv(uploadPath, (err) => {
                    if (err) {
                        throw new Error("Error subiendo imagen " + err)
                    }
                    console.log('File uploaded to ' + uploadPath);
                })
                const imagenSubida = await pool.query('select * from f_insert_foto_publicacion($1,$2,$3,$4)',[uploadPath, nombre_imagen, id_mascotas, id_publicacion]);
                out += imagenSubida;
            }
            return out;
        }



    } catch (error) {
        throw new Error('Error subirFotoPublicacion ' + error);
    }
}

module.exports = { mostrarFotos };