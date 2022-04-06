const router = require('express').Router();
const validarCampos = require("../utils/validateFields");
const respuestaT_publicaciones = require('../controllers/publicaciones.controller');

router.get('/mostrarpublicaciones', async(req, res) => {

    try {

        const readT_publicaciones = await respuestaT_publicaciones.readT_publicaciones();

        if (!readT_publicaciones) {
            res.status(400).json({
                code: -1,
                msg: `No hay ninguna publicación registrada!`,
            });
        } else {
            res.status(200).json({
                code: 1,
                msg: `Consulta a publicaciones exitosamente!`,
                publicaciones: readT_publicaciones
            });
        }
        
    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            code: -1,
            error: `Error al mostrar publicaciones ${error}`
        });

    }

});

router.post('/crearpublicaciones', async(req, res) => {

    try {

        const { id_clientes, id_mascotas, descripcion_publicacion} = req.body;

        const campos = [
            {
                nombre: 'id_clientes',
                campo: id_clientes
            },
            {
                nombre: 'id_mascotas',
                campo: id_mascotas
            },
            {
                nombre: 'descripcion_publicacion',
                campo: descripcion_publicacion
            }
        ];

        const camposVacios = validarCampos(campos);

        if (camposVacios) {
            return res.status(400).json({
                code: -1,
                msg: `No ha ingresado el campo ${camposVacios.nombre}`,
            });
        }

        const publicacionCreada = await respuestaT_publicaciones.crearPublicacion(req);

        if (!publicacionCreada) {
            res.status(400).json({
                code: -1,
                msg: `No se pudo crear la publicación!`
            });
        } else {
            res.status(200).json({
                code: 1,
                msg: `publicación creada exitosamente!`
            });
        }
        
    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            code: -1,
            error: `Error al crear publicación ${error}`
        });

    }

});

router.put('/actualizarpublicaciones', async(req, res) => {

    try {

        const { id_publicacion, id_clientes, id_mascotas, descripcion_publicacion} = req.body;

        const campos = [
            {
                nombre: 'id_publicacion',
                campo: id_publicacion
            },
            {
                nombre: 'id_clientes',
                campo: id_clientes
            },
            {
                nombre: 'id_mascotas',
                campo: id_mascotas
            },
            {
                nombre: 'descripcion_publicacion',
                campo: descripcion_publicacion
            }
        ];

        const camposVacios = validarCampos(campos);

        if (camposVacios) {
            return res.status(400).json({
                code: -1,
                msg: `No ha ingresado el campo ${camposVacios.nombre}!`,
            });
        }

        const publicacionExiste = await respuestaT_publicaciones.buscarIdPublicacion(id_publicacion);

        if (!publicacionExiste) {
            return res.status(400).json({
                code: -1,
                msg: `La publicación con id: ${id_publicacion} no existe!`,
            });
        }

        const publicacionActualizada = await respuestaT_publicaciones.actualizarPublicacion(req);

        if (!publicacionActualizada) {
            res.status(400).json({
                code: -1,
                msg: `No se pudo actualizar la publicación!`
            });
        } else {
            res.status(200).json({
                code: 1,
                msg: `publicación actualizada exitosamente!`
            });
        }
        
    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            code: -1,
            error: `Error al actualizar publicación ${error}`
        });

    }

});

router.delete('/eliminarpublicaciones', async(req, res) => {

    try {

        const { id_publicacion } = req.body;

        const campos = [
            {
                nombre: 'id_publicacion',
                campo: id_publicacion
            }
        ];

        const camposVacios = validarCampos(campos);

        if (camposVacios) {
            return res.status(400).json({
                code: -1,
                msg: `No ha ingresado el campo ${camposVacios.nombre}`,
            });
        }

        const publicacionExiste = await respuestaT_publicaciones.buscarIdPublicacion(id_publicacion);

        if (!publicacionExiste) {
            return res.status(400).json({
                code: -1,
                msg: `La publicación con id: ${id_publicacion} no existe!`,
            });
        }

        const publicacionEliminada = await respuestaT_publicaciones.eliminarPublicacion(id_publicacion);

        if (!publicacionEliminada) {
            res.status(400).json({
                code: -1,
                msg: `No se pudo eliminar la publicación!`
            });
        } else {
            res.status(200).json({
                code: 1,
                msg: `publicación ha sido eliminada exitosamente!`
            });
        }
        
    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            code: -1,
            error: `Error en eliminar publicación ${error}`
        });

    }

});

module.exports = router;