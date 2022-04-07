const pool = require('../../database/dbConection');
const path = require('path')
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
            let consecutivo = 1;
            if (!req.files.imagen[1]) {
                const imagen = req.files.imagen;
                const uploadPath = path.join('src/uploads/uploads2/', imagen.name);
                const nombre_imagen = imagen.name;
                imagen.mv(uploadPath, (err) => {
                    if (err) {
                        throw new Error("Error subiendo imagen " + err)
                    }
                    console.log('File uploaded to ' + uploadPath);
                })
                const imagenSubida = await pool.query('select * from f_insert_foto_publicacion($1,$2,$3,$4,$5)', [uploadPath, nombre_imagen, id_mascotas, id_publicacion, consecutivo]);
            } else {
                for (let i = 0; i < Object.keys(req.files.imagen).length; i++) {
                    if (!(consecutivo > 5)) {
                        const imagen = req.files.imagen[i];
                        const uploadPath = path.join('src/uploads/uploads2/', imagen.name);

                        const nombre_imagen = imagen.name;
                        imagen.mv(uploadPath, (err) => {
                            if (err) {
                                throw new Error("Error subiendo imagen " + err)
                            }
                            console.log('File uploaded to ' + uploadPath);
                            consecutivo++;
                        })
                        
                        out += imagenSubida;
                    } else {
                        return 'limite de fotos alcanzado';
                    }
                }
            }

            return out;

        }

    } catch (error) {
        throw new Error('Error subirFotoPublicacion ' + error);
    }
}

module.exports = {
    mostrarFotos,
    subirFotoPublicacion
};