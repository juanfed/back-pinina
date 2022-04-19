const router = require('express').Router();

const validarcampos = require('../utils/validateFields');
const respuestaT_clientes = require('../controllers/clientes.controller');
const respuestaT_mascotas = require('../controllers/mascotas.contrroller');
const respuestaT_hospitalizacion = require('../controllers/hospitalizacion.controller');

router.post('/mostrarhospitalizacion', async (req, res) => {
  try {

    const { id_mascotas, id_usuario } = req.body;

    const campos = [
      {
        nombre: 'id_mascotas',
        campo: id_mascotas,
      },
      {
        nombre: 'id_usuario',
        campo: id_usuario,
      },
    ];

    const campoVacio = validarcampos(campos);

    if (campoVacio)
      return res.status(400).json({
        code: -2,
        msg: `No ha ingresado el campo ${campoVacio.nombre}`,
      });

    const existe_cliente = await respuestaT_clientes.searcht_clientesId(
    id_usuario);

    if (!existe_cliente) {
      return res.status(400).json({
        ok: false,
        msg: `No existe el cliente con id: ${id_usuario}`,
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

    const respuesta_readT_hospitalizacion = await respuestaT_hospitalizacion.readT_hospitalizacion(req);

    if (!respuesta_readT_hospitalizacion) {
      res.status(400).json({
        code: -1,
        msg: `No hay hospitalizaciones`,
      });
    } else {
      res.status(200).json({
        code: 1,
        msg: 'hospitalizacion',
        user: respuesta_readT_hospitalizacion,
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

router.post('/insertarhospitalizacion', async (req, res) => {
  try {
    const {
      tipo_hozpitalizacion,
      hora_hoz,
      razon_hoztext,
      descripcion_hoz,
      profesional,
      fecha_entrada_hoz,
      fecha_salida_hoz,
      estado_hoz = 1,
      id_mascotas,
      id_usuario,

      tr,
      fc,
      temp,
      pulso,
      peso,
    } = req.body;
    const campos = [
      {
        nombre: 'hora_hoz',
        campo: hora_hoz,
      },
      {
        nombre: 'razon_hoztext',
        campo: razon_hoztext,
      },
      {
        nombre: 'descripcion_hoz',
        campo: descripcion_hoz,
      },
      {
        nombre: 'profesional',
        campo: profesional,
      },
      {
        nombre: 'descripcion_hoz',
        campo: descripcion_hoz,
      },
      {
        nombre: 'fecha_entrada_hoz',
        campo: fecha_entrada_hoz,
      },
      {
        nombre: 'id_mascotas',
        campo: id_mascotas,
      },
    
      {
        nombre: 'id_usuario',
        campo: id_usuario,
      },
    ];

    const campoVacio = campos.find((x) => !x.campo);

    if (campoVacio)
      return res.status(400).json({
        code: -2,
        msg: `No ha ingresado el campo ${campoVacio.nombre}`,
      });

    const existe_cliente = await respuestaT_clientes.searcht_clientesId(
      id_usuario
    );
    if (!existe_cliente) {
      return res.status(400).json({
        ok: false,
        msg: `No existe el cliente con id: ${id_clientes}`,
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

    if (!tr || !fc || !temp || !pulso || !peso) {
      const respuesta_insertarT_hospitalizacion =
        await respuestaT_hospitalizacion.insertarT_hospitalizacion(
          tipo_hozpitalizacion,
          hora_hoz,
          razon_hoztext,
          descripcion_hoz,
          profesional,
          fecha_entrada_hoz,
          fecha_salida_hoz,
          estado_hoz,
          id_mascotas,
          id_clientes,
          id_usuario
        );
      if (!respuesta_insertarT_hospitalizacion) {
        res.status(400).json({
          code: -1,
          msg: `No se pudo crear la hospitalizacion`,
        });
      } else {
        res.status(200).json({
          code: 1,
          msg: 'hospitalizacion creada',
          user: respuesta_insertarT_hospitalizacion,
        });
      }
    } else {
      const campos = [
        {
          nombre: 'tr',
          campo: tr,
        },
        {
          nombre: 'fc',
          campo: fc,
        },
        {
          nombre: 'temp',
          campo: temp,
        },
        {
          nombre: 'pulso',
          campo: pulso,
        },
        {
          nombre: 'peso',
          campo: peso,
        },
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
      const respuesta_insertarT_hospitalizacion =
        await respuestaT_hospitalizacion.insertarT_hospitalizacion(
          tipo_hozpitalizacion,
          hora_hoz,
          razon_hoztext,
          descripcion_hoz,
          profesional,
          fecha_entrada_hoz,
          fecha_salida_hoz,
          estado_hoz,
          id_mascotas,
        
          id_usuario
        );
      const id_hospitalizacion =
        respuesta_insertarT_hospitalizacion[0].id_hozpitalizacion;
      const respuestaT_signos_vitales =
        await respuestaT_hospitalizacion.insertar_signos_vitales(
          tr,
          fc,
          temp,
          pulso,
          peso,
          id_mascotas,
          id_hospitalizacion
        );

      if (!respuesta_insertarT_hospitalizacion || !respuestaT_signos_vitales) {
        res.status(400).json({
          code: -1,
          respuesta_insertarT_hospitalizacion,
          respuestaT_signos_vitales,
          msg: `error al insertar la hospitalizacion`,
        });
      } else {
        res.json({
          ok: true,
          msg: `hospitalizacion insertada`,
          respuesta_insertarT_hospitalizacion,
          respuestaT_signos_vitales,
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      code: -1,
      msg: err.message,
    });
  }
});

router.put('/actualizarhospitalizacion', async (req, res) => {
  try {
    const {
      tipo_hozpitalizacion,
      hora_hoz,
      razon_hoztext,
      descripcion_hoz,
      profesional,
      fecha_entrada_hoz,
      fecha_salida_hoz,
      estado_hoz,
      id_mascotas,
   
      id_usuario,
      id_hozpitalizacion,

      tr,
      fc,
      temp,
      pulso,
      peso,
      id_signos_vitales,
    } = req.body;
    const campos = [
      {
        nombre: 'hora_hoz',
        campo: hora_hoz,
      },
      {
        nombre: 'razon_hoztext',
        campo: razon_hoztext,
      },
      {
        nombre: 'descripcion_hoz',
        campo: descripcion_hoz,
      },
      {
        nombre: 'profesional',
        campo: profesional,
      },
      {
        nombre: 'descripcion_hoz',
        campo: descripcion_hoz,
      },
      {
        nombre: 'fecha_entrada_hoz',
        campo: fecha_entrada_hoz,
      },
      {
        nombre: 'estado_hoz',
        campo: estado_hoz,
      },
    
      {
        nombre: 'id_usuario',
        campo: id_usuario,
      },
      {
        nombre: 'id_hozpitalizacion',
        campo: id_hozpitalizacion,
      },
      {
        nombre: 'id_mascotas',
        campo: id_mascotas,
      },
    ];

    const campoVacio = campos.find((x) => !x.campo);

    if (campoVacio)
      return res.status(400).json({
        code: -2,
        msg: `No ha ingresado el campo ${campoVacio.nombre}`,
      });

    const existe_cliente = await respuestaT_clientes.searcht_clientesId(
      id_usuario
    );
    if (!existe_cliente) {
      return res.status(400).json({
        ok: false,
        msg: `No existe el cliente con id: ${id_clientes}`,
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

    const existe_hozpitalizacion =
      await respuestaT_hospitalizacion.searcht_hozpitalizacionId(
        id_hozpitalizacion
      );
    if (!existe_hozpitalizacion) {
      return res.status(400).json({
        ok: false,
        msg: `No existe la hospi con id: ${id_hozpitalizacion}`,
      });
    }

    if (!tr || !fc || !temp || !pulso || !peso) {
      const respuesta_updateT_hospitalizacion =
        await respuestaT_hospitalizacion.updateT_hospitalizacion(
          tipo_hozpitalizacion,
          hora_hoz,
          razon_hoztext,
          descripcion_hoz,
          profesional,
          fecha_entrada_hoz,
          fecha_salida_hoz,
          estado_hoz,
          id_mascotas,
          id_usuario,
          id_hozpitalizacion
        );
      if (!respuesta_updateT_hospitalizacion) {
        res.status(400).json({
          code: -1,
          msg: `No se pudo actualizar la hospitalizacion`,
        });
      } else {
        res.status(200).json({
          code: 1,
          msg: 'hospitalizacion actualizada',
          user: respuesta_updateT_hospitalizacion,
        });
      }
    } else {
      const campos = [
        {
          nombre: 'tr',
          campo: tr,
        },
        {
          nombre: 'fc',
          campo: fc,
        },
        {
          nombre: 'temp',
          campo: temp,
        },
        {
          nombre: 'pulso',
          campo: pulso,
        },
        {
          nombre: 'peso',
          campo: peso,
        },
        {
          nombre: 'id_mascotas',
          campo: id_mascotas,
        },
        {
          nombre: 'id_signos_vitales',
          campo: id_signos_vitales,
        },
        {
          nombre: 'id_hozpitalizacion',
          campo: id_hozpitalizacion,
        },
      ];

      const campoVacio = campos.find((x) => !x.campo);

      if (campoVacio) {
        return res.status(400).json({
          ok: false,
          msg: `No ha ingresado el campo ${campoVacio.nombre}`,
        });
      }

      const existe_signos_vitales =
        await respuestaT_hospitalizacion.searcht_signos_vitalesId(
          id_signos_vitales
        );
      if (!existe_signos_vitales) {
        return res.status(400).json({
          ok: false,
          msg: `No existen los signos vitales con id: ${id_signos_vitales}`,
        });
      }
      const respuesta_updateT_hospitalizacion =
        await respuestaT_hospitalizacion.updateT_hospitalizacion(
          tipo_hozpitalizacion,
          hora_hoz,
          razon_hoztext,
          descripcion_hoz,
          profesional,
          fecha_entrada_hoz,
          fecha_salida_hoz,
          estado_hoz,
          id_mascotas,
       
          id_usuario,
          id_hozpitalizacion
        );

      const respuestaT_signos_vitales =
        await respuestaT_hospitalizacion.updateT_signos_vitales(
          tr,
          fc,
          temp,
          pulso,
          peso,
          id_mascotas,
          id_hozpitalizacion,
          id_signos_vitales
        );

      if (!respuesta_updateT_hospitalizacion || !respuestaT_signos_vitales) {
        res.status(400).json({
          code: -1,
          respuesta_updateT_hospitalizacion,
          respuestaT_signos_vitales,
          msg: `error al actualizar la hospitalizacion`,
        });
      } else {
        res.json({
          ok: true,
          msg: `hospitalizacion actualizada`,
          respuesta_updateT_hospitalizacion,
          respuestaT_signos_vitales,
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      code: -1,
      msg: err.message,
    });
  }
});

router.delete('/eliminarhospitalizacion', async (req, res) => {
  try {
    const { id_hozpitalizacion } = req.body;

    const campos = [
      {
        nombre: 'id_hozpitalizacion',
        campo: id_hozpitalizacion,
      },
    ];

    const campoVacio = campos.find((x) => !x.campo);

    if (campoVacio)
      res.status(400).json({
        code: -2,
        msg: `No ha ingresado el campo ${campoVacio.nombre}`,
      });

    const existe_hozpitalizacion =
      await respuestaT_hospitalizacion.searcht_hozpitalizacionId(
        id_hozpitalizacion
      );
    if (!existe_hozpitalizacion) {
      return res.status(400).json({
        ok: false,
        msg: `No existe la hospi con id: ${id_hozpitalizacion}`,
      });
    }

    const respuesta_deleteT_hozpitalizacion =
      await respuestaT_hospitalizacion.deleteT_hozpitalizacion(
        id_hozpitalizacion
      );

    if (!respuesta_deleteT_hozpitalizacion) {
      res.status(400).json({
        code: -1,
        msg: `No se pudo eliminar la hospitalizacion`,
      });
    } else {
      res.status(200).json({
        code: 1,
        msg: 'hospitalizacion eliminada',
        user: respuesta_deleteT_hozpitalizacion,
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
