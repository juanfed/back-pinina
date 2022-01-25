const router = require("express").Router();

const respuestaT_citas = require('../controllers/citas.controller');

//===========================================
//Mostrar citas en t_citas
//===========================================
router.post("/mostrarcitas", async(req, res) => {
    try {
        
        const readT_citas = await respuestaT_citas.readT_citas(req);

        if (!readT_citas) {
            res.status(400).json({
                code: -1,
                msg: `No hay ninguna cita asignada a este profesional`
            });
        } else {
            res.status(200).json({
                code: 1,
                user: readT_citas
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

router.post("/crearcitas", async(req, res) => {
    try {
        
        //Se toman solo los campos necesarios que vienen en el body de la petición
        let {fecha_cita, hora_cita, id_tipo_cita, descripcion_cita, paciente_cita,
            propietario_cita, profecional_cita, estado_cita, dia_cita} = req.body;
        /**Se guardan todos los campos recibidos en el body
         * de la petición dentro de un array
         */
        
        const campos = [{
                nombre: 'fecha_cita',
                campo: fecha_cita
            },{
                nombre: 'hora_cita',
                campo: hora_cita
            },{
                nombre: 'id_tipo_cita',
                campo: id_tipo_cita
            },{
                nombre: 'descripcion_cita',
                campo: descripcion_cita
            },{
                nombre: 'paciente_cita',
                campo: paciente_cita
            },{
                nombre: 'propietario_cita',
                campo: propietario_cita
            },{
                nombre: 'profecional_cita',
                campo: profecional_cita
            },{
                nombre: 'estado_cita',
                campo: estado_cita
            },{
                nombre: 'dia_cita',
                campo: dia_cita
            }
        ];

        const campoVacio = campos.find(x => !x.campo);

        if (campoVacio)
            res.status(400).json({
                code: -2,
                msg: `No ha ingresado el campo ${campoVacio.nombre}`
            });
        
        const disponibilidad_cita = await respuestaT_citas.validar_disponibilidad(req);
        
        if (!disponibilidad_cita.f_validar_disponibilidad) {
            res.status(400).json({
                code: -1,
                msg: `No hay disponibilidad para crear la cita en la hora o día ingresado`
            })
        } else {
            const createT_citas = await respuestaT_citas.createT_citas(req);

            if (!createT_citas) {
                res.status(400).json({
                    code: -1,
                    msg: `Ocurrió un error al insertar los datos de la cita`
                });
            } else {
                res.status(200).json({
                    code: 1,
                    user: createT_citas[0]
                });
            }
        }

    } catch (err) {
        console.log(err)
        res.status(400).json({
            code: -1,
            msg: err.message
        });
    }
});

router.delete("/eliminarcita", async(req, res) => {
    try {
        
        const deleteT_citas = await respuestaT_citas.deleteT_citas(req);

        if (!deleteT_citas) {
            res.status(400).json({
                code: -1,
                msg: `La cita no pudo ser eliminada porque no se encuentra en t_citas`
            });
        } else {
            res.status(200).json({
                code: 1,
                user: deleteT_citas[0]
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

router.put("/actualizarcitas", async(req, res) => {
    try {
        
        //Se toman solo los campos necesarios que vienen en el body de la petición
        let {id_cita, fecha_cita, hora_cita, id_tipo_cita, descripcion_cita, paciente_cita,
            propietario_cita, profecional_cita, estado_cita, dia_cita} = req.body;
        /**Se guardan todos los campos recibidos en el body
         * de la petición dentro de un array
         */
        
        const campos = [{
                nombre: 'id_cita',
                campo: id_cita
            },{
                nombre: 'fecha_cita',
                campo: fecha_cita
            },{
                nombre: 'hora_cita',
                campo: hora_cita
            },{
                nombre: 'id_tipo_cita',
                campo: id_tipo_cita
            },{
                nombre: 'descripcion_cita',
                campo: descripcion_cita
            },{
                nombre: 'paciente_cita',
                campo: paciente_cita
            },{
                nombre: 'propietario_cita',
                campo: propietario_cita
            },{
                nombre: 'profecional_cita',
                campo: profecional_cita
            },{
                nombre: 'estado_cita',
                campo: estado_cita
            },{
                nombre: 'dia_cita',
                campo: dia_cita
            }
        ];

        const campoVacio = campos.find(x => !x.campo);

        if (campoVacio)
            res.status(400).json({
                code: -2,
                msg: `No ha ingresado el campo ${campoVacio.nombre}`
            });
        
        const disponibilidad_cita = await respuestaT_citas.validar_disponibilidad(req);
        
        if (!disponibilidad_cita.f_validar_disponibilidad) {
            res.status(400).json({
                code: -1,
                msg: `No hay disponibilidad para crear la cita en la hora o día ingresado`
            })
        } else {
            const updateT_citas = await respuestaT_citas.updateT_citas(req);

            if (!updateT_citas) {
                res.status(400).json({
                    code: -1,
                    msg: `Ocurrió un error al actualizar los datos de la cita`
                });
            } else {
                res.status(200).json({
                    code: 1,
                    user: updateT_citas[0]
                });
            }
        }

    } catch (err) {
        console.log(err)
        res.status(400).json({
            code: -1,
            msg: err.message
        });
    }
});

router.post("/buscarcitas", async(req, res) => {
    try {
        let { param_busqueda } = req.body;

        if (!param_busqueda) {
            res.status(400).json({
                code: -1,
                msg: `Debe ingresar un parámetro de búsqueda para buscar citas`
            });
        }

        const searchT_citas = await respuestaT_citas.searchT_citas(req);

        if (!searchT_citas) {
            res.status(400).json({
                code: -1,
                msg: `No se encontró ninguna cita con el parámetro de búsqueda ingresado`
            });
        } else {
            res.status(200).json({
                code: 1,
                user: searchT_citas
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

router.post("/crearconfiguracioncitas", async(req, res) => {
    try {
        
        //Se toman solo los campos necesarios que vienen en el body de la petición
        let {id_tipo_cita, hora_inicio, hora_expiracion,
            dias, id_usuario} = req.body;
        /**Se guardan todos los campos recibidos en el body
         * de la petición dentro de un array
         */
        
        const campos = [{
                nombre: 'id_tipo_cita',
                campo: id_tipo_cita
            },{
                nombre: 'hora_inicio',
                campo: hora_inicio
            },{
                nombre: 'hora_expiracion',
                campo: hora_expiracion
            },{
                nombre: 'dias',
                campo: dias
            },{
                nombre: 'id_usuario',
                campo: id_usuario
            }
        ];

        const campoVacio = campos.find(x => !x.campo);

        if (campoVacio)
            res.status(400).json({
                code: -2,
                msg: `No ha ingresado el campo ${campoVacio.nombre}`
            });

        const createT_configuracion_citas = await respuestaT_citas.createT_configuracion_citas(req);

        if (!createT_configuracion_citas) {
            res.status(400).json({
                code: -1,
                msg: `Ocurrió un error al insertar la configuracion de la cita`
            });
        } else {
            res.status(200).json({
                code: 1,
                user: createT_configuracion_citas[0]
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

router.put("/actualizarconfiguracioncitas", async(req, res) => {
    try {
        
        //Se toman solo los campos necesarios que vienen en el body de la petición
        let {id_conf_cita, id_tipo_cita, hora_inicio, hora_expiracion,
            dias, id_usuario} = req.body;
        /**Se guardan todos los campos recibidos en el body
         * de la petición dentro de un array
         */
        
         const campos = [{
                nombre: 'id_conf_cita',
                campo: id_conf_cita
            },{
                nombre: 'id_tipo_cita',
                campo: id_tipo_cita
            },{
                nombre: 'hora_inicio',
                campo: hora_inicio
            },{
                nombre: 'hora_expiracion',
                campo: hora_expiracion
            },{
                nombre: 'dias',
                campo: dias
            },{
                nombre: 'id_usuario',
                campo: id_usuario
            }
        ];

        const campoVacio = campos.find(x => !x.campo);

        if (campoVacio)
            res.status(400).json({
                code: -2,
                msg: `No ha ingresado el campo ${campoVacio.nombre}`
            });

        const updateT_configuracion_citas = await respuestaT_citas.updateT_configuracion_citas(req);

        if (!updateT_configuracion_citas) {
            res.status(400).json({
                code: -1,
                msg: `Ocurrió un error al actualizar la configuración de la cita`
            });
        } else {
            res.status(200).json({
                code: 1,
                user: updateT_configuracion_citas[0]
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

router.post("/mostrarconfiguracioncitas", async(req, res) => {
    try {
        
        const readT_configuracion_citas = await respuestaT_citas.readT_configuracion_citas(req);

        if (!readT_configuracion_citas) {
            res.status(400).json({
                code: -1,
                msg: `No hay ninguna configuración de citas guardadas`
            });
        } else {
            res.status(200).json({
                code: 1,
                user: readT_configuracion_citas
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

router.delete("/eliminarconfiguracioncita", async(req, res) => {
    try {
        
        const deleteT_configuracion_citas = await respuestaT_citas.deleteT_configuracion_citas(req);

        if (!deleteT_configuracion_citas) {
            res.status(400).json({
                code: -1,
                msg: `La configuración de la cita no pudo ser eliminada`
            });
        } else {
            res.status(200).json({
                code: 1,
                user: deleteT_configuracion_citas[0]
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