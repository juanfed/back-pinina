const router = require("express").Router();
const responseT_code = require("../controllers/codeuser.controller");
const { readT_usuarioLogin } = require('../controllers/login.controller');
const validarCampos = require("../utils/validateFields");
const {
  codeRegisterMessage,
  codePasswordMessage,
  changePasswordMessage,
  changeEmailMessage
} = require("../utils/optionsEmail");

const sendEmail = require("../utils/email");
const moment = require("moment");

router.post("/generate-code-register", async (req, res) => {
  try {
    const {
      correo,
      nombres,
      apellidos,
      telefono,
      firewall,
      ubicacion,
    } = req.body;

    const campos = [
      {
        nombre: "correo",
        campo: correo,
      },
      {
        nombre: "nombres",
        campo: nombres,
      },
      {
        nombre: "apellidos",
        campo: apellidos,
      },
      /* {
        nombre: "telefono",
        campo: telefono,
      },
      {
        nombre: "firewall",
        campo: firewall,
      }, */
      {
        nombre: "ubicacion",
        campo: ubicacion,
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

    req.body.primer_nombre = nombres.split(' ')[0];
    req.body.segundo_nombre = nombres.split(' ')[1];

    req.body.primer_apellido = apellidos.split(' ')[0];
    req.body.segundo_apellido = apellidos.split(' ')[1];

    // Crear codigo de registro de usuario
    const codeRegister = await responseT_code.createT_code_register(req);

    // Si existe un error asociado al crear el codigo del usuario
    if (codeRegister.rest == 2) {
      return res.status(404).json({
        code: codeRegister.rest,
        msg: codeRegister.respuesta,
      });
    }

    // Opciones del mensaje de registro
    const optionsEmail = codeRegisterMessage({
      codigo: codeRegister.codigo_verificacion,
      primer_nombre: req.body.primer_nombre,
      primer_apellido: req.body.primer_apellido,
    });

    // Enviar el email al usuario con el codigo
    await sendEmail(correo, optionsEmail);

    // Operacion de generacion y envio de codigo exitosas
    res.status(200).json({
      code: codeRegister.rest,
      msg: codeRegister.respuesta,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: -1,
      msg: "Ha ocurrido un error al intentar generar un codigo de registro",
    });
  }
});

// Verificar el codigo
router.post("/verify-code-register", async (req, res) => {
  try {
    const {
      codigo,
      correo,
      nombres,
      apellidos,
      telefono,
      ubicacion,
      password,
      firewall,
    } = req.body;

    const campos = [
      {
        nombre: "correo",
        campo: correo,
      },
      {
        nombre: "nombres",
        campo: nombres,
      },
      {
        nombre: "apellidos",
        campo: apellidos,
      },
      {
        nombre: "password",
        campo: password,
      },
      /* {
        nombre: "telefono",
        campo: telefono,
      }, */
      {
        nombre: "codigo",
        campo: codigo,
      },
      // {
      //   nombre: "firewall",
      //   campo: firewall,
      // },
      {
        nombre: "ubicacion",
        campo: ubicacion,
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

    req.body.primer_nombre = nombres.split(' ')[0];
    req.body.segundo_nombre = nombres.split(' ')[1];

    req.body.primer_apellido = apellidos.split(' ')[0];
    req.body.segundo_apellido = apellidos.split(' ')[1];
    
    // Verificar que no se el tiempo de expiración del codigo
    const usuarioCodigo = await responseT_code.readT_usuario_codigo(req);

    if (!usuarioCodigo) {
      return res.status(404).send({
        code: -1,
        error: `El codigo ${codigo} no está activo`,
      });
    }

    // Obtener diferencia de fechas
    let genDate = moment(usuarioCodigo.fecha_codigo_gen); // obtener fecha de generacion de codigo
    let nowDate = moment();

    let dateDiff = moment.duration(nowDate.diff(genDate)).asMinutes();

    // verificiar  si el codigo generado ha vencido
    if (dateDiff > Number(process.env.EXPIRE_CODE)) {
      return res.status(400).send({
        code: -1,
        error: `El codigo ${codigo} ha expirado, intente generar un nuevo codigo`,
      });
    }

    // Verificar codigo de recuperación de contraseña
    const verifyRegister = await responseT_code.createT_user_veri(req);

    // Si existe un error asociado al momento de verificar el codigo
    if (verifyRegister.rest == 2) {
      return res.status(401).json({
        code: verifyRegister.rest,
        msg: verifyRegister.respuesta,
      });
    }
    // la validacion es exitosa
    res.status(200).json({
      code: verifyRegister.rest,
      msg: verifyRegister.respuesta,
    });
  } catch (error) {
    res.status(500).json({
      code: -1,
      msg: "Ha ocurrido un error al intentar verificar un codigo de registro"
    });
  }
});

router.post("/generate-code-password", async (req, res) => {
  try {
    const { correo, firewall } = req.body;

    const campos = [
      {
        nombre: "correo",
        campo: correo,
      },
      // {
      //   nombre: "firewall",
      //   campo: firewall,
      // },
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

    // Crear codigo de registro de usuario
    const codePassword = await responseT_code.createT_code_password(req);

    // Si existe un error asociado al crear codigo de recuperacion de contraseña
    if (codePassword.rest == 2) {
      return res.status(404).json({
        code: codePassword.rest,
        msg: codePassword.respuesta,
      });
    }

    // Opciones del mensaje de recuperacion de contraseña
    const optionsEmail = codePasswordMessage({
      codigo: codePassword.codigo_verificacion,
      primer_nombre: codePassword.primer_nombre,
      primer_apellido: codePassword.primer_apellido,
    });

    // Enviar el email al usuario con el codigo
    await sendEmail(correo, optionsEmail);

    // Operaciones de generacion y envio de codigo para recuperacion de contraseña es exitoso
    res.status(200).json({
      code: codePassword.rest,
      id_usuario: codePassword.id_usuario,
      msg: codePassword.respuesta,
    });
  } catch (err) {
    res.status(500).json({
      code: -1,
      msg: "Ha ocurrido un error al intentar generar un codigo para recuperar contraseña",
      error: err.message
    });
  }
});

// Verificar el codigo
router.post("/verify-code-password", async (req, res) => {
  try {
    const { codigo, correo, firewall } = req.body;

    const campos = [
      {
        nombre: "correo",
        campo: correo,
      },

      {
        nombre: "codigo",
        campo: codigo,
      },
      // {
      //   nombre: "firewall",
      //   campo: firewall,
      // },
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

    // Verificar que no se el tiempo de expiración del codigo
    const usuarioCodigo = await responseT_code.readT_codigo_verificacion(req);

    if (!usuarioCodigo) {
      return res.status(404).send({
        code: -1,
        error: `El codigo ${codigo} no está activo`,
      });
    }

    // Obtener diferencia de fechas
    let genDate = moment(usuarioCodigo.fecha_codigo_gen); // obtener fecha de generacion de codigo
    let nowDate = moment();

    let dateDiff = moment.duration(nowDate.diff(genDate)).asMinutes();

    // verificiar  si el codigo generado ha vencido
    if (dateDiff > Number(process.env.EXPIRE_CODE)) {
      return res.status(400).send({
        code: -1,
        error: `El codigo ${codigo} ha expirado, intente generar un nuevo codigo`,
      });
    }

    // Verificar codigo de contraseña
    const verifyPassword = await responseT_code.password_user_veri(req);

    if (verifyPassword.rest == 2) {
      return res.status(401).json({
        code: verifyPassword.rest,
        msg: verifyPassword.respuesta,
      });
    }

    // La validacion del codigo es exitosa
    res.status(200).json({
      code: verifyPassword.rest,
      msg: verifyPassword.respuesta,
    });
  } catch (error) {
    res.status(500).json({
      code: -1,
      msg: "Ha ocurrido un error al intentar verificar un codigo de recuperación de contraseña",
    });
  }
});

router.patch("/update-password", async (req, res) => {
  const { id_usuario, password } = req.body;

  try {
    const campos = [
      {
        nombre: "id_usuario",
        campo: id_usuario,
      },
      {
        nombre: "password",
        campo: password,
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
    if (campoVacio) {
      return res.status(400).json({
        code: -2,
        msg: `No ha ingresado el campo ${campoVacio.nombre}`,
      });
    }
    // Actualizar contraseña de usuario
    const updatePassword = await responseT_code.update_usu_password(req);

    if (updatePassword.rest == 2) {
      return res.status(401).json({
        code: updatePassword.rest,
        msg: updatePassword.respuesta,
      });
    }

    // La contraseña se actualizo exitosamente
    res.status(200).json({
      code: updatePassword.rest,
      msg: updatePassword.respuesta,
    });
  } catch (err) {
    res.status(500).json({
      code: -1,
      msg: "Hubo un error al cambiar la contraseña",
    });
  }
});

router.put("/update-user-info", async (req, res) => {
  try {
    const {
      id_usuario,
      nombres,
      apellidos,
      telefono,
      ubicacion
    } = req.body;

    const campos = [
      {
        nombre: "id_usuario",
        campo: id_usuario,
      },
      {
        nombre: "nombres",
        campo: nombres,
      },
      {
        nombre: "apellidos",
        campo: apellidos,
      },
      /* {
        nombre: "telefono",
        campo: telefono,
      }, */
      {
        nombre: "ubicacion",
        campo: ubicacion,
      }
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
      res.status(400).json({
      code: -2,
      msg: `No ha ingresado el campo ${campoVacio.nombre}`,
      });

    req.body.primer_nombre = nombres.split(' ')[0];
    req.body.segundo_nombre = nombres.split(' ')[1];

    req.body.primer_apellido = apellidos.split(' ')[0];
    req.body.segundo_apellido = apellidos.split(' ')[1];
    
    // Retorna usuario actualizado si se logró el proceso
    const usuarioActualizado = await responseT_code.update_usu(req);
    
    if (!usuarioActualizado) {
      res.status(400).json({
          code: -1,
          msg: `El usuario no se encuentra`
      });
    } else {
      res.status(200).json({
          code: 1,
          user: usuarioActualizado
      });
    }
    
  } catch (err) {
    res.status(500).json({
      code: -1,
      msg: "Ha ocurrido un error al intentar actualizar los datos del usuario",
    });
  }
});

router.post("/generate-modify-password", async (req, res) => {
  try {
    const { correo, password } = req.body;

    const campos = [
      {
        nombre: "correo",
        campo: correo,
      },
      {
        nombre: "password",
        campo: password,
      }
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
    
    // Traer información de usuario
    const usuario = await readT_usuarioLogin(req);
    
    // Valida si existe y las contraseñas coinciden
    if (!usuario) {
      return res.status(400).json({
        code: -1,
        msg: `Las contraseñas no coinciden`
      });
    }

    // Crear codigo de registro de usuario
    const codePassword = await responseT_code.createT_code_password(req);

    // Si existe un error asociado al crear codigo de cambio de contraseña
    if (codePassword.rest == 2) {
      return res.status(404).json({
        code: codePassword.rest,
        msg: codePassword.respuesta,
      });
    }

    // Opciones del mensaje de cambio de contraseña
    const optionsEmail = changePasswordMessage({
      codigo: codePassword.codigo_verificacion,
      primer_nombre: codePassword.primer_nombre,
      primer_apellido: codePassword.primer_apellido,
    });

    // Enviar el email al usuario con el codigo
    await sendEmail(correo, optionsEmail);

    // Operaciones de generacion y envio de codigo para cambio de contraseña es exitoso
    res.status(200).json({
      code: codePassword.rest,
      id_usuario: codePassword.id_usuario,
      msg: codePassword.respuesta,
    });
  } catch (err) {
      res.status(500).json({
        code: -1,
        msg: "Ha ocurrido un error al intentar generar un codigo para cambiar contraseña",
        error: err.message
      });
  }
});

router.post("/generate-code-email", async (req, res) => {
  try {
    const { correo } = req.body;

    const campos = [
      {
        nombre: "correo",
        campo: correo,
      }
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

    // Crear codigo de cambio de correo de usuario
    const codeEmail = await responseT_code.createT_code_password(req);

    // Si existe un error asociado al crear codigo de cambio de correo
    if (codeEmail.rest == 2) {
      return res.status(404).json({
        code: codeEmail.rest,
        msg: codeEmail.respuesta,
      });
    }

    // Opciones del mensaje de cambio de correo
    const optionsEmail = changeEmailMessage({
      codigo: codeEmail.codigo_verificacion,
      primer_nombre: codeEmail.primer_nombre,
      primer_apellido: codeEmail.primer_apellido,
    });

    // Enviar el email al usuario con el codigo
    await sendEmail(correo, optionsEmail);

    // Operaciones de generacion y envio de codigo para cambio de correo es exitoso
    res.status(200).json({
      code: codeEmail.rest,
      id_usuario: codeEmail.id_usuario,
      msg: codeEmail.respuesta,
    });
  } catch (err) {
      res.status(500).json({
        code: -1,
        msg: "Ha ocurrido un error al intentar generar un codigo para cambiar correo",
        error: err.message
      });
  }
});

router.post("/verify-code-email", async (req, res) => {
  try {
    const { codigo, correo } = req.body;

    const campos = [
      {
        nombre: "correo",
        campo: correo,
      },
      {
        nombre: "codigo",
        campo: codigo,
      }
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

    // Verificar que no se el tiempo de expiración del codigo
    const usuarioCodigo = await responseT_code.readT_codigo_verificacion(req);

    if (!usuarioCodigo) {
      return res.status(404).send({
        code: -1,
        error: `El codigo ${codigo} no está activo`,
      });
    }

    // Obtener diferencia de fechas
    let genDate = moment(usuarioCodigo.fecha_codigo_gen); // obtener fecha de generacion de codigo
    let nowDate = moment();

    let dateDiff = moment.duration(nowDate.diff(genDate)).asMinutes();

    // verificiar  si el codigo generado ha vencido
    if (dateDiff > Number(process.env.EXPIRE_CODE)) {
      return res.status(400).send({
        code: -1,
        error: `El codigo ${codigo} ha expirado, intente generar un nuevo codigo`,
      });
    }

    // Verificar codigo de cambio de correo
    const verifyEmail = await responseT_code.password_user_veri(req);

    if (verifyEmail.rest == 2) {
      return res.status(401).json({
        code: verifyEmail.rest,
        msg: verifyEmail.respuesta,
      });
    }

    // La validacion del codigo es exitosa
    res.status(200).json({
      code: verifyEmail.rest,
      msg: verifyEmail.respuesta,
    });
  } catch (error) {
    res.status(500).json({
      code: -1,
      msg: "Ha ocurrido un error al intentar verificar el codigo de cambio de correo",
    });
  }
});

router.patch("/update-email", async (req, res) => {
  const { id_usuario, correo } = req.body;

  try {
    const campos = [
      {
        nombre: "id_usuario",
        campo: id_usuario,
      },
      {
        nombre: "correo",
        campo: correo,
      }
    ];
    /**Se busca en el array si alguno de los campos no fue enviado,
     * en caso de que se encuentre algún campo vacio se guarda el
     * elemento encontrado dentro de la constante llamada "campoVacio"
     */
    const campoVacio = validarCampos(campos);

    /**Si alguno de los campos NO fue enviado en la petición
     * se le muestra al cliente el nombre del campo que falta
     */
    if (campoVacio) {
      return res.status(400).json({
        code: -2,
        msg: `No ha ingresado el campo ${campoVacio.nombre}`,
      });
    }
    // Validar que el correo no exista en la base de datos
    const usuarioExiste = await responseT_code.readT_usuario(req);

    if (usuarioExiste) {
      return res.status(400).json({
        code: -1,
        error: 'El correo ingresado ya se encuentra registrado en el sitio',
      });
    }

    // Actualizar correo de usuario
    const updateEmail = await responseT_code.update_usu_email(req);
    
    if (updateEmail.rest == 2) {
      return res.status(401).json({
        code: updateEmail.rest,
        msg: updateEmail.respuesta,
      });
    }

    // El correo se actualizo exitosamente
    res.status(200).json({
      code: updateEmail.rest,
      msg: updateEmail.respuesta,
    });
  } catch (err) {
    res.status(500).json({
      code: -1,
      msg: "Hubo un error al cambiar el correo",
    });
  }
});

module.exports = router;
