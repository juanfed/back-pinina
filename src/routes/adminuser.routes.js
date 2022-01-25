const router = require("express").Router();

const respuesT_empresaAdmin = require('../controllers/adminuser.controller');
const validarCampos = require("../utils/validateFields");
const {
  createAdminMessage,
  deleteAdminMessage
} = require("../utils/optionsEmail");

const sendEmail = require("../utils/email");

router.get("/admin/userBusiness", async (req, res) => {
  try {
    /**Se obtienen la respuesta T_usuario registrada en la tabla
     * "T_usuario" y se guarda el resultado de la consulta dentro
     * de la constante "T_usuario"
     */

    const adminUserBusiness =
      await respuesT_empresaAdmin.readgV_usuarios_empresa();

    /**Si la función retorna null, quiere decir
     * que ocurrión un error al selectG en los datos de la tabla T_usuario registrada
     */
    if (adminUserBusiness === null) {
      return res.status(400).json({
        code: -1,
        msg: `Aún no hay datos registrados relacionados con empresas.`,
      });
    }
    return res.status(200).json({
      code: 1,
      msg: "Se ha realizado la consulta satisfactoriamente.",
      adminUserBusiness,
    });
  } catch (err) {
    res.status(400).json({
      code: -1,
      msg: err.message,
    });
  }
});

router.post("/admin/userBusiness", async (req, res) => {
  try {
    //
    const adminUsuariosConEmpresas =
      await respuesT_empresaAdmin.readT_usuario_empresas(req);

    /**Si la función retorna null, quiere decir
     * que ocurrión un error al selectG en los datos de la tabla T_usuario registrada
     */
    if (adminUsuariosConEmpresas === null) {
      res.status(400).json({
        code: -1,
        msg: `Aún no hay datos T_usuarios_empresas registrados`,
      });
    } else {
      res.json({
        code: 1,
        msg: adminUsuariosConEmpresas,
      });
    }
  } catch (err) {
    res.status(400).json({
      code: -1,
      msg: err.message,
    });
  }
});

//===========================================
//SelectG los datos en T_modulos
//===========================================
router.get("/admin/modulesSearch", async (req, res) => {
  try {
    /**Se obtienen la respuesta T_usuario registrada en la tabla
     * "T_usuario" y se guarda el resultado de la consulta dentro
     * de la constante "T_usuario"
     */

    const profileModulosBusqueda =
      await respuesT_empresaAdmin.searchModulesProfile();

    /**Si la función retorna null, quiere decir
     * que ocurrión un error al selectG en los datos de la tabla T_usuario registrada
     */
    if (profileModulosBusqueda === null) {
      return res.status(400).json({
        code: -1,
        msg: `Aún no hay datos en T_modulos registrados `,
      });
    }
    return res.status(200).json({
      code: 1,
      msg: "Se ha realizado la consulta satisfactoriamente.",
      profileModulosBusqueda: profileModulosBusqueda,
    });
  } catch (err) {
    res.status(400).json({
      code: -1,
      msg: err.message,
    });
  }
});

//===========================================
//SelectG los datos en T_usuario
//===========================================
router.post("/admin/searchForDocument", async (req, res) => {
  try {
    //Se toman solo los campos necesarios que vienen en el body de la petición
    let { cedula, id_usuario } = req.body;

    const campos = [
      {
        nombre: "cedula",
        campo: cedula,
      },
      {
        nombre: "id_usuario",
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
    /**Se obtienen la respuesta T_usuario registrada en la tabla
     * "T_usuario" y se guarda el resultado de la consulta dentro
     * de la constante "T_usuario"
     */

    const searchForDocument = await respuesT_empresaAdmin.searchUserForDocument(
      cedula, id_usuario
    );

    /**Si la función retorna null, quiere decir
     * que ocurrión un error al selectG en los datos de la tabla T_usuario registrada
     */
    if (searchForDocument === null) {
      return res.status(400).json({
        code: -1,
        msg: `Aún no hay datos en T_usuarios registrados `,
      });
    }
    return res.status(200).json({
      code: 1,
      msg: "Se ha realizado la consulta satisfactoriamente.",
      searchForDocument: searchForDocument,
    });
  } catch (err) {
    res.status(400).json({
      code: -1,
      msg: err.message,
    });
  }
});

//===========================================
//SelectG los datos en T_usuario
//===========================================
router.post("/admin/searchForCorreo", async (req, res) => {
  try {
    //Se toman solo los campos necesarios que vienen en el body de la petición
    let { correo, id_usuario } = req.body;
    const campos = [
      {
        nombre: "correo",
        campo: correo,
      },
      {
        nombre: "id_usuario",
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
    /**Se obtienen la respuesta T_usuario registrada en la tabla
     * "T_usuario" y se guarda el resultado de la consulta dentro
     * de la constante "T_usuario"
     */

    const searchForCorreo = await respuesT_empresaAdmin.readT_usuarioCorreo(
      correo, id_usuario
    );

    /**Si la función retorna null, quiere decir
     * que ocurrión un error al selectG en los datos de la tabla T_usuario registrada
     */
    if (searchForCorreo === null) {
      return res.status(400).json({
        code: -1,
        msg: `Aún no hay datos en T_usuarios registrados `,
      });
    }
    return res.status(200).json({
      code: 1,
      msg: "Se ha realizado la consulta satisfactoriamente.",
      searchForCorreo: searchForCorreo,
    });
  } catch (err) {
    res.status(400).json({
      code: -1,
      msg: err.message,
    });
  }
});

//===========================================
//Insert los datos en T_usuario_modulos
//===========================================
router.post("/admin/createUserModules", async (req, res) => {
  try {
    //Se toman solo los campos necesarios que vienen en el body de la petición
    let { id_usuario, id_modulo, id_empresa, t_adm, t_restri } = req.body;
    const campos = [
      {
        nombre: "id_usuario",
        campo: id_usuario,
      },
      {
        nombre: "id_modulo",
        campo: id_modulo,
      },
      {
        nombre: "id_empresa",
        campo: id_empresa,
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
    /**Se obtienen la respuesta T_usuario registrada en la tabla
     * "T_usuario" y se guarda el resultado de la consulta dentro
     * de la constante "T_usuario"
     */

    const createUserModules = await respuesT_empresaAdmin.createUserModule(req);

    /**Si la función retorna null, quiere decir
     * que ocurrión un error al selectG en los datos de la tabla T_usuario registrada
     */
    if (createUserModules.rest != 1) {
      return res.status(400).json({
        code: -1,
        msg: createUserModules.respuesta,
      });
    } else {
      const usuario_modulo = await respuesT_empresaAdmin.readT_usuario_modulos_correo(
        id_usuario,
        id_empresa,
        id_modulo
      );

      function permisos() {
        let html_permisos = '';
        for (const [i, value] of usuario_modulo.modulos.entries()) {
          let color = "#bfffa6";
          if (usuario_modulo.permisos[i] === "Restringido"){
            color = "#ffb2b2"
          }
          html_permisos += `
            <tr>
              <td align="center" valign="top">
                <div style="border: 0px solid #000; border-radius: 25px; background-color: #f4ff84;color:404040;padding:0.4rem;">
                <b>${value}</b></div>
              </td>
              <td align="center" valign="top">
                <div style="border: 0px solid #000; border-radius: 25px; background-color: ${color};color:404040;padding:0.4rem;">
                Permiso ${usuario_modulo.permisos[i]}</div>
              </td>
            </tr>`;
        }
        return html_permisos;
      };
      
      const optionsEmail = createAdminMessage({
        permisos: permisos(),
        primer_nombre: usuario_modulo.primer_nombre,
        primer_apellido: usuario_modulo.primer_apellido,
        identificacion: usuario_modulo.identificacion,
        razon_social: usuario_modulo.razon,
        tipo_documento: usuario_modulo.tipo_documento,
        nit: usuario_modulo.nit
      });
      
      res.status(200).json({
        code: 1,
        msg: createUserModules.respuesta,
      });

      // Enviar el email al usuario notificando la novedad
      await sendEmail(usuario_modulo.correo, optionsEmail);
    }
  } catch (err) {
    res.status(400).json({
      code: -1,
      msg: err.message,
    });
  }
});

//===========================================
//Insert los datos en T_usuario_modulos
//===========================================
router.post("/admin/createUserBusiness", async (req, res) => {
  try {
    //Se toman solo los campos necesarios que vienen en el body de la petición
    let { id_usuario, id_empresa, t_adm, t_restri } = req.body;
    const campos = [
      {
        nombre: "id_usuario",
        campo: id_usuario,
      },
      {
        nombre: "id_empresa",
        campo: id_empresa,
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
    /**Se obtienen la respuesta T_usuario registrada en la tabla
     * "T_usuario" y se guarda el resultado de la consulta dentro
     * de la constante "T_usuario"
     */

    const createUserBusiness = await respuesT_empresaAdmin.createUserBusiness(
      req
    );

    /**Si la función retorna null, quiere decir
     * que ocurrión un error al selectG en los datos de la tabla T_usuario registrada
     */
    if (createUserBusiness.rest != 1) {
      return res.status(400).json({
        code: -1,
        msg: createUserBusiness.respuesta,
      });
    } else {
      const usuario_empresa = await respuesT_empresaAdmin.readT_usuario_empresas_correo(id_usuario, id_empresa);
      
      let permisos;
      let color = "#bfffa6";

      if (usuario_empresa.permisos === "Restringido"){
        color = "#ffb2b2"
      }
      permisos = `
        <tr>
          <td align="center" valign="top">
            <div style="border: 0px solid #000; border-radius: 25px; background-color: #f4ff84;color:404040;padding:0.4rem;">
            <b>Administrador</b></div>
          </td>
          <td align="center" valign="top">
            <div style="border: 0px solid #000; border-radius: 25px; background-color: ${color};color:404040;padding:0.4rem;">
            Permiso ${usuario_empresa.permisos}</div>
          </td>
        </tr>`;
      
      const optionsEmail = createAdminMessage({
        permisos: permisos,
        primer_nombre: usuario_empresa.primer_nombre,
        primer_apellido: usuario_empresa.primer_apellido,
        identificacion: usuario_empresa.identificacion,
        razon_social: usuario_empresa.razon,
        tipo_documento: usuario_empresa.tipo_documento,
        nit: usuario_empresa.nit
      });

      res.status(200).json({
        code: 1,
        msg: createUserBusiness,
      });

      // Enviar el email al usuario notificando la novedad
      await sendEmail(usuario_empresa.correo, optionsEmail);
    }
  } catch (err) {
    res.status(400).json({
      code: -1,
      msg: err.message,
    });
  }
});

router.post("/remove/userBusiness", async (req, res) => {
  try {
    //Se toman solo los campos necesarios que vienen en el body de la petición
    let { id } = req.body;
    const campos = [
      {
        nombre: "id",
        campo: id,
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
    
    /**
       * se elimina la empresa registrada en la tabla
       * "t_usuario_empresas"
       */
    const usuario_empresa_eliminado = await respuesT_empresaAdmin.deleteT_usuario_empresas(req);
    /**
     * Si la función retorna null, quiere decir
     * que ocurrión un error al eliminar la empresa en tabla t_usuario_empresas
     */
    if (!usuario_empresa_eliminado) {
      return res.status(500).json({
        code: -1,
        msg: `No se eliminó la empresa en t_usuario_empresas porque no existe`,
      });
    } else {
      let permisos;
      let color = "#bfffa6";

      if (usuario_empresa_eliminado.permisos === "Restringido"){
        color = "#ffb2b2"
      }
      permisos = `
        <tr>
          <td align="center" valign="top">
            <div style="border: 0px solid #000; border-radius: 25px; background-color: #f4ff84;color:404040;padding:0.4rem;">
            <b>Administrador</b></div>
          </td>
          <td align="center" valign="top">
            <div style="border: 0px solid #000; border-radius: 25px; background-color: ${color};color:404040;padding:0.4rem;">
            Permiso ${usuario_empresa_eliminado.permisos}</div>
          </td>
        </tr>`;

      const optionsEmail = deleteAdminMessage({
        permisos: permisos,
        primer_nombre: usuario_empresa_eliminado.primer_nombre,
        primer_apellido: usuario_empresa_eliminado.primer_apellido,
        identificacion: usuario_empresa_eliminado.identificacion,
        razon_social: usuario_empresa_eliminado.razon,
        tipo_documento: usuario_empresa_eliminado.tipo_documento,
        nit: usuario_empresa_eliminado.nit
      });

      res.status(200).json({
        code: 1,
        msg: "Se ha eliminado la empresa del usuario exitosamente",
      });

      // Enviar el email al usuario notificando la novedad
      await sendEmail(usuario_empresa_eliminado.correo, optionsEmail);
    }
  } catch (err) {
    res.status(500).json({
      code: -1,
      error: err.message,
    });
  }
});

router.post("/remove/profile", async (req, res) => {
  try {
    //Se toman solo los campos necesarios que vienen en el body de la petición
    let { id } = req.body;
    const campos = [
      {
        nombre: "id",
        campo: id,
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
    /**
     * se elimina la empresa registrada en la tabla
     * "t_usuario_modulos"
     */
    const usuario_modulo_eliminado = await respuesT_empresaAdmin.deleteT_usuario_modulos(req);

    /**
     * Si la función retorna null, quiere decir
     * que ocurrión un error al eliminar el modulo de usuario en tabla t_usuario_modulos
     */
    if (!usuario_modulo_eliminado) {
      return res.status(500).json({
        code: -1,
        msg: `No se eliminó el modulo del usuario de t_usuario_modulos porque no existe`,
      });
    } else {
      function permisos() {
        let html_permisos = '';
        for (const [i, value] of usuario_modulo_eliminado.modulos.entries()) {
          let color = "#bfffa6";
          if (usuario_modulo_eliminado.permisos[i] === "Restringido"){
            color = "#ffb2b2"
          }
          html_permisos += `
            <tr>
              <td align="center" valign="top">
                <div style="border: 0px solid #000; border-radius: 25px; background-color: #f4ff84;color:404040;padding:0.4rem;">
                <b>${value}</b></div>
              </td>
              <td align="center" valign="top">
                <div style="border: 0px solid #000; border-radius: 25px; background-color: ${color};color:404040;padding:0.4rem;">
                Permiso ${usuario_modulo_eliminado.permisos[i]}</div>
              </td>
            </tr>`;
        }
        return html_permisos;
      };

      const optionsEmail = deleteAdminMessage({
        permisos: permisos(),
        primer_nombre: usuario_modulo_eliminado.primer_nombre,
        primer_apellido: usuario_modulo_eliminado.primer_apellido,
        identificacion: usuario_modulo_eliminado.identificacion,
        razon_social: usuario_modulo_eliminado.razon,
        tipo_documento: usuario_modulo_eliminado.tipo_documento,
        nit: usuario_modulo_eliminado.nit
      });
      
      res.status(200).json({
        code: 1,
        msg: "Se ha eliminado el modulo del usuario exitosamente",
      });

      // Enviar el email al usuario notificando la novedad
      await sendEmail(usuario_modulo_eliminado.correo, optionsEmail);
    }
  } catch (err) {
    res.status(500).json({
      code: -1,
      error: err.message,
    });
  }
});

router.post("/remove/profile_all", async (req, res) => {
  try {
    //Se toman solo los campos necesarios que vienen en el body de la petición
    let { id_usuario, id_empresa } = req.body;
    const campos = [
      {
        nombre: "id_usuario",
        campo: id_usuario,
      },
      {
        nombre: "id_empresa",
        campo: id_empresa,
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
    /**
     * se elimina la empresa registrada en la tabla
     * "t_usuario_modulos"
     */
    const usuario_modulo_eliminado = await respuesT_empresaAdmin.deleteT_usuario_modulos_all(req);

    /**
     * Si la función retorna null, quiere decir
     * que ocurrión un error al eliminar el modulo de usuario en tabla t_usuario_modulos
     */
    if (!usuario_modulo_eliminado) {
      return res.status(500).json({
        code: -1,
        msg: `No se eliminó el modulo del usuario de t_usuario_modulos porque no existe`,
      });
    } else {
      function permisos() {
        let html_permisos = '';
        for (const [i, value] of usuario_modulo_eliminado.modulos.entries()) {
          let color = "#bfffa6";
          if (usuario_modulo_eliminado.permisos[i] === "Restringido"){
            color = "#ffb2b2"
          }
          html_permisos += `
            <tr>
              <td align="center" valign="top">
                <div style="border: 0px solid #000; border-radius: 25px; background-color: #f4ff84;color:404040;padding:0.4rem;">
                <b>${value}</b></div>
              </td>
              <td align="center" valign="top">
                <div style="border: 0px solid #000; border-radius: 25px; background-color: ${color};color:404040;padding:0.4rem;">
                Permiso ${usuario_modulo_eliminado.permisos[i]}</div>
              </td>
            </tr>`;
        }
        return html_permisos;
      };

      const optionsEmail = deleteAdminMessage({
        permisos: permisos(),
        primer_nombre: usuario_modulo_eliminado.primer_nombre,
        primer_apellido: usuario_modulo_eliminado.primer_apellido,
        identificacion: usuario_modulo_eliminado.identificacion,
        razon_social: usuario_modulo_eliminado.razon,
        tipo_documento: usuario_modulo_eliminado.tipo_documento,
        nit: usuario_modulo_eliminado.nit
      });
      
      res.status(200).json({
        code: 1,
        msg: "Se ha eliminado los modulos del usuario exitosamente",
      });

      // Enviar el email al usuario notificando la novedad
      await sendEmail(usuario_modulo_eliminado.correo, optionsEmail);
    }
  } catch (err) {
    res.status(500).json({
      code: -1,
      error: err.message,
    });
  }
});

router.get("/admin/reasonSocial", async (req, res) => {
  try {
    /**Se obtienen la respuesta T_usuario registrada en la tabla
     * "T_usuario" y se guarda el resultado de la consulta dentro
     * de la constante "T_usuario"
     */

    const adminRazonSocial =
      await respuesT_empresaAdmin.readgV_razon_social();

    /**Si la función retorna null, quiere decir
     * que ocurrión un error al selectG en los datos de la tabla T_usuario registrada
     */
    if (adminRazonSocial === null) {
      return res.status(400).json({
        code: -1,
        msg: `Aún no hay datos registrados de empresas.`,
      });
    }
    return res.status(200).json({
      code: 1,
      msg: "Se ha realizado la consulta satisfactoriamente.",
      adminRazonSocial: adminRazonSocial,
    });
  } catch (error) {
    res.status(400).json({
      code: -1,
      msg: error.message,
    });
  }
});


router.get("/admin/userProfile", async (req, res) => {
  try {
    /**Se obtienen la respuesta T_usuario registrada en la tabla
     * "T_usuario" y se guarda el resultado de la consulta dentro
     * de la constante "T_usuario"
     */

    const adminUserProfile =
      await respuesT_empresaAdmin.readgV_usuarios_perfiles();

    /**Si la función retorna null, quiere decir
     * que ocurrión un error al selectG en los datos de la tabla T_usuario registrada
     */
    if (adminUserProfile === null) {
      return res.status(400).json({
        code: -1,
        msg: `Aún no hay datos registrados relacionados con empresas.`,
      });
    }
    return res.status(200).json({
      code: 1,
      msg: "Se ha realizado la consulta satisfactoriamente.",
      adminUserProfile: adminUserProfile,
    });
  } catch (err) {
    res.status(400).json({
      code: -1,
      msg: err.message,
    });
  }
});

router.get("/admin/userModules", async (req, res) => {
  try {
    /**Se obtienen la respuesta T_usuario registrada en la tabla
     * "T_usuario" y se guarda el resultado de la consulta dentro
     * de la constante "T_usuario"
     */

    const adminUserModules =
      await respuesT_empresaAdmin.readgV_usuarios_modulos();

    /**Si la función retorna null, quiere decir
     * que ocurrión un error al selectG en los datos de la tabla T_usuario registrada
     */
    if (adminUserModules === null) {
      return res.status(400).json({
        code: -1,
        msg: `Aún no hay datos registrados en modulos.`,
      });
    }
    return res.status(200).json({
      code: 1,
      msg: "Se ha realizado la consulta satisfactoriamente.",
      adminUserModules,
    });
  } catch (err) {
    res.status(400).json({
      code: -1,
      msg: err.message,
    });
  }
});

router.post("/admin/userModules", async (req, res) => {
  try {
    /**Se obtienen la respuesta T_usuario registrada en la tabla
     * "T_usuario" y se guarda el resultado de la consulta dentro
     * de la constante "T_usuario"
     */

    const profileUsuarioModulo =
      await respuesT_empresaAdmin.readT_usuario_modulos(req);

    /**Si la función retorna null, quiere decir
     * que ocurrión un error al selectG en los datos de la tabla T_usuario registrada
     */
    if (profileUsuarioModulo === null) {
      return res.status(400).json({
        code: -1,
        msg: `Aún no hay datos de modulos registrados relacionados con su empresa.`,
      });
    }
    return res.status(200).json({
      code: 1,
      msg: "Se ha realizado la consulta satisfactoriamente.",
      profileUsuarioModulo: profileUsuarioModulo,
    });
  } catch (err) {
    res.status(400).json({
      code: -1,
      msg: err.message,
    });
  }
});

router.post("/admin/userConex", async (req, res) => {
  try {
    //Se toman solo los campos necesarios que vienen en el body de la petición
    let { id_usuario } = req.body;
    const campos = [
      {
        nombre: "id_usuario",
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
    /**Se obtienen la respuesta T_usuario registrada en la tabla
     * "T_usuario" y se guarda el resultado de la consulta dentro
     * de la constante "T_usuario"
     */

    const adminUserConex = await respuesT_empresaAdmin.readgV_usuarios_conex(id_usuario);

    /**Si la función retorna null, quiere decir
     * que ocurrión un error al selectG en los datos de la tabla T_usuario registrada
     */
    if (adminUserConex === null) {
      return res.status(400).json({
        code: -1,
        msg: `Aún no hay datos registrados del usuario`,
      });
    }
    return res.status(200).json({
      code: 1,
      msg: "Se ha realizado la consulta satisfactoriamente.",
      adminUserConex: adminUserConex,
    });
  } catch (err) {
    res.status(400).json({
      code: -1,
      msg: err.message,
    });
  }
});

router.post("/admin/ownerBusiness", async (req, res) => {
  try {
    //Se toman solo los campos necesarios que vienen en el body de la petición
    let { id_usuario } = req.body;
    const campos = [
      {
        nombre: "id_usuario",
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

    /**Se obtienen la respuesta T_usuario registrada en la tabla
     * "T_usuario" y se guarda el resultado de la consulta dentro 
     * de la constante "T_usuario"
     */

    const searchOwnerBusiness= await respuesT_empresaAdmin.readOwnerBusiness(
      req
    );

    /**Si la función retorna null, quiere decir
     * que ocurrión un error al selectG en los datos de la tabla T_usuario registrada
     */
    if (searchOwnerBusiness === null) {
      return res.status(400).json({
        code: -1,
        msg: `No hay ninguna empresa relacionada a este id.`,
      });
    }
    return res.status(200).json({
      code: 1,
      msg: "Se ha realizado la consulta satisfactoriamente.",
      searchOwnerBusiness,
    });
  } catch (err) {
    res.status(400).json({
      code: -1,
      msg: err.message,
    });
  }
});

module.exports = router;