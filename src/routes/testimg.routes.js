const router = require("express").Router();
const path = require('path');

router.post('/test', async(req, res) => {

    try {

        let { ruta_guardado } = req.body;

        if (ruta_guardado) {
            
            let patha = ruta_guardado;

            res.status(200).sendFile(path.resolve(patha));

        } else {
            return res.status(200).json({
                code: -1,
                msg: "No se envio la ruta de la imagen"
            })
        }
    } catch (error) {

        console.log(error)
        return res.status(500).json({
            code: -1,
            error: `${error}`
        })

    }

})

module.exports = router;