const router = require('express').Router();
const validarCampos = require("../utils/validateFields");
const respuestaT_publicaciones = require('../controllers/publicaciones.controller');
const respuestaT_fotos_publicaciones = require('../controllers/publicacionesFotos.controller');

router.get('/mostrarpublicaciones/:id_clientes', async(req, res) => {

    try {
        //se muestran ñlas publicaciones, se le manda como parametro el id_cliente para determinar a quien sigue
        const readT_publicaciones = await respuestaT_publicaciones.readT_publicaciones(req);
        
        if (!readT_publicaciones) {
            return res.status(400).json({
                code: -1,
                msg: `No hay ninguna publicación registrada!`,
            });
        } else {
            return res.status(200).json({
                code: 1,
                msg: `Consulta a publicaciones exitosamente!`,
                publicaciones: readT_publicaciones
            });
        }
        
    } catch (error) {
        
        console.log(error);
        return res.status(500).json({
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

        const fotosGuardadas = await respuestaT_fotos_publicaciones.subirFotoPublicacion(publicacionCreada.id_publicacion, id_mascotas, req);

        if (!publicacionCreada) {
            return res.status(400).json({
                code: -1,
                msg: `No se pudo crear la publicación!`
            });
        } else {
            return res.status(200).json({
                code: 1,
                msg: `publicación creada exitosamente!`,
                publicacionCreada,
                fotosGuardadas
            });
        }
        
    } catch (error) {
        
        console.log(error);
        return res.status(500).json({
            code: -1,
            error: `Error al crear publicación ${error}`
        });

    }

});

//descomentar si se necesita
/*router.put('/actualizarpublicaciones', async(req, res) => {

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
            return res.status(400).json({
                code: -1,
                msg: `No se pudo actualizar la publicación!`
            });
        } else {
            return res.status(200).json({
                code: 1,
                msg: `publicación actualizada exitosamente!`
            });
        }
        
    } catch (error) {
        
        console.log(error);
        return res.status(500).json({
            code: -1,
            error: `Error al actualizar publicación ${error}`
        });

    }

});*/

router.delete('/eliminarpublicaciones/:id_publicacion', async(req, res) => {

    try {

        const { id_publicacion } = req.params;

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
            return res.status(400).json({
                code: -1,
                msg: `No se pudo eliminar la publicación!`
            });
        } else {
            return res.status(200).json({
                code: 1,
                msg: `publicación ha sido eliminada exitosamente!`
            });
        }
        
    } catch (error) {
        
        console.log(error);
        return res.status(500).json({
            code: -1,
            error: `Error en eliminar publicación ${error}`
        });

    }

});

router.get('/darlike/:id_publicacion/:id_clientes', async(req, res) => {

    try {

        const { id_publicacion, id_clientes } = req.params;
        
        const campos = [
            {
                nombre: 'id_publicacion',
                campo: id_publicacion
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

        const likePublicacion = await respuestaT_publicaciones.darLikePublicacion(id_publicacion, id_clientes);

        if (!likePublicacion) {
            return res.status(400).json({
                code: -1,
                msg: `No se pudo dar like a la publicación!`
            });
        } else {
            return res.status(200).json({
                code: 1,
                msg: `Like a la publicación exitosamente!`,
                likePublicacion
            });
        }
        
    } catch (error) {
        
        console.log(error);
        return res.status(500).json({
            code: -1,
            error: `Error al dar like a la publicación ${error}`
        });

    }

});

router.post('/seguircuentausuario/:id_usuario/:id_clientes', async(req, res) => {

    try {

        const  { id_usuario, id_clientes}  = req.params;

        const campos = [
            {
                nombre: 'id_usuario',
                campo: id_usuario
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

        const clienteExiste = await respuestaT_publicaciones.buscarIdCliente(id_clientes);

        if (!clienteExiste) {
            return res.status(400).json({
                code: -1,
                msg: `El cliente con id: ${id_clientes} no existe!`,
            });
        }

        const usuarioSeguido = await respuestaT_publicaciones.seguirCuentaUsuario(req);

        if (!usuarioSeguido) {
            return res.status(400).json({
                code: -1,
                msg: `No se pudo seguir al usuario!`
            });
        } else {
            return res.status(200).json({
                code: 1,
                msg: `Usuario siguiendo!`,
                usuarioSeguido
            });
        }
        
    } catch (error) {
        
        console.log(error);
        return res.status(500).json({
            code: -1,
            error: `Error al seguir al usuario ${error}`
        });

    }

});

module.exports = router;