const router = require('express').Router();

const readGCountries = require('../controllers/ubicacionesGeograficas.controllers');
const validarCampos = require("../utils/validateFields");

//===========================================
//Mostrar todos los paises
//===========================================

router.get('/obtenerdepartamentos', async (req, res) => {
  try {
    const departamentos = await readGCountries.obtenerTodos();
    if (departamentos === null) {
      res.status(500).json({
        code: -1,
        msg: `No hay departamentos`,
      });
    } else {
      res.json({
        ok: true,
        msg: 'departamentos',
        departamentos,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: -1,
      error: error.message,
    });
  }
});

router.post('/obtenermunicipio', async (req, res) => {
  try {
    const { id_unde } = req.body;

    const campos = [
      {
        nombre: 'id_unde',
        campo: id_unde,
      },
    ];

    const campoVacio = campos.find((x) => !x.campo);

    if (campoVacio) {
      return res.status(400).json({
        ok: false,
        msg: `No ha ingresado el campo ${campoVacio.nombre}`,
      });
    }
    const municipio = await readGCountries.obtenerPorIdUndeMunicipio(id_unde);

    if (municipio === null) {
      res.status(500).json({
        code: -1,
        msg: `No existe este municipio`,
      });
    } else {
      res.json({
        ok: true,
        msg: 'Municipio',
        municipio,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: -1,
      error: error.message,
    });
  }
});

router.get('/register/paises', async (req, res) => {
  try {
    /**Se obtienen todos los paises registrados en la tabla
     * "paises" y se guarda el resultado de la consulta dentro
     * de la constante "paises"
     */
    const paises = await readGCountries.readGCountries();

    /**Si la función retorna null, quiere decir
     * que no se encontraron paises registrados
     */
    if (paises === null) {
      res.status(500).json({
        code: -1,
        msg: `Aún no hay paises registrados`,
      });
    } else {
      res.json({
        msg: 'Pais',
        paises,
      });
    }
  } catch (err) {
    res.status(500).json({
      code: -1,
      error: err.message,
    });
  }
});

router.post('/mostrardepartamentos', async (req, res) => {
  try {
    const { id_codigo } = req.body;

    const campos = [
      {
        nombre: "id_codigo",
        campo: id_codigo,
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

    const departamentos = await readGCountries.read_departamentos(id_codigo);

    if (departamentos === null) {
      res.status(400).json({
        code: -1,
        msg: `No hay departamentos`,
      });
    } else {
      res.json({
        ok: true,
        msg: 'departamentos',
        departamentos,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: -1,
      error: error.message,
    });
  }
});

router.post('/mostrarmunicipios', async (req, res) => {
  try {
    const { id_codigo } = req.body;

    const campos = [
      {
        nombre: "id_codigo",
        campo: id_codigo,
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

    const municipios = await readGCountries.read_municipios(id_codigo);

    if (municipios === null) {
      res.status(400).json({
        code: -1,
        msg: `No hay municipios`,
      });
    } else {
      res.json({
        ok: true,
        msg: 'municipios',
        municipios,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: -1,
      error: error.message,
    });
  }
});

module.exports = router;
