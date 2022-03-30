const router = require("express").Router();
const pool = require('../../database/dbConection');
const respuestaT_historias_clinicas5Controller = require('../controllers/hisTExamg.son.controller');

//===========================================
//Insertar los datos en t_historias_clinicas
//===========================================
router.post("/t_historias_clinicas/create", async(req, res) => {
try {
    //Se toman solo los campos necesarios que vienen en el body de la petición
    let { profesional,id_usuario,id_formula,id_mascotas,observaciones,fecha_grabacion,hora,diagnostico,antecedentes,sintomas,id_examen } = req.body;

    /**Se guardan todos los campos recibidos Projectos en el body
     * de la petición dentro de un array
     */
        
    const campos = [{
            nombre: 'id_examen',
            campo: id_examen
        }
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
        
    
    /**Se obtienen la respuesta T_historias_clinicas registrada en la tabla
         * "T_historias_clinicas" y se guarda el resultado de la consulta dentro
         * de la constante "T_historias_clinicas"
         */
        
    const T_historias_clinicas5 = await respuestaT_historias_clinicas5Controller.createT_historias_clinicas5(req);

    /**Si la función retorna null, quiere decir
     * que ocurrión un error al guardar los datos en la tabla  T_historias_clinicas registrada
     */
    if (!T_historias_clinicas5) {
        res.status(500).json({
            code: -1,
            msg: `Ocurrión un error al guardar el dato en T_historias_clinicas`
        });
    } else {
        res.json({
            code: 0,
            msg: T_historias_clinicas5.respuesta,
            id: T_historias_clinicas5.responseid
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
//Updatea los datos en t_historias_clinicas
//===========================================
router.put("/t_historias_clinicas/edit", async(req, res) => {
try {

    //Se toman solo los campos necesarios que vienen en el body de la petición
    let { id_historias,profesional,id_usuario,id_formula,id_mascotas,observaciones,fecha_grabacion,hora,diagnostico,antecedentes,sintomas } = req.body;

    /**Se guardan todos los campos recibidProjectos en el body
     * de la petición dentro de un array
     */
        
    const campos = [
         {
            nombre: 'id_historias',
            campo: id_historias }
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

    /**Se obtienen la respuesta T_historias_clinicas registrada en la tabla
        * "T_historias_clinicas" y se guarda el resultado de la consulta dentro
        * de la constante "T_historias_clinicas"
        */
        
    const T_historias_clinicas5 = await respuestaT_historias_clinicas5Controller.updateT_historias_clinicas5(req);

    /**Si la función retorna null, quiere decir
     * que ocurrión un error al updetear los datos en la tabla  T_historias_clinicas registrada
     */
    if (T_historias_clinicas5.rest !== '1') {
        return res.status(400).json({
            code: T_historias_clinicas5.rest,
            msg: T_historias_clinicas5.respuesta
        });
    } 

    return res.json({
        code: 0,
        msg: T_historias_clinicas5.respuesta
    })

    } catch (err) {
        res.status(400).json({
            code: -1,
            msg: err.message
        });
    }
});
//===========================================
//Deletea los datos en t_historias_clinicas
//===========================================

router.delete("/t_historias_clinicas/delete/:id_historias", async(req, res) => {
  try {

    //Se toman solo los campos necesarios que vienen en el body de la petición
    let { id_historias } = req.params;

    /**Se guardan todos los campos recibidProjectos en el body
     * de la petición dentro de un array
     */
        
    const campos = [{
            nombre: 'id_historias',
            campo: id_historias
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

    /**Se obtienen la respuesta T_historias_clinicas registrada en la tabla
        * "T_historias_clinicas" y se guarda el resultado de la consulta dentro
        * de la constante "T_historias_clinicas"
        */
        
    const T_historias_clinicas5 = await respuestaT_historias_clinicas5Controller.deleteT_historias_clinicas5(id_historias);

    /**Si la función retorna null, quiere decir
     * que ocurrión un error al deletear los datos en la tabla  T_historias_clinicas registrada
     */
    if (T_historias_clinicas5.rest !== '1') {
        res.status(400).json({
            code: T_historias_clinicas5.rest,
            msg: T_historias_clinicas5.respuesta
        });
    } else {
        res.json({
            code: 0,
            msg: T_historias_clinicas5.respuesta
        })
    }
    } catch (err) {
        res.status(500).json({
            code: -1,
            msg: err.message
        });
    }
});
router.post("/t_historias_clinicas/read", async(req, res) => {
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
    
    
        /**Se obtienen la respuesta T_historias_clinicas registrada en la tabla
             * "T_historias_clinicas" y se guarda el resultado de la consulta dentro
             * de la constante "T_historias_clinicas"
             */
            
        const T_historias_clinicas5 = await respuestaT_historias_clinicas5Controller.readT_historias_clinicas5(req);
    
        /**Si la función retorna null, quiere decir
         * que ocurrión un error al select en los datos de la tabla  T_historias_clinicas registrada
         */
        if (T_historias_clinicas5 === null) {
            res.status(400).json({
                code: -1,
                msg: `Aún no hay datos en T_historias_clinicas registrados `
            });
    
        } else {
            res.json({
                code: 0,
                msg: T_historias_clinicas5
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
//SelectG los datos en t_historias_clinicas
//===========================================
router.get("/t_historias_clinicas/readG", async(req, res) => {
 try {        

/**Se obtienen la respuesta T_historias_clinicas registrada en la tabla
    * "T_historias_clinicas" y se guarda el resultado de la consulta dentro
    * de la constante "T_historias_clinicas"
    */
    
const T_historias_clinicas5 = await respuestaT_historias_clinicas5Controller.readGT_historias_clinicas5();

/**Si la función retorna null, quiere decir
 * que ocurrión un error al selectG en los datos de la tabla  T_historias_clinicas registrada
 */
if (T_historias_clinicas5 === null) {
    res.status(400).json({
        code: -1,
        msg: `Aún no hay datos en T_historias_clinicas registrados `
    });

} else {
    res.json({
        code: 0,
        msg: T_historias_clinicas5
    })
}
} catch (err) {
    res.status(500).json({
        code: -1,
        msg: err.message
    });
}
});
    

        router.get("/t_historias_clinicas/readS/:params/:value", async(req, res) => {
    try {

        /**Se obtienen la respuesta t_historias_clinicas registrada en la tabla
         * "t_historias_clinicas" y se guarda el resultado de la consulta dentro
         * de la constante "t_historias_clinicas"
         */


                    const obj = await pool.query("SELECT * FROM public.t_examen WHERE id_examen=" + "'" + req.params.value + "'" );
                    const t_historias_clinicas = await pool.query("SELECT * FROM public.t_historias_clinicas WHERE id_examen=" + "'" + obj.rows[0].id_examen + "'")
                

        /**Si la función retorna null, quiere decir
         * que ocurrión un error al selectG en los datos de la tabla  t_historias_clinicas registrada
         */
        if (t_historias_clinicas === null) {
            res.status(400).json({
                code: -1,
                msg: 'Aún no hay datos en t_historias_clinicas registrados'
            });

        } else {
            res.json({
                code: 0,
                msg: t_historias_clinicas.rows,
                obj: obj.rows[0]
            })
        }
    } catch (err) {
        res.status(500).json({
            code: -2,
            msg: err.message
        });
    }
});
// REPLACESON

module.exports = router;