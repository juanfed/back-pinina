const router = require('express').Router();
const validarCampos = require("../utils/validateFields");
const respuestaT_comentarios = require('../controllers/publicacionesComentarios.controller');
const respuestaT_publicaciones = require('../controllers/publicaciones.controller');

router.get('/mostrarcomentarios', async(req, res) => {
    
    try {
        if(!req.body.id_publicacion){
            return res.status(400).json({
                code: -1,
                msg: `No envio el parametro id_publicacion`
            })
        }
        const comentarios = await respuestaT_comentarios.mostraComentarios(req);

        if (!comentarios) {
            return res.status(400).json({
                code: -1,
                msg: `No existen comentarios en las publicaciones!`
            });
        } else {
            return res.status(200).json({
                code: 1,
                msg: `Consulta a comentarios exitosamente!`,
                comentarios
            });
        }

    } catch (error) {
        
        console.log(error);
        return  res.status(500).json({
            code: -1,
            error: `Error al consultar comentarios ${error}`
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
            return res.status(400).json({
                code: -1,
                msg: `No se pudo crear el comentario!`
            });
        } else {
            return res.status(200).json({
                code: 1,
                msg: `comentario creado exitosamente!`
            });
        }
        
    } catch (error) {
        
        console.log(error);
        return res.status(500).json({
            code: -1,
            error: `Error al crear comentario ${error}`
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
            return res.status(400).json({
                code: -1,
                msg: `No se pudo actualizar el comentario!`
            });
        } else {
            return res.status(200).json({
                code: 1,
                msg: `comentario actualizado exitosamente!`
            });
        }
        
    } catch (error) {
        
        console.log(error);
        return res.status(500).json({
            code: -1,
            error: `Error al actualizar comentario ${error}`
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
            return res.status(400).json({
                code: -1,
                msg: `No se pudo eliminar el comentario!`
            });
        } else {
            return res.status(200).json({
                code: 1,
                msg: `Comentario ha sido eliminado exitosamente!`
            });
        }

    } catch (error) {
        
        console.log(error);
        return res.status(500).json({
            code: -1,
            error: `Error al eliminar comentario ${error}`
        });

    }

});

module.exports = router;