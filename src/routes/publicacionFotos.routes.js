const router = require("express").Router();
const respuestaT_fotos = require('../controllers/publicacionesFotos.controller')

router.get('/mostrarfotos', async(req, res) => {

    try {
        if(!req.body.id_publicacion){
            res.status(400).json({
                code: -1,
                msg: `No envio el parametro id_publicacion`
            })
        }
        
        const fotos = await respuestaT_fotos.mostrarFotos(req);

        if (!fotos) {
            res.status(400).json({
                code: -1,
                msg: `No existen fotos en la publicacion!`
            });
        } else {
            res.status(200).json({
                code: 1,
                msg: `Consulta a fotos exitosamente!`,
                fotos
            });
        }

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            code: -1,
            error: `Error al consultar foto ${error}`
        });

    }

});

module.exports = router;