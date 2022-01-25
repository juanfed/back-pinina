const router = require("express").Router();

//===========================================
//Insertar los datos en t_datos_camara_decomercio
//===========================================
router.post("/upload/camaraComercio", async(req, res) => {
    try {
        
    } catch (err) {
        console.log(err)
        res.status(400).json({
            code: -1,
            msg: err.message
        });
    }
});

module.exports = router;