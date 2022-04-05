const router = require('express').Router();
const respuestaT_publicaciones = require('../controllers/publicaciones.controller');

router.get('/mostrarpublicaciones', async(req, res) => {

    try {

        const readT_publicaciones = await respuestaT_publicaciones.readT_cards();

        if (!readT_publicaciones) {
            res.status(400).json({
                code: -1,
                msg: `No hay ninguna publicación registrada`,
            });
        } else {
            res.status(200).json({
                code: 1,
                cadrs: readT_publicaciones
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