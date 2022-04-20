const router = require("express").Router();

const respuestaLoginT_usuario = require('../controllers/login.controller');
const respuestaAdmin = require("../controllers/adminuser.controller");
const tokenController = require("../controllers/token.controller");
//===========================================
//Insertar los datos en t_usuario
//===========================================


router.post("/login/loginPinina", async (req, res) => {
    try {
        let { correo, password } = req.body;

        const campos = [{
            nombre: 'correo',
            campo: correo
        }, {
            nombre: 'password',
            campo: password
        }
        ];
        /**Se busca en el array si alguno de los campos no fue enviado,
         * en caso de que se encuentre algún campo vacio se guarda el 
         * elemento encontrado dentro de la constante llamada "campoVacio"
         */
        const campoVacio = campos.find(x => !x.campo);

        /**Si alguno de los campos NO fue enviado en la petición
         * se le muestra al cliente el nombre del campo que falta
         */
        if (campoVacio)
            res.status(400).json({
                code: -2,
                msg: `No ha ingresado el campo ${campoVacio.nombre}`
            });
        /**Se obtienen la respuesta T_usuario registrada en la tabla
         * "T_usuario" y se guarda el resultado de la consulta dentro
         * de la constante "T_usuario"
         */
        const readT_usuario = await respuestaLoginT_usuario.readT_usuarioLogin(req);

        /**Si la función retorna null, quiere decir
         * que ocurrión un error al guardar los datos en la tabla  T_usuario registrada
         */
        if (!readT_usuario) {
            res.status(400).json({
                code: -1,
                msg: `Esa información no está en nuestra base de datos`
            });
        } else {
            const empresaUsuario = await respuestaAdmin.readT_empresa_usuario(readT_usuario.id);
            const tokenGenerado = await tokenController.generarToken(readT_usuario);

            const user = {
                ...readT_usuario,
                ...empresaUsuario,
                tokenGenerado
            }

            res.status(200).json({
                code: 1,
                msg: `Bienvenido a Pinina`,
                user: user
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