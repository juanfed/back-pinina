const router = require("express").Router();
const validateFields = require("../utils/validateFields");
const respuesLoginCliente = require('../controllers/loginClientes.controller');
const tokenController = require("../controllers/tokenClientes.controller");

router.post('/loginClientes', async(req, res) => {

    try {
        
        const { correo, password } = req.body;

        const campos = [
            {
                nombre: "Correo",
                campo: correo
            },
            {
                nombre: "Password",
                campo: password
            }
        ];

        const camposVacios = validateFields(campos);

        if (camposVacios) {
            return res.status(400).json({
                code: -1,
                msg: `No ha ingresado el campo ${camposVacios.nombre}`,
            });
        }

        const clienteLogueado = await respuesLoginCliente.readT_clientesLogin(req);

        if (clienteLogueado) {

            const tokenGenerado = await tokenController.generarToken(clienteLogueado);

            const cliente = {
                id_clientes: clienteLogueado.id_clientes,
                tokenGenerado
            }

            return res.status(200).json({
                code: 1,
                msg: `El usuario se logueo exitosamente!`,
                cliente
            });

        } else {
            return res.status(400).json({
                code: -1,
                msg: `El correo o contraseña son incorrectas!`
            });
        }

    } catch (error) {
        
        console.log(error);
        return res.status(500).json({
            code: -1,
            error: `Error al loguearse el cliente ${error}`
        });

    }

});

module.exports = router;