const router = require("express").Router();
const pool = require('../../database/dbConection');
const respuestaT_vacunas7Controller = require('../controllers/vacTVacuc.controller');

//===========================================
//Insertar los datos en t_vacunas
//===========================================
router.post("/t_vacunas/create", async(req, res) => {
try {
    //Se toman solo los campos necesarios que vienen en el body de la petición
    let { id_tipo_vacunas,id_mascotas,id_clientes,id_usuario,sintomas_vacuna,fecha_vacuna,dosis,fecha_proxima_vacuna } = req.body;

    /**Se guardan todos los campos recibidos Projectos en el body
     * de la petición dentro de un array
     */
        
    const campos = [{
            nombre: 'id_mascotas',
            campo: id_mascotas
        },{
            nombre: 'id_clientes',
            campo: id_clientes
        },{
            nombre: 'id_usuario',
            campo: id_usuario
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
        
    
    /**Se obtienen la respuesta T_vacunas registrada en la tabla
         * "T_vacunas" y se guarda el resultado de la consulta dentro
         * de la constante "T_vacunas"
         */
        
    const T_vacunas7 = await respuestaT_vacunas7Controller.createT_vacunas7(req);

    /**Si la función retorna null, quiere decir
     * que ocurrión un error al guardar los datos en la tabla  T_vacunas registrada
     */
    if (!T_vacunas7) {
        res.status(500).json({
            code: -1,
            msg: `Ocurrión un error al guardar el dato en T_vacunas`
        });
    } else {
        res.json({
            code: 0,
            msg: T_vacunas7.respuesta,
            id: T_vacunas7.responseid
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
//Updatea los datos en t_vacunas
//===========================================
router.put("/t_vacunas/edit", async(req, res) => {
try {

    //Se toman solo los campos necesarios que vienen en el body de la petición
    let { id_vacuna,id_tipo_vacunas,id_mascotas,id_clientes,id_usuario,sintomas_vacuna,fecha_vacuna,dosis,fecha_proxima_vacuna } = req.body;

    /**Se guardan todos los campos recibidProjectos en el body
     * de la petición dentro de un array
     */
        
    const campos = [
         {
            nombre: 'id_vacuna',
            campo: id_vacuna }
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

    /**Se obtienen la respuesta T_vacunas registrada en la tabla
        * "T_vacunas" y se guarda el resultado de la consulta dentro
        * de la constante "T_vacunas"
        */
        
    const T_vacunas7 = await respuestaT_vacunas7Controller.updateT_vacunas7(req);

    /**Si la función retorna null, quiere decir
     * que ocurrión un error al updetear los datos en la tabla  T_vacunas registrada
     */
    if (T_vacunas7.rest !== '1') {
        return res.status(400).json({
            code: T_vacunas7.rest,
            msg: T_vacunas7.respuesta
        });
    } 

    return res.json({
        code: 0,
        msg: T_vacunas7.respuesta
    })

    } catch (err) {
        res.status(400).json({
            code: -1,
            msg: err.message
        });
    }
});
//===========================================
//Deletea los datos en t_vacunas
//===========================================

router.delete("/t_vacunas/delete/:id_vacuna", async(req, res) => {
  try {

    //Se toman solo los campos necesarios que vienen en el body de la petición
    let { id_vacuna } = req.params;

    /**Se guardan todos los campos recibidProjectos en el body
     * de la petición dentro de un array
     */
        
    const campos = [{
            nombre: 'id_vacuna',
            campo: id_vacuna
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

    /**Se obtienen la respuesta T_vacunas registrada en la tabla
        * "T_vacunas" y se guarda el resultado de la consulta dentro
        * de la constante "T_vacunas"
        */
        
    const T_vacunas7 = await respuestaT_vacunas7Controller.deleteT_vacunas7(id_vacuna);

    /**Si la función retorna null, quiere decir
     * que ocurrión un error al deletear los datos en la tabla  T_vacunas registrada
     */
    if (T_vacunas7.rest !== '1') {
        res.status(400).json({
            code: T_vacunas7.rest,
            msg: T_vacunas7.respuesta
        });
    } else {
        res.json({
            code: 0,
            msg: T_vacunas7.respuesta
        })
    }
    } catch (err) {
        res.status(500).json({
            code: -1,
            msg: err.message
        });
    }
});
router.post("/t_vacunas/read", async(req, res) => {
    try {
    
        //Se toman solo los campos necesarios que vienen en el body de la petición
        let { id_vacuna } = req.body;
    
        /**Se guardan todos los campos recibidProjectos en el body
         * de la petición dentro de un array
         */
            
        const campos = [{
                nombre: 'id_vacuna',
                campo: id_vacuna
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
    
    
        /**Se obtienen la respuesta T_vacunas registrada en la tabla
             * "T_vacunas" y se guarda el resultado de la consulta dentro
             * de la constante "T_vacunas"
             */
            
        const T_vacunas7 = await respuestaT_vacunas7Controller.readT_vacunas7(req);
    
        /**Si la función retorna null, quiere decir
         * que ocurrión un error al select en los datos de la tabla  T_vacunas registrada
         */
        if (T_vacunas7 === null) {
            res.status(400).json({
                code: -1,
                msg: `Aún no hay datos en T_vacunas registrados `
            });
    
        } else {
            res.json({
                code: 0,
                msg: T_vacunas7
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
//SelectG los datos en t_vacunas
//===========================================
router.get("/t_vacunas/readG", async(req, res) => {
 try {        

/**Se obtienen la respuesta T_vacunas registrada en la tabla
    * "T_vacunas" y se guarda el resultado de la consulta dentro
    * de la constante "T_vacunas"
    */
    
const T_vacunas7 = await respuestaT_vacunas7Controller.readGT_vacunas7();

/**Si la función retorna null, quiere decir
 * que ocurrión un error al selectG en los datos de la tabla  T_vacunas registrada
 */
if (T_vacunas7 === null) {
    res.status(400).json({
        code: -1,
        msg: `Aún no hay datos en T_vacunas registrados `
    });

} else {
    res.json({
        code: 0,
        msg: T_vacunas7
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