const router = require('express').Router();

const validarcampos = require('../utils/validateFields');
const respuestaT_historias_mascotas = require('../controllers/historialmascotas.controller');
const respuestaT_clientes = require('../controllers/clientes.controller');
const respuestaT_mascotas = require('../controllers/mascotas.contrroller');

router.post('/InsertarHistorialClinico', async (req, res) => {
  try {
    

    const {
      fecha_grabacion,
      hora,
      profesional,
      antecedentes,
      sintomas,
      observaciones,
      diagnostico,
      id_usuario,
      id_mascotas,
      id_formula,
      id_medicina,
      dosificacion,
      frecuencia,
      dias,
      recomendacion,
    } = req.body;

    const campos = [
      {
        nombre: 'fecha_grabacion',
        campo: fecha_grabacion,
      },
      {
        nombre: 'hora',
        campo: hora,
      },
      {
        nombre: 'profesional',
        campo: profesional,
      },
      {
        nombre: 'antecedentes',
        campo: antecedentes,
      },
      {
        nombre: 'sintomas',
        campo: sintomas,
      },
      {
        nombre: 'observaciones',
        campo: observaciones,
      },
      {
        nombre: 'diagnostico',
        campo: diagnostico,
      },
      {
        nombre: 'id_usuario',
        campo: id_usuario,
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

    if (
      !id_medicina ||
      !dosificacion ||
      !frecuencia ||
      !dias ||
      !recomendacion
    ) {
      
      const insert_historial =
        await respuestaT_historias_mascotas.insert_historial_clinico(
          fecha_grabacion,
          hora,
          profesional,
          antecedentes,
          sintomas,
          observaciones,
          diagnostico,
          id_usuario,
          id_formula,
          id_mascotas
        );
      if (!insert_historial) {
        res.status(400).json({
          code: -1,
          insert_historial,
          msg: `error al insertar historial`,
        });
      } else {
        res.json({
          ok: true,
          msg: `insercion realizada  exitosamente`,
          insert_historial,
        });
      }
    } else {
      const insertformula = await respuestaT_historias_mascotas.insert_formulas(
        id_medicina,
        dosificacion,
        frecuencia,
        dias,
        recomendacion
      );

      if (!insertformula) {
        id_formula = null;
      } else {
        id_formula = insertformula;
      }
      const insert_historial =
        await respuestaT_historias_mascotas.insert_historial_clinico(
          fecha_grabacion,
          hora,
          profesional,
          antecedentes,
          sintomas,
          observaciones,
          diagnostico,
          id_usuario,
          id_formula,
          id_mascotas
        );
      if (!insert_historial) {
        res.status(400).json({
          code: -1,
          insert_historial,
          msg: `error al insertar historial`,
        });
      } else {
        res.json({
          ok: true,
          msg: `insercion realizada  exitosamente`,
          insert_historial,
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

router.get('/medicinas', async (req, res) => {
  try {
    const medicinas = await respuestaT_historias_mascotas.read_medicinas();

    if (medicinas === null) {
      res.status(400).json({
        ok: false,
        msg: `Aún no hay medicinas registradas`,
      });
    } else {
      res.json({
        ok: true,
        medicinas,
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

router.post('/InsertarNotaHistorial', async (req, res) => {
  try {
    const { nota, id_historias } = req.body;

    const campos = [
      {
        nombre: 'nota',
        campo: nota,
      },
      {
        nombre: 'id_historias',
        campo: id_historias,
      },
    ];

    const campoVacio = campos.find((x) => !x.campo);

    if (campoVacio) {
      return res.status(400).json({
        ok: false,
        msg: `No ha ingresado el campo ${campoVacio.nombre}`,
      });
    }

    const insert_notas = await respuestaT_historias_mascotas.insert_notas(
      nota,
      id_historias
    );
    if (!insert_notas) {
      res.status(400).json({
        code: -1,
        insert_notas,
        msg: `error al insertar nota`,
      });
    } else {
      res.json({
        ok: true,
        msg: `insercion realizada  exitosamente`,
        insert_notas,
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

router.post('/InsertarExamenHistorial', async (req, res) => {
  try {
    const { id_tipo_examen, descripcion, fecha_examen, resultados } = req.body;

    const campos = [
      {
        nombre: 'id_tipo_examen',
        campo: id_tipo_examen,
      },
      {
        nombre: 'descripcion',
        campo: descripcion,
      },
      {
        nombre: 'fecha_examen',
        campo: fecha_examen,
      },
      {
        nombre: 'resultados',
        campo: resultados,
      },
    ];

    const campoVacio = campos.find((x) => !x.campo);

    if (campoVacio) {
      return res.status(400).json({
        ok: false,
        msg: `No ha ingresado el campo ${campoVacio.nombre}`,
      });
    }

    const insert_examen = await respuestaT_historias_mascotas.insert_examen(
      id_tipo_examen,
      descripcion,
      fecha_examen,
      resultados
    );
    if (!insert_examen) {
      res.status(400).json({
        code: -1,
        insert_examen,
        msg: `error al insertar nota`,
      });
    } else {
      res.json({
        ok: true,
        msg: `insercion realizada  exitosamente`,
        insert_examen,
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

router.get('/examenes', async (req, res) => {
  try {
    const medicinas = await respuestaT_historias_mascotas.read_examen();

    if (medicinas === null) {
      res.status(400).json({
        ok: false,
        msg: `Aún no hay medicinas registradas`,
      });
    } else {
      res.json({
        ok: true,
        medicinas,
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

router.post('/MostrarHistorialMascota', async (req, res) => {
  try {
    
    const { id_usuario, id_mascotas} = req.body;

    const campos = [
      {
        nombre: ' id_usuario',
        campo: id_usuario,
      },
      {
        nombre: 'id_mascotas',
        campo: id_mascotas,
      }
    ];

    const campoVacio = validarcampos(campos);

    if (campoVacio) {
      return res.status(400).json({
        ok: false,
        msg: `No ha ingresado el campo ${campoVacio.nombre}`,
      });
    }

    const mostrar_historias = await respuestaT_historias_mascotas.readt_historias_clinicas(req);

    if (!mostrar_historias) {
      return res.status(400).json({
        code: -1,
        mostrar_historias,
        msg: `error al imprimir historias`
      });
    } else {
      return res.json({
        ok: true,
        msg: `insercion realizada  exitosamente`,
        mostrar_historias,
      });
    }

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      ok: false,
      error: err.message,
    });
  }
});

router.post('/verexamenidhistoidmasco', async (req, res) => {
  try {
    const { id_historias, id_mascotas } = req.body;

    const campos = [
      {
        nombre: 'id_historias',
        campo: id_historias,
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

    const existe_historia = await respuestaT_historias_mascotas.read_historiaid(
      id_historias
    );

    if (!existe_historia) {
      return res.status(400).json({
        ok: false,
        msg: `No existe la historia con id ${id_historias}`,
      });
    }

    const existe_mascota = await respuestaT_mascotas.obtenerMascotaPorId(
      id_mascotas
    );
    if (!existe_mascota) {
      return res.status(400).json({
        ok: false,
        msg: `No existe la mascota con id ${id_mascotas}`,
      });
    }

    const search_idexamen =
      await respuestaT_historias_mascotas.readt_examenidhidm(req);

    if (!search_idexamen) {
      res.status(400).json({
        code: -1,
        search_idexamen,
        msg: `No hay ningun examen`,
      });
    } else {
      res.json({
        ok: true,
        msg: `consulta del examen existosa`,
        search_idexamen,
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

router.put('/actualizarhistorialclinico', async (req, res) => {
  try {
    const {
      id_historias,
      fecha_grabacion,
      hora,
      profesional,
      antecedentes,
      sintomas,
      observaciones,
      diagnostico,
      id_usuario,
      id_formula,
      id_mascotas,
    } = req.body;

    const campos = [
      {
        nombre: 'id_historias',
        campo: id_historias,
      },
      {
        nombre: 'fecha_grabacion',
        campo: fecha_grabacion,
      },
      {
        nombre: 'hora',
        campo: hora,
      },
      {
        nombre: 'profesional',
        campo: profesional,
      },
      {
        nombre: 'antecedentes',
        campo: antecedentes,
      },
      {
        nombre: 'sintomas',
        campo: sintomas,
      },
      {
        nombre: 'observaciones',
        campo: observaciones,
      },
      {
        nombre: 'diagnostico',
        campo: diagnostico,
      },
      {
        nombre: 'id_usuario',
        campo: id_usuario,
      },
      {
        nombre: 'id_formula',
        campo: id_formula,
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

    const existe_historia = await respuestaT_historias_mascotas.read_historiaid(
      id_historias
    );

    if (!existe_historia) {
      return res.status(400).json({
        ok: false,
        msg: `No existe la historia con id ${id_historias}`,
      });
    }

    const existe_cliente = await respuestaT_clientes.readT_clientes(req);

    if (!existe_cliente) {
      return res.status(400).json({
        ok: false,
        msg: `No existe el usuario con id ${id_usuario}`,
      });
    }

    const existe_mascota = await respuestaT_mascotas.obtenerMascotaPorId(
      id_mascotas
    );
    if (!existe_mascota) {
      return res.status(400).json({
        ok: false,
        msg: `No existe la mascota con id ${id_mascotas}`,
      });
    }

    const update_historial =
      await respuestaT_historias_mascotas.update_historial_clinico(
        id_historias,
        fecha_grabacion,
        hora,
        profesional,
        antecedentes,
        sintomas,
        observaciones,
        diagnostico,
        id_usuario,
        id_formula,
        id_mascotas
      );
    if (!update_historial) {
      res.status(400).json({
        code: -1,
        update_historial,
        msg: `error al actualizar historial`,
      });
    } else {
      res.json({
        ok: true,
        msg: `actualizacion realizada  exitosamente`,
        update_historial,
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

module.exports = { router };
