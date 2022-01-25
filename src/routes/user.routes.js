const router = require("express").Router();

const respuestaCreateT_usuario = require('../controllers/user.controller');
const tokenController = require('../controllers/token.controller'); // controladores token
const validarCampos = require("../utils/validateFields");
const { registerMailMessage } = require("../utils/optionsEmail");
const sendEmail = require("../utils/email");

//===========================================
//Insertar los datos en t_usuario
//===========================================
router.post("/register/mail", async(req, res) => {
    try {
        //Se toman solo los campos necesarios que vienen en el body de la petición
        let { segundo_nombre, segundo_apellido, origen_cuenta, codigo_ubicacion_geografica, telefono, firewall, token } = req.body;
        /**Se guardan todos los campos recibidos en el body
         * de la petición dentro de un array
         */

        const campos = [
            {
                nombre: "origen_cuenta",
                campo: origen_cuenta,
            },
            {
                nombre: "codigo_ubicacion_geografica",
                campo: codigo_ubicacion_geografica,
            },
            {
                nombre: "token",
                campo: token,
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

        let dbUser = null;
        
        if(origen_cuenta === 2){
            //
            const usuarioGoogleToken = await tokenController.decodificarToken(token); // retorna el payloy con todos los datos de google
            //
            dbUser = await respuestaCreateT_usuario.readT_usuarioCorreo(usuarioGoogleToken.email);
            //
            if(dbUser !== null && dbUser.origen_cuenta !== 2){
                return res.status(400).json({
                    code: -1,
                    msg: `Usuario ya registrado, autenticar con Gmail`
                });
            }

            if (dbUser === null) {
                let google = {
                    correo: usuarioGoogleToken.email,
                    origen_cuenta: origen_cuenta,
                    codigo_ubicacion_geografica: codigo_ubicacion_geografica,
                    primer_nombre: usuarioGoogleToken.given_name,
                    segundo_nombre: segundo_nombre,
                    primer_apellido: usuarioGoogleToken.family_name,
                    segundo_apellido: segundo_apellido,
                };

                const createT_usuarioGoogle = await respuestaCreateT_usuario.createT_usuario_mail(google);

                if (createT_usuarioGoogle.respuesta.rest != 1) {
                    res.status(400).json({
                        code: -1,
                        msg: `Ocurrió un error al registrar el usuario`
                    });
                } else {
                    const user = {
                        correo: usuarioGoogleToken.email,
                        password_temporal: createT_usuarioGoogle.password_temp
                    };

                    // Opciones del mensaje de registro
                    const optionsEmail = registerMailMessage({
                        correo: usuarioGoogleToken.email,
                        password_temporal: createT_usuarioGoogle.password_temp,
                        primer_nombre: usuarioGoogleToken.given_name,
                        primer_apellido: usuarioGoogleToken.family_name,
                    });

                    // Enviar el email al usuario con el codigo
                    await sendEmail(usuarioGoogleToken.email, optionsEmail);
                    
                    res.status(200).json({
                        code: 1,
                        msg: createT_usuarioGoogle.respuesta.respuesta,
                        user,
                    });
                }
            }
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