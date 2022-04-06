const router = require("express").Router();
const respuestaT_fotos = require('../controllers/publicacionesFotos.controller')

router.get('/mostrarfotos', async(req, res) => {

    try {
        if(!req.body.id_publicacion){
            return res.status(400).json({
                code: -1,
                msg: `No envio el parametro id_publicacion`
            })
        }
        
        const fotos = await respuestaT_fotos.mostrarFotos(req);

        if (!fotos) {
            return res.status(400).json({
                code: -1,
                msg: `No existen fotos en la publicacion!`
            });
        } else {
            return res.status(200).json({
                code: 1,
                msg: `Consulta a fotos exitosamente!`,
                fotos
            });
        }

    } catch (error) {
        
        console.log(error);
        return res.status(500).json({
            code: -1,
            error: `Error al consultar foto ${error}`
        });

    }

});

module.exports = router;