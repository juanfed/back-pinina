const router = require("express").Router();
const pool = require('../../database/dbConection');
const respuestaT_examen5Controller = require('../controllers/exaTExamg.controller');

//===========================================
//Insertar los datos en t_examen
//===========================================
router.post("/t_examen/create", async(req, res) => {
try {
    //Se toman solo los campos necesarios que vienen en el body de la petición
    let { id_tipo_examen,descripcion,fecha_examen,resultados } = req.body;

    /**Se guardan todos los campos recibidos Projectos en el body
     * de la petición dentro de un array
     */
        
    
    
    /**Se obtienen la respuesta T_examen registrada en la tabla
         * "T_examen" y se guarda el resultado de la consulta dentro
         * de la constante "T_examen"
         */
        
    const T_examen5 = await respuestaT_examen5Controller.createT_examen5(req);

    /**Si la función retorna null, quiere decir
     * que ocurrión un error al guardar los datos en la tabla  T_examen registrada
     */
    if (!T_examen5) {
        res.status(500).json({
            code: -1,
            msg: `Ocurrión un error al guardar el dato en T_examen`
        });
    } else {
        res.json({
            code: 0,
            msg: T_examen5.respuesta,
            id: T_examen5.responseid
        })
    }
    } catch (err) {
        res.status(500).json({
            code: -1,
            msg: err.message
        });
    }
});
//===========================================
//Updatea los datos en t_examen
//===========================================
router.put("/t_examen/edit", async(req, res) => {
try {

    //Se toman solo los campos necesarios que vienen en el body de la petición
    let { id_examen,id_tipo_examen,descripcion,fecha_examen,resultados } = req.body;

    /**Se guardan todos los campos recibidProjectos en el body
     * de la petición dentro de un array
     */
        
    const campos = [
         {
            nombre: 'id_examen',
            campo: id_examen }
    ];

    /**Se busca en el array si alguno de los campos no fue enviado,
        * en caso de que se encuentre algún campo vacio se guarda el 
        * elemento encontrado dentro de la constante llamada "campoVacio"
        */
    const campoVacio = campos.find(x => !x.campo);

    /**Si alguno de los campos NO fue enviado en la petición
        * se le muestra al cliente el nombre del campo que falta
        */
    if (campoVacio) 
        return res.status(400).json({
            code: -2,
            msg: `No ha ingresado el campo ${campoVacio.nombre}`
        });

    /**Se obtienen la respuesta T_examen registrada en la tabla
        * "T_examen" y se guarda el resultado de la consulta dentro
        * de la constante "T_examen"
        */
        
    const T_examen5 = await respuestaT_examen5Controller.updateT_examen5(req);

    /**Si la función retorna null, quiere decir
     * que ocurrión un error al updetear los datos en la tabla  T_examen registrada
     */
    if (T_examen5.rest !== '1') {
        return res.status(400).json({
            code: T_examen5.rest,
            msg: T_examen5.respuesta
        });
    } 

    return res.json({
        code: 0,
        msg: T_examen5.respuesta
    })

    } catch (err) {
        res.status(400).json({
            code: -1,
            msg: err.message
        });
    }
});
//===========================================
//Deletea los datos en t_examen
//===========================================

router.delete("/t_examen/delete/:id_examen", async(req, res) => {
  try {

    //Se toman solo los campos necesarios que vienen en el body de la petición
    let { id_examen } = req.params;

    /**Se guardan todos los campos recibidProjectos en el body
     * de la petición dentro de un array
     */
        
    const campos = [{
            nombre: 'id_examen',
            campo: id_examen
        },
    ];

    /**Se busca en el array si alguno de los campos no fue enviado,
        * en caso de que se encuentre algún campo vacio se guarda el 
        * elemento encontrado dentro de la constante llamada "campoVacio"
        */
    const campoVacio = campos.find(x => !x.campo);

    /**Si alguno de los campos NO fue enviado en la petición
        * se le muestra al cliente el nombre del campo que falta
        */
    if (campoVacio) 
        return res.status(400).json({
            code: -2,
            msg: `No ha ingresado el campo ${campoVacio.nombre}`
    });

    /**Se obtienen la respuesta T_examen registrada en la tabla
        * "T_examen" y se guarda el resultado de la consulta dentro
        * de la constante "T_examen"
        */
        
    const T_examen5 = await respuestaT_examen5Controller.deleteT_examen5(id_examen);

    /**Si la función retorna null, quiere decir
     * que ocurrión un error al deletear los datos en la tabla  T_examen registrada
     */
    if (T_examen5.rest !== '1') {
        res.status(400).json({
            code: T_examen5.rest,
            msg: T_examen5.respuesta
        });
    } else {
        res.json({
            code: 0,
            msg: T_examen5.respuesta
        })
    }
    } catch (err) {
        res.status(500).json({
            code: -1,
            msg: err.message
        });
    }
});
router.post("/t_examen/read", async(req, res) => {
    try {
    
        //Se toman solo los campos necesarios que vienen en el body de la petición
        let { id_examen } = req.body;
    
        /**Se guardan todos los campos recibidProjectos en el body
         * de la petición dentro de un array
         */
            
        const campos = [{
                nombre: 'id_examen',
                campo: id_examen
            },
        ];
    
        /**Se busca en el array si alguno de los campos no fue enviado,
             * en caso de que se encuentre algún campo vacio se guarda el 
             * elemento encontrado dentro de la constante llamada "campoVacio"
             */
        const campoVacio = campos.find(x => !x.campo);
    
        /**Si alguno de los campos NO fue enviado en la petición
             * se le muestra al cliente el nombre del campo que falta
             */
        if (campoVacio) 
            return res.status(400).json({
                code: -2,
                msg: `No ha ingresado el campo ${campoVacio.nombre}`
            });
    
    
        /**Se obtienen la respuesta T_examen registrada en la tabla
             * "T_examen" y se guarda el resultado de la consulta dentro
             * de la constante "T_examen"
             */
            
        const T_examen5 = await respuestaT_examen5Controller.readT_examen5(req);
    
        /**Si la función retorna null, quiere decir
         * que ocurrión un error al select en los datos de la tabla  T_examen registrada
         */
        if (T_examen5 === null) {
            res.status(400).json({
                code: -1,
                msg: `Aún no hay datos en T_examen registrados `
            });
    
        } else {
            res.json({
                code: 0,
                msg: T_examen5
            })
        }
        } catch (err) {
            res.status(500).json({
                code: -1,
                msg: err.message
            });
        }
    });

//===========================================
//SelectG los datos en t_examen
//===========================================
router.get("/t_examen/readG", async(req, res) => {
 try {        

/**Se obtienen la respuesta T_examen registrada en la tabla
    * "T_examen" y se guarda el resultado de la consulta dentro
    * de la constante "T_examen"
    */
    
const T_examen5 = await respuestaT_examen5Controller.readGT_examen5();

/**Si la función retorna null, quiere decir
 * que ocurrión un error al selectG en los datos de la tabla  T_examen registrada
 */
if (T_examen5 === null) {
    res.status(400).json({
        code: -1,
        msg: `Aún no hay datos en T_examen registrados `
    });

} else {
    res.json({
        code: 0,
        msg: T_examen5
    })
}
} catch (err) {
    res.status(500).json({
        code: -1,
        msg: err.message
    });
}
});
    
// REPLACESON

module.exports = router;