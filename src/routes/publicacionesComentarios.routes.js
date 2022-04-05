const router = require('express').Router();
const validarCampos = require("../utils/validateFields");
const respuestaT_comentarios = require('../controllers/publicacionesComentarios.controller');
const respuestaT_publicaciones = require('../controllers/publicaciones.controller');

router.get('/mostrarcomentarios', async(req, res) => {

    try {
        
        const comentarios = await respuestaT_comentarios.mostraComentarios();

        if (!comentarios) {
            res.status(400).json({
                code: -1,
                msg: `No existen comentarios en las publicaciones!`
            });
        } else {
            res.status(200).json({
                code: 1,
                msg: `Consulta a comentarios exitosamente!`,
                comentarios
            });
        }

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            code: -1,
            msg: err.message
        });

    }

});

router.post('/crearcomentarios', async(req, res) => {

    try {

        const { id_publicacion, comentario, id_clientes} = req.body;

        const campos = [
            {
                nombre: 'id_publicacion',
                campo: id_publicacion
            },
            {
                nombre: 'comentario',
                campo: comentario
            },
            {
                nombre: 'id_clientes',
                campo: id_clientes
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

        const comentarioCreado = await respuestaT_comentarios.crearComentario(req);

        if (!comentarioCreado) {
            res.status(400).json({
                code: -1,
                msg: `No se pudo crear el comentario!`
            });
        } else {
            res.status(200).json({
                code: 1,
                msg: `comentario creado exitosamente!`
            });
        }
        
    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            code: -1,
            msg: err.message
        });

    }

});

router.put('/actualizarcomentarios', async(req, res) => {

    try {

        const { comentario_id, id_publicacion, comentario, id_clientes} = req.body;

        const campos = [
            {
                nombre: 'comentario_id',
                campo: comentario_id
            },
            {
                nombre: 'id_publicacion',
                campo: id_publicacion
            },
            {
                nombre: 'comentario',
                campo: comentario
            },
            {
                nombre: 'id_clientes',
                campo: id_clientes
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

        const comentarioExiste = await respuestaT_comentarios.comentarioIdExiste(comentario_id);

        if (!comentarioExiste) {
            return res.status(400).json({
                code: -1,
                msg: `El comentario con id: ${comentario_id} no existe!`,
            });
        }

        const comentarioActualizado = await respuestaT_comentarios.actualizarComentario(req);

        if (!comentarioActualizado) {
            res.status(400).json({
                code: -1,
                msg: `No se pudo actualizar el comentario!`
            });
        } else {
            res.status(200).json({
                code: 1,
                msg: `comentario actualizado exitosamente!`
            });
        }
        
    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            code: -1,
            msg: err.message
        });

    }

});

router.delete('/eliminarcomentario', async(req, res) => {

    try {

        const { comentario_id, id_publicacion } = req.body;

        const campos = [
            {
                nombre: 'comentario_id',
                campo: comentario_id
            },
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

        const comentarioExiste = await respuestaT_comentarios.comentarioIdExiste(comentario_id);

        if (!comentarioExiste) {
            return res.status(400).json({
                code: -1,
                msg: `El comentario con id: ${comentario_id} no existe!`,
            });
        }

        const comentarioEliminado = await respuestaT_comentarios.eliminarComentario(comentario_id);

        if (!comentarioEliminado) {
            res.status(400).json({
                code: -1,
                msg: `No se pudo eliminar el comentario!`
            });
        } else {
            res.status(200).json({
                code: 1,
                msg: `Comentario ha sido eliminado exitosamente!`
            });
        }

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            code: -1,
            msg: err.message
        });

    }

});

module.exports = router;