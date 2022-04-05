
const router = require("express").Router();


const path = require('path');




router.post('/test', async (req, res) => {
    try {
        let { ruta_guardado } = req.body;
        if (ruta_guardado) {
            let patha = ruta_guardado;
            res.status(200).sendFile(path.resolve(patha));



        } else {
            return res.status(200).json({
                message: "No se envio la ruta de imagen",
                code: -1
            })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Error en ruta",
            code: -1
        })
    }




})





module.exports = router;