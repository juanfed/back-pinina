const router = require('express').Router();

const validarcampos = require('../utils/validateFields');
const respuestaT_clientes = require('../controllers/clientes.controller');
const respuestaT_mascotas = require('../controllers/mascotas.contrroller');
const respuestaT_vacunas = require('../controllers/vacunas.controller');

router.post('/mostrarvacunas', async (req, res) => {
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
      }
    ];

    const campoVacio = validarcampos(campos);

    if (campoVacio) {
      res.status(400).json({
        code: -2,
        msg: `No ha ingresado el campo ${campoVacio.nombre}`,
      });
    }

    const existe_cliente = await respuestaT_clientes.searcht_clientesId(id_usuario);

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

    const respuesta_readT_vacunas = await respuestaT_vacunas.readT_vacunas(req);

    if (!respuesta_readT_vacunas) {
      res.status(400).json({
        code: -1,
        msg: `No hay vacunas`,
      });
    } else {
      res.status(200).json({
        code: 1,
        msg: 'Vacunas',
        user: respuesta_readT_vacunas,
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

router.get('/mostrartiposvacuna', async (req, res) => {
  try {
    const respuesta_readT_vacunas =
      await respuestaT_vacunas.readallt_tipos_vacuna();

    if (!respuesta_readT_vacunas) {
      res.status(400).json({
        code: -1,
        msg: `No hay tipos de vacuna`,
      });
    } else {
      res.status(200).json({
        code: 1,
        msg: 'Tipos de vacunas',
        user: respuesta_readT_vacunas,
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

router.post('/vacunastipomascota', async (req, res) => {
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

    const respuesta_readT_tiposvacunas =
      await respuestaT_vacunas.readT_tiposvacuna_tipomascota(id_tipo_mascota);

    if (!respuesta_readT_tiposvacunas) {
      res.status(400).json({
        code: -1,
        msg: `No hay tipos de vacuna para el tipo de mascota ingresado`,
      });
    } else {
      res.status(200).json({
        code: 1,
        msg: 'Tipos de vacunas',
        tipos_vacunas: respuesta_readT_tiposvacunas,
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

router.post('/crearvacuna', async (req, res) => {
  try {
    const {
      id_tipo_vacunas,
      fecha_vacuna,
      dosis,
      fecha_proxima_vacuna,
      sintomas_vacuna,
      id_mascotas,
      id_usuario,
    } = req.body;
    const campos = [
      {
        nombre: 'id_tipo_vacunas',
        campo: id_tipo_vacunas,
      },
      {
        nombre: 'fecha_vacuna',
        campo: fecha_vacuna,
      },
      {
        nombre: 'dosis',
        campo: dosis,
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
      res.status(400).json({
        code: -2,
        msg: `No ha ingresado el campo ${campoVacio.nombre}`,
      });

    const existe_cliente = await respuestaT_clientes.searcht_clientesId(
      id_usuario
    );
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
    const respuesta_readT_vacunas = await respuestaT_vacunas.createT_vacunas(
      id_tipo_vacunas,
      fecha_vacuna,
      dosis,
      fecha_proxima_vacuna,
      sintomas_vacuna,
      id_mascotas,
      id_usuario
    );
    if (!respuesta_readT_vacunas) {
      res.status(400).json({
        code: -1,
        msg: `No se pudo crear la vacuna`,
      });
    } else {
      res.status(200).json({
        code: 1,
        msg: 'Vacuna creada',
        user: respuesta_readT_vacunas,
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

router.put('/actualizarvacuna', async (req, res) => {
  try {
    const {
      id_vacuna,
      id_tipo_vacunas,
      fecha_vacuna,
      dosis,
      fecha_proxima_vacuna,
      sintomas_vacuna,
      id_mascotas,

      id_usuario,
    } = req.body;
    const campos = [
      {
        nombre: 'id_vacuna',
        campo: id_vacuna,
      },
      {
        nombre: 'id_tipo_vacunas',
        campo: id_tipo_vacunas,
      },
      {
        nombre: 'fecha_vacuna',
        campo: fecha_vacuna,
      },
      {
        nombre: 'dosis',
        campo: dosis,
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
      res.status(400).json({
        code: -2,
        msg: `No ha ingresado el campo ${campoVacio.nombre}`,
      });

    const existe_vacuna = await respuestaT_vacunas.searcht_vacunaId(id_vacuna);
    if (!existe_vacuna) {
      return res.status(400).json({
        ok: false,
        msg: `No existe la vacuna con id: ${id_vacuna}`,
      });
    }

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
    const respuesta_readT_vacunas = await respuestaT_vacunas.updateT_vacunas(
      id_vacuna,
      id_tipo_vacunas,
      fecha_vacuna,
      dosis,
      fecha_proxima_vacuna,
      sintomas_vacuna,
      id_mascotas,
      id_usuario
    );
    if (!respuesta_readT_vacunas) {
      res.status(400).json({
        code: -1,
        msg: `No se pudo actualizar la vacuna`,
      });
    } else {
      res.status(200).json({
        code: 1,
        msg: 'Vacuna actualizada',
        user: respuesta_readT_vacunas,
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

router.delete('/eliminarvacuna', async (req, res) => {
  try {
    const { id_vacuna } = req.body;

    const campos = [
      {
        nombre: 'id_vacuna',
        campo: id_vacuna,
      },
    ];

    const campoVacio = campos.find((x) => !x.campo);

    if (campoVacio)
      res.status(400).json({
        code: -2,
        msg: `No ha ingresado el campo ${campoVacio.nombre}`,
      });

    const existe_vacuna = await respuestaT_vacunas.searcht_vacunaId(id_vacuna);
    if (!existe_vacuna) {
      return res.status(400).json({
        ok: false,
        msg: `No existe la vacuna con id: ${id_vacuna}`,
      });
    }

    const deleteT_vacuna = await respuestaT_vacunas.deleteT_vacuna(id_vacuna);

    if (!deleteT_vacuna) {
      res.status(400).json({
        code: -1,
        msg: `No se pudo eliminar`,
      });
    } else {
      res.status(200).json({
        code: 1,
        msg: 'Vacuna eliminada',
        user: deleteT_vacuna[0],
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
