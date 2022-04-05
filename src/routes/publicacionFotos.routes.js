
const router = require("express").Router();
const respuestaT_fotos = require('../controllers/publicacionesFotos.controller')



router.get('/mostrarfotos', async(req, res) => {

    try {
        
        const comentarios = await respuestaT_fotos.mostrarFotos(req);

        if (!comentarios) {
            res.status(400).json({
                code: -1,
                msg: `No existen comentarios en las publicaciones!`
            });
        } else {
            res.status(200).json({
                code: 1,
                msg: `Consulta a comentarios exitosamente!`,
                comentarios
            });
        }

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            code: -1,
            msg: err.message
        });

    }

});
















module.exports = router;