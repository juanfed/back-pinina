const router = require('express').Router();

const validarCampos = require("../utils/validateFields");
const respuestaT_clientes = require('../controllers/clientes.controller');
const respuestaT_mascotas = require('../controllers/mascotas.contrroller');

//===========================================
//Mostrar clientes en t_clientes
//===========================================
router.post('/mostrarclientes', async (req, res) => {
  try {
    const readT_clientes = await respuestaT_clientes.readT_clientes(req);

    if (!readT_clientes) {
      res.status(400).json({
        code: -1,
        msg: `No hay ningún cliente asignado a este usuario`,
      });
    } else {
      res.status(200).json({
        code: 1,
        user: readT_clientes,
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

router.put('/actualizarclientes', async (req, res) => {
  try {
    //Se toman solo los campos necesarios que vienen en el body de la petición
    let {
      id_clientes,
      id_tipo_identificacion,
      identificacion,
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      direccion,
      telefono,
      correo,
      codigo_ubicacion_geografica_pais,
      codigo_ubicacion_geografica_departamento,
      codigo_ubicacion_geografica_ciudad,
      codigo_ubicacion_geografica_localidad,
      id_usuario,
    } = req.body;
    /**Se guardan todos los campos recibidos en el body
     * de la petición dentro de un array
     */

    const campos = [
      {
        nombre: 'id_clientes',
        campo: id_clientes,
      },
      {
        nombre: 'id_tipo_identificacion',
        campo: id_tipo_identificacion,
      },
      {
        nombre: 'id_tipo_identificacion',
        campo: id_tipo_identificacion,
      },
      {
        nombre: 'primer_nombre',
        campo: primer_nombre,
      },
      {
        nombre: 'segundo_nombre',
        campo: segundo_nombre,
      },
      {
        nombre: 'primer_apellido',
        campo: primer_apellido,
      },
      {
        nombre: 'segundo_apellido',
        campo: segundo_apellido,
      },
      {
        nombre: 'direccion',
        campo: direccion,
      },
      {
        nombre: 'telefono',
        campo: telefono,
      },
      {
        nombre: 'correo',
        campo: correo,
      },
      {
        nombre: 'codigo_ubicacion_geografica_pais',
        campo: codigo_ubicacion_geografica_pais,
      },
      {
        nombre: 'codigo_ubicacion_geografica_departamento',
        campo: codigo_ubicacion_geografica_departamento,
      },
      {
        nombre: 'codigo_ubicacion_geografica_ciudad',
        campo: codigo_ubicacion_geografica_ciudad,
      },
      {
        nombre: 'codigo_ubicacion_geografica_localidad',
        campo: codigo_ubicacion_geografica_localidad,
      }
    ];

    const campoVacio = campos.find((x) => !x.campo);

    if (campoVacio)
      res.status(400).json({
        code: -2,
        msg: `No ha ingresado el campo ${campoVacio.nombre}`,
      });

    const updateT_clientes = await respuestaT_clientes.updateT_clientes(req);

    if (!updateT_clientes) {
      res.status(400).json({
        code: -1,
        msg: `Ocurrió un error al actualizar los datos del cliente`,
      });
    } else {
      res.status(200).json({
        code: 1,
        user: updateT_clientes[0],
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

router.post('/crearusuario', async (req, res) => {
  try {
    //Se toman solo los campos necesarios que vienen en el body de la petición

    const { tipo_identificacion, identificacion, primer_nombre, segundo_nombre,
      primer_apellido, segundo_apellido, direccion, telefono, correo, contraseña, codigo_ubicacion_geografica_pais, codigo_ubicacion_geografica_departamento, codigo_ubicacion_geografica_ciudad, codigo_ubicacion_geografica_localidad 
    } = req.body;
    
    /**Se guardan todos los campos recibidos en el body
     * de la petición dentro de un array
     */

    const campos = [
      {
        nombre: 'tipo_identificacion',
        campo: tipo_identificacion
      },
      {
        nombre: 'identificacion',
        campo: identificacion
      },
      {
        nombre: 'primer_nombre',
        campo: primer_nombre
      },
      {
        nombre: 'segundo_nombre',
        campo: segundo_nombre
      },
      {
        nombre: 'primer_apellido',
        campo: primer_apellido
      },
      {
        nombre: 'segundo_apellido',
        campo: segundo_apellido
      },
      {
        nombre: 'direccion',
        campo: direccion
      },
      {
        nombre: 'telefono',
        campo: telefono
      },
      {
        nombre: 'correo',
        campo: correo
      },
      {
        nombre: 'contraseña',
        campo: contraseña
      },
      {
        nombre: 'codigo_ubicacion_geografica_pais',
        campo: codigo_ubicacion_geografica_pais
      },
      {
        nombre: 'codigo_ubicacion_geografica_departamento',
        campo: codigo_ubicacion_geografica_departamento
      },
      {
        nombre: 'codigo_ubicacion_geografica_ciudad',
        campo: codigo_ubicacion_geografica_ciudad
      },
      {
        nombre: 'codigo_ubicacion_geografica_localidad',
        campo: codigo_ubicacion_geografica_localidad
      }
    ];

    const campoVacio = validarCampos(campos);

    if (campoVacio) {
      res.status(400).json({
        code: -2,
        msg: `No ha ingresado el campo ${campoVacio.nombre}`,
      });
    }
      
    const cliente = await respuestaT_clientes.searchT_clienteCorreo(correo);

    if (!cliente) {
      const createT_clientes = await respuestaT_clientes.createT_clientes(req);

      if (!createT_clientes) {
        res.status(400).json({
          code: -1,
          msg: `Ocurrió un error al registrar el cliente cliente`,
        });
      } else {
        res.status(200).json({
          code: 1,
          user: createT_clientes[0],
        });
      }
    } else {
      res.status(400).json({
        code: -2,
        msg: `El cliente ingresado ya se encuentra registrado`,
      })
    }

  } catch (err) {
    console.log(err);
    res.status(400).json({
      code: -1,
      msg: err.message,
    });
  }
});

router.post('/crearusuario/pinina', async (req, res) => {
  try {
    //Se toman solo los campos necesarios que vienen en el body de la petición

    const { correo, contraseña, codigo_ubicacion_geografica_pais, nombre_completo, apellidos    } = req.body;
    
    /**Se guardan todos los campos recibidos en el body
     * de la petición dentro de un array
     */

    const campos = [
      {
        nombre: 'correo',
        campo: correo
      },
      {
        nombre: 'contraseña',
        campo: contraseña
      },
      {
        nombre: 'codigo_ubicacion_geografica_pais',
        campo: codigo_ubicacion_geografica_pais
      },
      {
        nombre: 'nombre_completo',
        campo: nombre_completo
      },
      {
        nombre: 'apellidos',
        campo: apellidos
      }
      
    ];

    const campoVacio = validarCampos(campos);

    if (campoVacio) {
      res.status(400).json({
        code: -2,
        msg: `No ha ingresado el campo ${campoVacio.nombre}`,
      });
    }
      
    const cliente = await respuestaT_clientes.searchT_clienteCorreo(correo);

    if (!cliente) {
      const createT_clientes = await respuestaT_clientes.createT_usuario_registro(req);

      if (!createT_clientes) {
        res.status(400).json({
          code: -1,
          msg: `Ocurrió un error al registrar el cliente cliente`,
        });
      } else {
        res.status(200).json({
          code: 1,
          user: createT_clientes[0],
        });
      }
    } else {
      res.status(400).json({
        code: -2,
        msg: `El cliente ingresado ya se encuentra registrado`,
      })
    }

  } catch (err) {
    console.log(err);
    res.status(400).json({
      code: -1,
      msg: err.message,
    });
  }
});


router.post('/buscarclientes', async (req, res) => {
  try {
    const { id_usuario, identificacion, correo } = req.body;

    let param_busqueda;

    if (identificacion) {
      param_busqueda = identificacion;
    } else if (correo) {
      param_busqueda = correo;
    }

    if (!param_busqueda)
      res.status(400).json({
        code: -2,
        msg: `No ha ingresado un parámetro de búsqueda`,
      });

    const searchT_clientes = await respuestaT_clientes.searchT_clientes(
      id_usuario,
      param_busqueda
    );

    if (!searchT_clientes) {
      res.status(400).json({
        code: -1,
        msg: `No existe el cliente ingresado`,
      });
    } else {
      res.status(200).json({
        code: 1,
        user: searchT_clientes,
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

router.delete('/eliminarcliente', async (req, res) => {
  try {
    const deleteT_clientes = await respuestaT_clientes.deleteT_clientes(req);

    if (!deleteT_clientes) {
      res.status(400).json({
        code: -1,
        msg: `El cliente no pudo ser eliminado porque no se encuentra en t_clientes`,
      });
    } else {
      res.status(200).json({
        code: 1,
        user: deleteT_clientes[0],
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

router.post('/obteneridfotomascotaporidcliyidusua', async (req, res) => {
  try {
    let { id_clientes, id_usuario } = req.body;
    /**Se guardan todos los campos recibidos en el body
     * de la petición dentro de un array
     */

    const campos = [
      {
        nombre: 'id_clientes',
        campo: id_clientes,
      },
      {
        nombre: 'id_usuario',
        campo: id_usuario,
      },
    ];

    const campoVacio = campos.find((x) => !x.campo);

    if (campoVacio) {
      res.status(400).json({
        code: -2,
        msg: `No ha ingresado el campo ${campoVacio.nombre}`,
      });
    }

    const existe_cliente = await respuestaT_clientes.searcht_clientesId(
      id_clientes
    );
    if (!existe_cliente) {
      return res.status(400).json({
        ok: false,
        msg: `No existe el cliente con id: ${id_clientes}`,
      });
    }
    const respuesta_id_mascota =
      await respuestaT_clientes.getT_mascotaIdporIdclienteYIdusuario(
        id_clientes,
        id_usuario
      );

    if (!respuesta_id_mascota) {
      const respuestaT_clientesSinFoto =
        await respuestaT_clientes.getT_clientesporIdclienteYIdUsuario(
          id_clientes,
          id_usuario
        );
      if (!respuestaT_clientesSinFoto) {
        res.status(400).json({
          code: -1,
          msg: `Error`,
        });
      }
      res.status(200).json({
        code: 1,
        user: respuestaT_clientesSinFoto,
      });
    } else {
      res.status(200).json({
        code: 1,
        user: respuesta_id_mascota,
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

module.exports = router;
