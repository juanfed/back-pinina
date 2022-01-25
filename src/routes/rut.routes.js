const router = require("express").Router();

//===========================================
//Insertar los datos en t_empresa
//===========================================
router.post("/upload/rut", async(req, res) => {
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