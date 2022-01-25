const router = require("express").Router();

const respuestaT_desparasitante = require('../controllers/desparasitaciones.controller');

//===========================================
//Mostrar desparasitaciones en t_desparasitante
//===========================================
router.post("/mostrardesparacitaciones", async(req, res) => {
    try {
        
        let { id_usuario, id_clientes, id_mascotas } = req.body;

        const campos = [{
                nombre: 'id_usuario',
                campo: id_usuario
            },{
                nombre: 'id_clientes',
                campo: id_clientes
            },{
                nombre: 'id_mascotas',
                campo: id_mascotas
            }
        ];

        const campoVacio = campos.find(x => !x.campo);

        if (campoVacio)
            res.status(400).json({
                code: -2,
                msg: `No ha ingresado el campo ${campoVacio.nombre}`
            });

        const readT_desparasitante = await respuestaT_desparasitante.readT_desparasitante(req);

        if (!readT_desparasitante) {
            res.status(400).json({
                code: -1,
                msg: `No hay ninguna disparasitación `
            });
        } else {
            res.status(200).json({
                code: 1,
                user: readT_desparasitante
            });
        }

    } catch (err) {
        console.log(err)
        res.status(400).json({
            code: -1,
            msg: err.message
        });
    }
});

router.post('/desparasitantestipomascota', async (req, res) => {
    try {
      const { id_tipo_mascota } = req.body;
      const campos = [
        {
          nombre: 'id_tipo_mascota',
          campo: id_tipo_mascota,
        }
      ];
  
      const campoVacio = campos.find((x) => !x.campo);
  
      if (campoVacio)
        res.status(400).json({
          code: -2,
          msg: `No ha ingresado el campo ${campoVacio.nombre}`,
        });
  
      const respuesta_readT_tipodesparasitante =
        await respuestaT_desparasitante.readT_tipodesparasitante_tipomascota(id_tipo_mascota);
  
      if (!respuesta_readT_tipodesparasitante) {
        res.status(400).json({
          code: -1,
          msg: `No hay tipos de desparasitante para el tipo de mascota ingresado`,
        });
      } else {
        res.status(200).json({
          code: 1,
          msg: 'Tipos de desparasitantes',
          tipos_desparasitantes: respuesta_readT_tipodesparasitante,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({
        code: -1,
        msg: err.message,
      });
    }
  });

router.post("/creardesparasitaciones", async(req, res) => {
    try {
        
        //Se toman solo los campos necesarios que vienen en el body de la petición
        let {id_tipo_desparasitante, fecha_desparasitante, dosis, fecha_proximo_des,
            sintomas_desparasitante, id_mascotas} = req.body;
        /**Se guardan todos los campos recibidos en el body
         * de la petición dentro de un array
         */
        
        const campos = [{
                nombre: 'id_tipo_desparasitante',
                campo: id_tipo_desparasitante
            },{
                nombre: 'fecha_desparasitante',
                campo: fecha_desparasitante
            },{
                nombre: 'dosis',
                campo: dosis
            },{
                nombre: 'fecha_proximo_des',
                campo: fecha_proximo_des
            },{
                nombre: 'sintomas_desparasitante',
                campo: sintomas_desparasitante
            },{
                nombre: 'id_mascotas',
                campo: id_mascotas
            }
        ];

        const campoVacio = campos.find(x => !x.campo);

        if (campoVacio)
            res.status(400).json({
                code: -2,
                msg: `No ha ingresado el campo ${campoVacio.nombre}`
            });
        
        const createT_desparasitante = await respuestaT_desparasitante.createT_desparasitante(req);

        if (!createT_desparasitante) {
            res.status(400).json({
                code: -1,
                msg: `Ocurrió un error al insertar los datos de la desparasitación`
            });
        } else {
            res.status(200).json({
                code: 1,
                user: createT_desparasitante[0]
            });
        }

    } catch (err) {
        console.log(err)
        res.status(400).json({
            code: -1,
            msg: err.message
        });
    }
});

router.delete("/eliminardesparasitaciones", async(req, res) => {
    try {
        
        const deleteT_desparasitante = await respuestaT_desparasitante.deleteT_desparasitante(req);

        if (!deleteT_desparasitante) {
            res.status(400).json({
                code: -1,
                msg: `La desparasitación no pudo ser eliminada porque no se encuentra en t_desparasitante`
            });
        } else {
            res.status(200).json({
                code: 1,
                user: deleteT_desparasitante[0]
            });
        }

    } catch (err) {
        console.log(err)
        res.status(400).json({
            code: -1,
            msg: err.message
        });
    }
});

router.put("/actualizardesparasitaciones", async(req, res) => {
    try {
        
        //Se toman solo los campos necesarios que vienen en el body de la petición
        let {id_desparasitante, id_tipo_desparasitante, fecha_desparasitante, dosis,
            fecha_proximo_des, sintomas_desparasitante, id_mascotas} = req.body;
        /**Se guardan todos los campos recibidos en el body
         * de la petición dentro de un array
         */
        
         const campos = [{
                nombre: 'id_desparasitante',
                campo: id_desparasitante
            },{
                nombre: 'id_tipo_desparasitante',
                campo: id_tipo_desparasitante
            },{
                nombre: 'fecha_desparasitante',
                campo: fecha_desparasitante
            },{
                nombre: 'dosis',
                campo: dosis
            },{
                nombre: 'fecha_proximo_des',
                campo: fecha_proximo_des
            },{
                nombre: 'sintomas_desparasitante',
                campo: sintomas_desparasitante
            },{
                nombre: 'id_mascotas',
                campo: id_mascotas
            }
        ];

        const campoVacio = campos.find(x => !x.campo);

        if (campoVacio)
            res.status(400).json({
                code: -2,
                msg: `No ha ingresado el campo ${campoVacio.nombre}`
            });

        const updateT_desparasitante = await respuestaT_desparasitante.updateT_desparasitante(req);

        if (!updateT_desparasitante) {
            res.status(400).json({
                code: -1,
                msg: `Ocurrió un error al actualizar los datos de la desparasitación`
            });
        } else {
            res.status(200).json({
                code: 1,
                user: updateT_desparasitante[0]
            });
        }

    } catch (err) {
        console.log(err)
        res.status(400).json({
            code: -1,
            msg: err.message
        });
    }
});

router.post("/buscardesparasitante", async(req, res) => {
    try {
        let { param_busqueda } = req.body;

        if (!param_busqueda) {
            res.status(400).json({
                code: -1,
                msg: `Debe ingresar un parámetro de búsqueda para buscar en las desparasitaciones`
            });
        }

        const searchT_desparasitante = await respuestaT_desparasitante.searchT_desparasitante(req);

        if (!searchT_desparasitante) {
            res.status(400).json({
                code: -1,
                msg: `No se encontró información de la desaparasitación con el parámetro de búsqueda ingresado`
            });
        } else {
            res.status(200).json({
                code: 1,
                user: searchT_desparasitante
            });
        }

    } catch (err) {
        console.log(err)
        res.status(400).json({
            code: -1,
            msg: err.message
        });
    }
});


module.exports = router;