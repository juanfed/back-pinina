const router = require('express').Router();

const respuestaT_inventarios = require('../controllers/inventarios.controller');
const validarCampos = require("../utils/validateFields");

router.get('/mostrarinventarios', async (req, res) => {
    try {
    
        const respuesta_readT_inventarios = await respuestaT_inventarios.readT_inventarios();
        if (!respuesta_readT_inventarios) {
            res.status(400).json({
                code: -1,
                msg: `No hay inventarios registrados`,
            });
        } else {
            res.status(200).json({
                code: 1,
                msg: respuesta_readT_inventarios,
            });
        }
    } catch (err) {
      res.status(400).json({
        code: -1,
        msg: "Ocurrió un error al mostrar los inventarios",
        error: err.message,
      });
    }
});

router.post('/mostrarinventarios_veterinaria', async (req, res) => {
    try {
        const { id_usuario } = req.body;
        const campos = [
            {
                nombre: 'id_usuario',
                campo: id_usuario,
            },
        ];
        /**Se busca en el array si alguno de los campos no fue enviado,
         * en caso de que se encuentre algún campo vacio se guarda el
         * elemento encontrado dentro de la constante llamada "campoVacio"
         */
        const campoVacio = validarCampos(campos);
        
        /**Si alguno de los campos NO fue enviado en la petición
        * se le muestra al cliente el nombre del campo que falta
        */
        if (campoVacio)
            return res.status(400).json({
                code: -2,
                msg: `No ha ingresado el campo ${campoVacio.nombre}`,
            });
    
        const respuesta_readT_inventarios = await respuestaT_inventarios.readT_inventarios_veterinaria(
            id_usuario
        );
        if (!respuesta_readT_inventarios) {
            res.status(400).json({
                code: -1,
                msg: `No hay inventarios de este usuario`,
            });
        } else {
            res.status(200).json({
                code: 1,
                msg: respuesta_readT_inventarios,
            });
        }
    } catch (err) {
      res.status(400).json({
        code: -1,
        msg: "Ocurrió un error al mostrar los inventarios por veterinaria",
        error: err.message,
      });
    }
});

router.post('/mostrarinventarios_veterinaria_fotos', async (req, res) => {
    try {
        const { id_usuario } = req.body;
        const campos = [
            {
                nombre: 'id_usuario',
                campo: id_usuario,
            },
        ];
        /**Se busca en el array si alguno de los campos no fue enviado,
         * en caso de que se encuentre algún campo vacio se guarda el
         * elemento encontrado dentro de la constante llamada "campoVacio"
         */
        const campoVacio = validarCampos(campos);
        
        /**Si alguno de los campos NO fue enviado en la petición
        * se le muestra al cliente el nombre del campo que falta
        */
        if (campoVacio)
            return res.status(400).json({
                code: -2,
                msg: `No ha ingresado el campo ${campoVacio.nombre}`,
            });
    
        const respuesta_readT_inventarios = await respuestaT_inventarios.readT_inventarios_veterinaria_fotos(
            id_usuario
        );
        if (!respuesta_readT_inventarios) {
            res.status(400).json({
                code: -1,
                msg: `No hay inventarios de este usuario`,
            });
        } else {
            res.status(200).json({
                code: 1,
                msg: respuesta_readT_inventarios,
            });
        }
    } catch (err) {
      res.status(400).json({
        code: -1,
        msg: "Ocurrió un error al mostrar los inventarios por veterinaria",
        error: err.message,
      });
    }
});

router.post('/mostrarinventarios_producto', async (req, res) => {
    try {
        const { id_tipo_producto } = req.body;
        const campos = [
            {
                nombre: 'id_tipo_producto',
                campo: id_tipo_producto,
            },
        ];
        /**Se busca en el array si alguno de los campos no fue enviado,
         * en caso de que se encuentre algún campo vacio se guarda el
         * elemento encontrado dentro de la constante llamada "campoVacio"
         */
        const campoVacio = validarCampos(campos);
        
        /**Si alguno de los campos NO fue enviado en la petición
        * se le muestra al cliente el nombre del campo que falta
        */
        if (campoVacio)
            return res.status(400).json({
                code: -2,
                msg: `No ha ingresado el campo ${campoVacio.nombre}`,
            });
    
        const respuesta_readT_inventarios = await respuestaT_inventarios.readT_inventarios_producto(
            id_tipo_producto
        );
        if (!respuesta_readT_inventarios) {
            res.status(400).json({
                code: -1,
                msg: `No hay inventarios de este tipo de producto`,
            });
        } else {
            res.status(200).json({
                code: 1,
                msg: respuesta_readT_inventarios,
            });
        }
    } catch (err) {
      res.status(400).json({
        code: -1,
        msg: "Ocurrió un error al mostrar los inventarios por tipo de producto",
        error: err.message,
      });
    }
});

router.post('/mostrarinventarios_mascota', async (req, res) => {
    try {
        const { id_tipo_mascota } = req.body;
        const campos = [
            {
                nombre: 'id_tipo_mascota',
                campo: id_tipo_mascota,
            },
        ];
        /**Se busca en el array si alguno de los campos no fue enviado,
         * en caso de que se encuentre algún campo vacio se guarda el
         * elemento encontrado dentro de la constante llamada "campoVacio"
         */
        const campoVacio = validarCampos(campos);
        
        /**Si alguno de los campos NO fue enviado en la petición
        * se le muestra al cliente el nombre del campo que falta
        */
        if (campoVacio)
            return res.status(400).json({
                code: -2,
                msg: `No ha ingresado el campo ${campoVacio.nombre}`,
            });
    
        const respuesta_readT_inventarios = await respuestaT_inventarios.readT_inventarios_mascota(
            id_tipo_mascota
        );
        if (!respuesta_readT_inventarios) {
            res.status(400).json({
                code: -1,
                msg: `No hay inventarios de este tipo de mascota`,
            });
        } else {
            res.status(200).json({
                code: 1,
                msg: respuesta_readT_inventarios,
            });
        }
    } catch (err) {
      res.status(400).json({
        code: -1,
        msg: "Ocurrió un error al mostrar los inventarios por tipo de mascota",
        error: err.message,
      });
    }
});

router.post('/crearinventario', async (req, res) => {
    try {
        const {
            nombre_producto,
            precio_producto,
            cantidad_producto,
            id_tipo_producto,
            id_usuario,
            id_tipo_mascota
        } = req.body;

        const campos = [
            {
                nombre: 'nombre_producto',
                campo: nombre_producto,
            },
            {
                nombre: 'precio_producto',
                campo: precio_producto,
            },
            {
                nombre: 'cantidad_producto',
                campo: cantidad_producto,
            },
            {
                nombre: 'id_tipo_producto',
                campo: id_tipo_producto,
            },
            {
                nombre: 'id_usuario',
                campo: id_usuario,
            },
            {
                nombre: 'id_tipo_mascota',
                campo: id_tipo_mascota,
            },
        ];

        /**Se busca en el array si alguno de los campos no fue enviado,
         * en caso de que se encuentre algún campo vacio se guarda el
         * elemento encontrado dentro de la constante llamada "campoVacio"
         */
        const campoVacio = validarCampos(campos);
        
        /**Si alguno de los campos NO fue enviado en la petición
        * se le muestra al cliente el nombre del campo que falta
        */
        if (campoVacio)
            return res.status(400).json({
                code: -2,
                msg: `No ha ingresado el campo ${campoVacio.nombre}`,
            });
    
        const respuesta_createT_inventarios = await respuestaT_inventarios.createT_inventarios(req);

        if (!respuesta_createT_inventarios) {
            res.status(400).json({
                code: -1,
                msg: `No se pudo registrar la información`,
            });
        } else {
            res.status(200).json({
                code: 1,
                msg: respuesta_createT_inventarios,
            });
        }
    } catch (err) {
      return res.status(400).json({
        code: -1,
        msg: "Ocurrió un error al registrar los datos del inventario",
        error: err.message,
      });
    }
});

router.put('/actualizarinventario', async (req, res) => {
    try {
        const {
            id_inventario,
            nombre_producto,
            precio_producto,
            cantidad_producto,
            id_tipo_producto,
            id_usuario,
            id_tipo_mascota
        } = req.body;

        const campos = [
            {
                nombre: 'id_inventario',
                campo: id_inventario,
            },
            {
                nombre: 'nombre_producto',
                campo: nombre_producto,
            },
            {
                nombre: 'precio_producto',
                campo: precio_producto,
            },
            {
                nombre: 'cantidad_producto',
                campo: cantidad_producto,
            },
            {
                nombre: 'id_tipo_producto',
                campo: id_tipo_producto,
            },
            {
                nombre: 'id_usuario',
                campo: id_usuario,
            },
            {
                nombre: 'id_tipo_mascota',
                campo: id_tipo_mascota,
            },
        ];

        /**Se busca en el array si alguno de los campos no fue enviado,
         * en caso de que se encuentre algún campo vacio se guarda el
         * elemento encontrado dentro de la constante llamada "campoVacio"
         */
        const campoVacio = validarCampos(campos);
        
        /**Si alguno de los campos NO fue enviado en la petición
        * se le muestra al cliente el nombre del campo que falta
        */
        if (campoVacio)
            return res.status(400).json({
                code: -2,
                msg: `No ha ingresado el campo ${campoVacio.nombre}`,
            });
    
        const respuesta_updateT_inventarios = await respuestaT_inventarios.updateT_inventarios(req);

        if (!respuesta_updateT_inventarios) {
            res.status(400).json({
                code: -1,
                msg: `No se pudo actualizar la información`,
            });
        } else {
            res.status(200).json({
                code: 1,
                msg: respuesta_updateT_inventarios,
            });
        }
    } catch (err) {
      return res.status(400).json({
        code: -1,
        msg: "Ocurrió un error al actualizar los datos del inventario",
        error: err.message,
      });
    }
});

router.delete('/eliminarinventario', async (req, res) => {
    try {
        const { id_inventario } = req.body;
    
        const campos = [
            {
                nombre: 'id_inventario',
                campo: id_inventario,
            },
        ];
    
        /**Se busca en el array si alguno de los campos no fue enviado,
         * en caso de que se encuentre algún campo vacio se guarda el
         * elemento encontrado dentro de la constante llamada "campoVacio"
         */
        const campoVacio = validarCampos(campos);
        
         /**Si alguno de los campos NO fue enviado en la petición
         * se le muestra al cliente el nombre del campo que falta
         */
        if (campoVacio)
            return res.status(400).json({
                code: -2,
                msg: `No ha ingresado el campo ${campoVacio.nombre}`,
            });
    
        const existe_inventario = await respuestaT_inventarios.searchT_inventarioId(id_inventario);
        if (!existe_inventario) {
            return res.status(400).json({
                code: -1,
                msg: `No existe el inventario con id: ${id_inventario}`,
            });
        }
    
        const deleteT_inventario = await respuestaT_inventarios.deleteT_inventario(id_inventario);
    
        if (!deleteT_inventario) {
            return res.status(400).json({
                code: -1,
                msg: `No se pudo eliminar`,
            });
        } else {
            res.status(200).json({
                code: 1,
                msg: 'Inventario eliminado',
                inventario: deleteT_inventario[0],
            });
        }
    } catch (err) {
      return res.status(400).json({
        code: -1,
        msg: "Ocurrió un error al eliminar los datos del inventario",
        error: err.message,
      });
    }
});

router.post('/hallardescuento', async (req, res) => {
    try {
        const { id_inventario, porcentaje_oferta } = req.body;
        const campos = [
            {
                nombre: 'id_inventario',
                campo: id_inventario,
            },
            {
                nombre: 'porcentaje_oferta',
                campo: porcentaje_oferta,
            },
        ];
        /**Se busca en el array si alguno de los campos no fue enviado,
         * en caso de que se encuentre algún campo vacio se guarda el
         * elemento encontrado dentro de la constante llamada "campoVacio"
         */
        const campoVacio = validarCampos(campos);
        
        /**Si alguno de los campos NO fue enviado en la petición
        * se le muestra al cliente el nombre del campo que falta
        */
        if (campoVacio)
            return res.status(400).json({
                code: -2,
                msg: `No ha ingresado el campo ${campoVacio.nombre}`,
            });
    
        const respuesta_readT_ofertas = await respuestaT_inventarios.readT_ofertas(req);

        if (!respuesta_readT_ofertas) {
            return res.status(400).json({
                code: -1,
                msg: `No hay oferta para el producto del inventario ingresado`,
            });
        }

        const respuesta_read_descuento = await respuestaT_inventarios.read_descuento(req);

        if (!respuesta_read_descuento) {
            return res.status(400).json({
                code: -1,
                msg: `No hay descuento para el producto del inventario ingresado`,
            });
        } else {
            respuesta_read_descuento.valor_descontado = parseInt(respuesta_read_descuento.valor_descontado);
            respuesta_read_descuento.precio_con_descuento = parseInt(respuesta_read_descuento.precio_con_descuento);
            res.status(200).json({
                code: 1,
                msg: respuesta_read_descuento,
            });
        }

    } catch (err) {
      res.status(400).json({
        code: -1,
        msg: "Ocurrió un error al hallar la oferta",
        error: err.message,
      });
    }
});

router.post('/crearoferta', async (req, res) => {
    try {
        const {
            porcentaje_oferta,
            tipo_descuento,
            id_inventario
        } = req.body;

        const campos = [
            {
                nombre: 'porcentaje_oferta',
                campo: porcentaje_oferta,
            },
            {
                nombre: 'tipo_descuento',
                campo: tipo_descuento,
            },
            {
                nombre: 'id_inventario',
                campo: id_inventario,
            },
        ];

        /**Se busca en el array si alguno de los campos no fue enviado,
         * en caso de que se encuentre algún campo vacio se guarda el
         * elemento encontrado dentro de la constante llamada "campoVacio"
         */
        const campoVacio = validarCampos(campos);
        
        /**Si alguno de los campos NO fue enviado en la petición
        * se le muestra al cliente el nombre del campo que falta
        */
        if (campoVacio)
            return res.status(400).json({
                code: -2,
                msg: `No ha ingresado el campo ${campoVacio.nombre}`,
            });
    
        const respuesta_createT_ofertas = await respuestaT_inventarios.createT_ofertas(req);

        if (!respuesta_createT_ofertas) {
            res.status(400).json({
                code: -1,
                msg: `No se pudo registrar la información`,
            });
        } else {
            res.status(200).json({
                code: 1,
                msg: respuesta_createT_ofertas,
            });
        }
    } catch (err) {
      return res.status(400).json({
        code: -1,
        msg: "Ocurrió un error al registrar los datos de la oferta",
        error: err.message,
      });
    }
});

router.put('/actualizaroferta', async (req, res) => {
    try {
        const {
            id_oferta,
            porcentaje_oferta,
            tipo_descuento,
            id_inventario
        } = req.body;

        const campos = [
            {
                nombre: 'id_oferta',
                campo: id_oferta,
            },
            {
                nombre: 'porcentaje_oferta',
                campo: porcentaje_oferta,
            },
            {
                nombre: 'tipo_descuento',
                campo: tipo_descuento,
            },
            {
                nombre: 'id_inventario',
                campo: id_inventario,
            },
        ];

        /**Se busca en el array si alguno de los campos no fue enviado,
         * en caso de que se encuentre algún campo vacio se guarda el
         * elemento encontrado dentro de la constante llamada "campoVacio"
         */
        const campoVacio = validarCampos(campos);
        
        /**Si alguno de los campos NO fue enviado en la petición
        * se le muestra al cliente el nombre del campo que falta
        */
        if (campoVacio)
            return res.status(400).json({
                code: -2,
                msg: `No ha ingresado el campo ${campoVacio.nombre}`,
            });
    
        const respuesta_updateT_ofertas = await respuestaT_inventarios.updateT_ofertas(req);

        if (!respuesta_updateT_ofertas) {
            res.status(400).json({
                code: -1,
                msg: `No se pudo actualizar la información`,
            });
        } else {
            res.status(200).json({
                code: 1,
                msg: respuesta_updateT_ofertas,
            });
        }
    } catch (err) {
      return res.status(400).json({
        code: -1,
        msg: "Ocurrió un error al actualizar los datos de la oferta",
        error: err.message,
      });
    }
});

router.delete('/eliminaroferta', async (req, res) => {
    try {
        const { id_oferta } = req.body;
    
        const campos = [
            {
                nombre: 'id_oferta',
                campo: id_oferta,
            },
        ];
    
        /**Se busca en el array si alguno de los campos no fue enviado,
         * en caso de que se encuentre algún campo vacio se guarda el
         * elemento encontrado dentro de la constante llamada "campoVacio"
         */
        const campoVacio = validarCampos(campos);
        
         /**Si alguno de los campos NO fue enviado en la petición
         * se le muestra al cliente el nombre del campo que falta
         */
        if (campoVacio)
            return res.status(400).json({
                code: -2,
                msg: `No ha ingresado el campo ${campoVacio.nombre}`,
            });
    
        const existe_oferta = await respuestaT_inventarios.searchT_ofertaId(id_oferta);
        if (!existe_oferta) {
            return res.status(400).json({
                code: -1,
                msg: `No existe la oferta con id: ${id_oferta}`,
            });
        }
    
        const respuesta_deleteT_ofertas = await respuestaT_inventarios.deleteT_ofertas(id_oferta);
    
        if (!respuesta_deleteT_ofertas) {
            return res.status(400).json({
                code: -1,
                msg: `No se pudo eliminar`,
            });
        } else {
            res.status(200).json({
                code: 1,
                msg: 'Oferta eliminado',
                inventario: respuesta_deleteT_ofertas[0],
            });
        }
    } catch (err) {
      return res.status(400).json({
        code: -1,
        msg: "Ocurrió un error al eliminar los datos de la oferta",
        error: err.message,
      });
    }
});

router.get('/mostrarofertas', async (req, res) => {
    try {
    
        const respuesta_readT_ofertas = await respuestaT_inventarios.readT_ofertas_all();
        if (!respuesta_readT_ofertas) {
            res.status(400).json({
                code: -1,
                msg: `No hay ofertas registradas`,
            });
        } else {
            for (item in respuesta_readT_ofertas){
                respuesta_readT_ofertas[item].valor_descontado = parseInt(respuesta_readT_ofertas[item].valor_descontado);
                respuesta_readT_ofertas[item].precio_con_descuento = parseInt(respuesta_readT_ofertas[item].precio_con_descuento);
            }
            res.status(200).json({
                code: 1,
                msg: respuesta_readT_ofertas,
            });
        }
    } catch (err) {
      res.status(400).json({
        code: -1,
        msg: "Ocurrió un error al mostrar las ofertas",
        error: err.message,
      });
    }
});

router.post('/mostrarofertas_veterinaria', async (req, res) => {
    try {
        const { id_usuario } = req.body;
        const campos = [
            {
                nombre: 'id_usuario',
                campo: id_usuario,
            },
        ];
        /**Se busca en el array si alguno de los campos no fue enviado,
         * en caso de que se encuentre algún campo vacio se guarda el
         * elemento encontrado dentro de la constante llamada "campoVacio"
         */
        const campoVacio = validarCampos(campos);
        
        /**Si alguno de los campos NO fue enviado en la petición
        * se le muestra al cliente el nombre del campo que falta
        */
        if (campoVacio)
            return res.status(400).json({
                code: -2,
                msg: `No ha ingresado el campo ${campoVacio.nombre}`,
            });
    
        const respuesta_readT_ofertas = await respuestaT_inventarios.readT_ofertas_veterinaria(
            id_usuario
        );
        if (!respuesta_readT_ofertas) {
            res.status(400).json({
                code: -1,
                msg: `No hay ofertas de este usuario`,
            });
        } else {
            for (item in respuesta_readT_ofertas){
                respuesta_readT_ofertas[item].valor_descontado = parseInt(respuesta_readT_ofertas[item].valor_descontado);
                respuesta_readT_ofertas[item].precio_con_descuento = parseInt(respuesta_readT_ofertas[item].precio_con_descuento);
            }
            res.status(200).json({
                code: 1,
                msg: respuesta_readT_ofertas,
            });
        }
    } catch (err) {
      res.status(400).json({
        code: -1,
        msg: "Ocurrió un error al mostrar las ofertas por veterinaria",
        error: err.message,
      });
    }
});

router.post('/mostrarofertas_producto', async (req, res) => {
    try {
        const { id_tipo_producto } = req.body;
        const campos = [
            {
                nombre: 'id_tipo_producto',
                campo: id_tipo_producto,
            },
        ];
        /**Se busca en el array si alguno de los campos no fue enviado,
         * en caso de que se encuentre algún campo vacio se guarda el
         * elemento encontrado dentro de la constante llamada "campoVacio"
         */
        const campoVacio = validarCampos(campos);
        
        /**Si alguno de los campos NO fue enviado en la petición
        * se le muestra al cliente el nombre del campo que falta
        */
        if (campoVacio)
            return res.status(400).json({
                code: -2,
                msg: `No ha ingresado el campo ${campoVacio.nombre}`,
            });
    
        const respuesta_readT_ofertas = await respuestaT_inventarios.readT_ofertas_producto(
            id_tipo_producto
        );
        if (!respuesta_readT_ofertas) {
            res.status(400).json({
                code: -1,
                msg: `No hay inventarios de este tipo de producto`,
            });
        } else {
            for (item in respuesta_readT_ofertas){
                respuesta_readT_ofertas[item].valor_descontado = parseInt(respuesta_readT_ofertas[item].valor_descontado);
                respuesta_readT_ofertas[item].precio_con_descuento = parseInt(respuesta_readT_ofertas[item].precio_con_descuento);
            }
            res.status(200).json({
                code: 1,
                msg: respuesta_readT_ofertas,
            });
        }
    } catch (err) {
      res.status(400).json({
        code: -1,
        msg: "Ocurrió un error al mostrar los inventarios por tipo de producto",
        error: err.message,
      });
    }
});

router.post('/mostrarofertas_mascota', async (req, res) => {
    try {
        const { id_tipo_mascota } = req.body;
        const campos = [
            {
                nombre: 'id_tipo_mascota',
                campo: id_tipo_mascota,
            },
        ];
        /**Se busca en el array si alguno de los campos no fue enviado,
         * en caso de que se encuentre algún campo vacio se guarda el
         * elemento encontrado dentro de la constante llamada "campoVacio"
         */
        const campoVacio = validarCampos(campos);
        
        /**Si alguno de los campos NO fue enviado en la petición
        * se le muestra al cliente el nombre del campo que falta
        */
        if (campoVacio)
            return res.status(400).json({
                code: -2,
                msg: `No ha ingresado el campo ${campoVacio.nombre}`,
            });
    
        const respuesta_readT_ofertas = await respuestaT_inventarios.readT_ofertas_mascota(
            id_tipo_mascota
        );
        if (!respuesta_readT_ofertas) {
            res.status(400).json({
                code: -1,
                msg: `No hay inventarios de este tipo de mascota`,
            });
        } else {
            for (item in respuesta_readT_ofertas){
                respuesta_readT_ofertas[item].valor_descontado = parseInt(respuesta_readT_ofertas[item].valor_descontado);
                respuesta_readT_ofertas[item].precio_con_descuento = parseInt(respuesta_readT_ofertas[item].precio_con_descuento);
            }
            res.status(200).json({
                code: 1,
                msg: respuesta_readT_ofertas,
            });
        }
    } catch (err) {
      res.status(400).json({
        code: -1,
        msg: "Ocurrió un error al mostrar los inventarios por tipo de mascota",
        error: err.message,
      });
    }
});

router.post('/obteneridfotoConIdinventario', async (req, res) => {
    try {
      const { id_inventario } = req.body;
  
      const campos = [
        {
          nombre: 'id_inventario',
          campo: id_inventario,
        },
      ];
  
      const campoVacio = campos.find((x) => !x.campo);
  
      if (campoVacio) {
        return res.status(400).json({
          ok: false,
          msg: `No ha ingresado el campo ${campoVacio.nombre}`,
        });
      }
      
      const existe_inventario = await respuestaT_inventarios.searchT_inventarioId(id_inventario);

      if (!existe_inventario) {
        return res.status(400).json({
          ok: false,
          msg: `No esta registrado este inventario con id: ${id_inventario}`,
        });
      }
      const respuesta =
        await respuestaT_inventarios.readIdT_fotos_inventariosPorid(id_inventario);
  
      if (!respuesta) {
        res.status(400).json({
          code: -1,
          respuesta,
          msg: `No hay una foto del producto en el inventario`,
        });
      } else {
        res.json({
          ok: true,
          msg: `Id de la foto del producto en el inventario`,
          respuesta,
        });
      }
    } catch (err) {
      console.log(err);
  
      res.status(500).json({
        ok: false,
        error: err.message,
      });
    }
});

module.exports = router;