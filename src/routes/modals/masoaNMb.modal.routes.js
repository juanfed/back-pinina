
const pool = require("../../../database/dbConection");
const router = require("express").Router();

//===========================================
//SelectG los datos en t_mascotas
//===========================================
router.get("/t_mascotas/DreadG", async(req, res) => {
try {        

/**Se obtienen la respuesta T_mascotas registrada en la tabla
 * "T_mascotas donde está la relación con T_mascotas" y se guarda el resultado de la consulta dentro
 * de la constante "T_mascotas"
 */
        
const T_mascotas = await pool.query('SELECT id_mascotas, nombre_mascota FROM public.t_mascotas');

/**Si la función retorna null, quiere decir
 * que ocurrión un error al selectG en los datos de la tabla  T_mascotas registrada
 */
if (T_mascotas === null) {
    res.status(400).json({
        code: -1,
        msg: `Aún no hay datos registrados en el Dialogo`
    });

} else {
    res.json({
        code: 0,
        msg: T_mascotas.rows
    })
}
} catch (err) {
    res.status(500).json({
        code: -1,
        msg: err.message
    });
}
});

router.get("/t_mascotas/Dread/:param", async(req, res) => {
try {        

    const { param } = req.params
    
    /**Se obtienen la respuesta T_mascotas registrada en la tabla
     * "T_mascotas donde está la relación con T_mascotas" y se guarda el resultado de la consulta dentro
     * de la constante "T_mascotas"
     */
            
    const T_mascotas = await pool.query('SELECT id_mascotas, nombre_mascota FROM public.t_mascotas WHERE id_mascotas=$1', [ param ]);
    
    /**Si la función retorna null, quiere decir
     * que ocurrión un error al selectG en los datos de la tabla  T_mascotas registrada
     */
    if (T_mascotas === null) {
        res.status(400).json({
            code: -1,
            msg: `Aún no hay datos registrados en el Dialogo`
        });
    
    } else {
        res.json({
            code: 0,
            msg: T_mascotas.rows
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
