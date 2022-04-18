const router = require('express').Router();

const respuestaT_mascotas = require('../controllers/mascotas.contrroller');
const respuestaT_clientes = require('../controllers/clientes.controller');
const respuestaT_usuarios = require('../controllers/clientes.controller');

//===========================================
//Mostrar mascotas en t_mascotas
//===========================================

router.post('/MostararMascotas', async (req, res) => {
  try {
    const { id_clientes } = req.body;

    const campos = [
      {
        nombre: 'id_clientes',
        campo: id_clientes,
      },
    ];

    const campoVacio = campos.find((x) => !x.campo);

    if (campoVacio) {
      return res.status(400).json({
        ok: false,
        msg: `No ha ingresado el campo ${campoVacio.nombre}`,
      });
    }

    const form = await respuestaT_mascotas.readT_mascotas(id_clientes);

    res.json({
      ok: true,
      msg: `formulario encontrado exitosamente`,
      form,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      ok: false,
      error: err.message,
    });
  }
});

router.post('/CrearMascotas', async (req, res) => {
  try {
    const {
      nombre_mascota,
      edad_mascota,
      escala_edad,
      esterilizado,
      id_raza,
      id_tamanio,
      id_color,
      genero_mascota,
      descripcion_mascota,
      id_clientes,
      fecha_nacimiento,
    } = req.body;
    req.body.id_usuario=id_clientes;
    const propietario_c = await respuestaT_usuarios.readT_clientes(req);
    if(propietario_c == null){
        return res.status(400).json({
            code: -2,
            message: "No existe el usuario en el sistema."
        })
    }
    const campos = [
      {
        nombre: 'nombre_mascota',
        campo: nombre_mascota,
      },
      {
        nombre: 'edad_mascota',
        campo: edad_mascota,
      },
      {
        nombre: 'escala_edad',
        campo: escala_edad,
      },
      {
        nombre: 'esterilizado',
        campo: esterilizado,
      },
      {
        nombre: 'id_raza',
        campo: id_raza,
      },
      {
        nombre: 'id_color',
        campo: id_color,
      },
      {
        nombre: 'genero_mascota',
        campo: genero_mascota,
      },
      {
        nombre: 'descripcion_mascota',
        campo: descripcion_mascota,
      },
      {
        nombre: 'id_clientes',
        campo: id_clientes,
      },
      {
        nombre: 'fecha_nacimiento',
        campo: fecha_nacimiento,
      },
    ];

    const campoVacio = campos.find((x) => !x.campo);

    if (campoVacio) {
      return res.status(400).json({
        ok: false,
        msg: `No ha ingresado el campo ${campoVacio.nombre}`,
      });
    }

    const searchT_clientes = await respuestaT_mascotas.readT_c_mascotas(
      nombre_mascota,
      edad_mascota,
      escala_edad,
      esterilizado,
      id_raza,
      id_tamanio,
      id_color,
      genero_mascota,
      descripcion_mascota,
      id_clientes,
      fecha_nacimiento
    );

    if (!searchT_clientes) {
      res.status(400).json({
        code: -1,
        searchT_clientes,
        msg: `error al ingresar la mascota`,
      });
    } else {
      res.json({
        ok: true,
        msg: `mascota ingresada exitosamente`,
        searchT_clientes,
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

router.post('/ActualizarMascota', async (req, res) => {
  try {
    const {
      id_mascotas,
      nombre_mascota,
      edad_mascota,
      escala_edad,
      esterilizado,
      id_raza,
      id_tamanio,
      id_color,
      genero_mascota,
      descripcion_mascota,
      id_clientes,
      fecha_nacimiento,
    } = req.body;

    const campos = [
      {
        nombre: 'id_mascotas',
        campo: id_mascotas,
      },
      {
        nombre: 'nombre_mascota',
        campo: nombre_mascota,
      },
      {
        nombre: 'edad_mascota',
        campo: edad_mascota,
      },
      {
        nombre: 'escala_edad',
        campo: escala_edad,
      },
      {
        nombre: 'esterilizado',
        campo: esterilizado,
      },
      {
        nombre: 'id_raza',
        campo: id_raza,
      },
      {
        nombre: 'id_color',
        campo: id_color,
      },
      {
        nombre: 'genero_mascota',
        campo: genero_mascota,
      },
      {
        nombre: 'descripcion_mascota',
        campo: descripcion_mascota,
      },
      {
        nombre: 'id_clientes',
        campo: id_clientes,
      },
      {
        nombre: 'fecha_nacimiento',
        campo: fecha_nacimiento,
      },
    ];

    const campoVacio = campos.find((x) => !x.campo);

    if (campoVacio) {
      return res.status(400).json({
        ok: false,
        msg: `No ha ingresado el campo ${campoVacio.nombre}`,
      });
    }

    const searchT_clientes = await respuestaT_mascotas.updateT_mascotas(
      id_mascotas,
      nombre_mascota,
      edad_mascota,
      escala_edad,
      esterilizado,
      id_raza,
      id_tamanio,
      id_color,
      genero_mascota,
      descripcion_mascota,
      id_clientes,
      fecha_nacimiento
    );

    if (!searchT_clientes) {
      res.status(400).json({
        code: -1,
        searchT_clientes,
        msg: `error al actualizar la mascota`,
      });
    } else {
      res.json({
        ok: true,
        msg: `mascota actualizada exitosamente`,
        searchT_clientes,
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

router.put('/actualizarmascotaperfil', async (req, res) => {
  try {
    const {
      id_mascotas,
      nombre_mascota,
      edad_mascota,
      id_raza,
      id_color,
      genero_mascota,
      id_clientes,
      fecha_nacimiento,

      identificacion,
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      direccion,
      correo,
      telefono,
    } = req.body;

    const campos = [
      {
        nombre: 'id_mascotas',
        campo: id_mascotas,
      },
      {
        nombre: 'nombre_mascota',
        campo: nombre_mascota,
      },
      {
        nombre: 'fecha_nacimiento',
        campo: fecha_nacimiento,
      },
      {
        nombre: 'edad_mascota',
        campo: edad_mascota,
      },
      {
        nombre: 'id_raza',
        campo: id_raza,
      },
      {
        nombre: 'id_color',
        campo: id_color,
      },
      {
        nombre: 'genero_mascota',
        campo: genero_mascota,
      },
      {
        nombre: 'id_clientes',
        campo: id_clientes,
      },
      {
        nombre: 'fecha_nacimiento',
        campo: fecha_nacimiento,
      },
    ];

    const campoVacio = campos.find((x) => !x.campo);

    if (campoVacio) {
      return res.status(400).json({
        ok: false,
        msg: `No ha ingresado el campo ${campoVacio.nombre}`,
      });
    }

    const existe_mascota = await respuestaT_mascotas.obtenerMascotaPorId(
      id_mascotas
    );
    if (!existe_mascota) {
      return res.status(400).json({
        ok: false,
        msg: `No esta registrada esta mascota con id: ${id_mascotas}`,
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
    if (
      !primer_nombre ||
      !segundo_nombre ||
      !primer_apellido ||
      !segundo_apellido ||
      !direccion ||
      !correo ||
      !telefono ||
      !identificacion
    ) {
      const updateT_mascotaspefil =
        await respuestaT_mascotas.updateT_mascotasperfil(
          id_mascotas,
          nombre_mascota,
          edad_mascota,
          id_raza,
          id_color,
          genero_mascota,
          id_clientes,
          fecha_nacimiento
        );

      if (!updateT_mascotaspefil) {
        res.status(400).json({
          code: -1,
          updateT_mascotaspefil,
          msg: `error al actualizar el perfil de la mascota`,
        });
      } else {
        res.json({
          ok: true,
          msg: `perfil de la mascota actualizado exitosamente`,
          updateT_mascotaspefil,
        });
      }
    } else {
      const campos = [
        {
          nombre: 'identificacion',
          campo: identificacion,
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
          nombre: 'correo',
          campo: correo,
        },
        {
          nombre: 'telefono',
          campo: telefono,
        },
      ];

      const campoVacio = campos.find((x) => !x.campo);

      if (campoVacio) {
        return res.status(400).json({
          ok: false,
          msg: `No ha ingresado el campo ${campoVacio.nombre}`,
        });
      }
      const update_clienteMascota =
        await respuestaT_clientes.update_clienteMascota(
          id_clientes,
          identificacion,
          primer_nombre,
          segundo_nombre,
          primer_apellido,
          segundo_apellido,
          direccion,
          correo,
          telefono
        );

      const updateT_mascotaspefil =
        await respuestaT_mascotas.updateT_mascotasperfil(
          id_mascotas,
          nombre_mascota,
          edad_mascota,
          id_raza,
          id_color,
          genero_mascota,
          id_clientes
        );
      if (!updateT_mascotaspefil || !update_clienteMascota) {
        res.status(400).json({
          code: -1,
          updateT_mascotaspefil,
          update_clienteMascota,
          msg: `error al actualizar el perfil de la mascota`,
        });
      } else {
        res.json({
          ok: true,
          msg: `perfil de la mascota actualizado exitosamente`,
          updateT_mascotaspefil,
          update_clienteMascota,
        });
      }
    }
  } catch (err) {
    console.log(err);

    res.status(500).json({
      ok: false,
      error: err.message,
    });
  }
});

router.get('/mostrarrazas', async (req, res) => {
  try {
    const readT_razas = await respuestaT_mascotas.readT_razas();

    if (!readT_razas) {
      res.status(400).json({
        code: -1,
        msg: `No hay ninguna raza registrada`,
      });
    } else {
      res.status(200).json({
        code: 1,
        user: readT_razas,
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

router.get('/tiposmascotas', async (req, res) => {
  try {
    const readT_tiposmascotas = await respuestaT_mascotas.readT_tiposmascotas();

    if (!readT_tiposmascotas) {
      res.status(400).json({
        code: -1,
        msg: `No se encontró ningún tipo de mascota registrado`,
      });
    } else {
      res.status(200).json({
        code: 1,
        user: readT_tiposmascotas,
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

router.get('/generomascota', async (req, res) => {
  try {
    const readT_generomascota = await respuestaT_mascotas.readT_generomascota();

    if (!readT_generomascota) {
      res.status(400).json({
        code: -1,
        msg: `No se encontró ningún género de las mascotas registrado`,
      });
    } else {
      res.status(200).json({
        code: 1,
        user: readT_generomascota,
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

router.get('/coloresmascotas', async (req, res) => {
  try {
    const readT_coloresmascotas =
      await respuestaT_mascotas.readT_coloresmascotas();

    if (!readT_coloresmascotas) {
      res.status(400).json({
        code: -1,
        msg: `No se encontró ningún color registrado`,
      });
    } else {
      res.status(200).json({
        code: 1,
        user: readT_coloresmascotas,
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

router.post('/colorestipomascota', async (req, res) => {
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

    const readT_colores =
      await respuestaT_mascotas.readT_colores_tipomascota(id_tipo_mascota);

    if (!readT_colores) {
      res.status(400).json({
        code: -1,
        msg: `No hay colores para el tipo de mascota ingresado`,
      });
    } else {
      res.status(200).json({
        code: 1,
        msg: 'Colores',
        tipos_vacunas: readT_colores,
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

router.get('/tamaniomascotas', async (req, res) => {
  try {
    const readT_tamaniomascotas =
      await respuestaT_mascotas.readT_tamaniomascotas();

    if (!readT_tamaniomascotas) {
      res.status(400).json({
        code: -1,
        msg: `No se encontró ningún tamaño registrado`,
      });
    } else {
      res.status(200).json({
        code: 1,
        user: readT_tamaniomascotas,
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

router.post('/obteneridfotoConIdmascota', async (req, res) => {
  try {
    const { id_mascotas } = req.body;

    const campos = [
      {
        nombre: 'id_mascotas',
        campo: id_mascotas,
      },
    ];

    const campoVacio = campos.find((x) => !x.campo);

    if (campoVacio) {
      return res.status(400).json({
        ok: false,
        msg: `No ha ingresado el campo ${campoVacio.nombre}`,
      });
    }
    const existe_mascota = await respuestaT_mascotas.obtenerMascotaPorId(
      id_mascotas
    );
    if (!existe_mascota) {
      return res.status(400).json({
        ok: false,
        msg: `No esta registrada esta mascota con id: ${id_mascotas}`,
      });
    }
    const respuesta =
      await respuestaT_mascotas.readIdT_fotos_mascotaPoridmascota(id_mascotas);

    if (!respuesta) {
      res.status(400).json({
        code: -1,
        respuesta,
        msg: `No hay una foto de la mascota`,
      });
    } else {
      res.json({
        ok: true,
        msg: `Id de la foto de la mascota`,
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
