
const pool = require("../../../database/dbConection");
const router = require("express").Router();

//===========================================
//SelectG los datos en t_tipo_vacunas
//===========================================
router.get("/t_tipo_vacunas/DreadG", async(req, res) => {
try {        

/**Se obtienen la respuesta T_tipo_vacunas registrada en la tabla
 * "T_tipo_vacunas donde está la relación con T_tipo_vacunas" y se guarda el resultado de la consulta dentro
 * de la constante "T_tipo_vacunas"
 */
        
const T_tipo_vacunas = await pool.query('SELECT id_tipo_vacunas, tipo_vacunas FROM public.t_tipo_vacunas');

/**Si la función retorna null, quiere decir
 * que ocurrión un error al selectG en los datos de la tabla  T_tipo_vacunas registrada
 */
if (T_tipo_vacunas === null) {
    res.status(400).json({
        code: -1,
        msg: `Aún no hay datos registrados en el Dialogo`
    });

} else {
    res.json({
        code: 0,
        msg: T_tipo_vacunas.rows
    })
}
} catch (err) {
    res.status(500).json({
        code: -1,
        msg: err.message
    });
}
});

router.get("/t_tipo_vacunas/Dread/:param", async(req, res) => {
try {        

    const { param } = req.params
    
    /**Se obtienen la respuesta T_tipo_vacunas registrada en la tabla
     * "T_tipo_vacunas donde está la relación con T_tipo_vacunas" y se guarda el resultado de la consulta dentro
     * de la constante "T_tipo_vacunas"
     */
            
    const T_tipo_vacunas = await pool.query('SELECT id_tipo_vacunas, tipo_vacunas FROM public.t_tipo_vacunas WHERE id_tipo_vacunas=$1', [ param ]);
    
    /**Si la función retorna null, quiere decir
     * que ocurrión un error al selectG en los datos de la tabla  T_tipo_vacunas registrada
     */
    if (T_tipo_vacunas === null) {
        res.status(400).json({
            code: -1,
            msg: `Aún no hay datos registrados en el Dialogo`
        });
    
    } else {
        res.json({
            code: 0,
            msg: T_tipo_vacunas.rows
        })
    }
    } catch (err) {
        res.status(500).json({
            code: -1,
            msg: err.message
        });
    }
});

module.exports = router;
