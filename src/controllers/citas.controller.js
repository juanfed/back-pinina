const pool = require('../../database/dbConection');

const readT_citas = async(req) => {
    try {
        const { profecional_cita } = req.body;

        let respuesta =
            await pool.query(`SELECT * from f_readcitas
                                ($1::numeric)`, [
                profecional_cita
            ]);
        
        /**Para verificar que el resultado de la consulta no arroja ningún registro
         * se convierte la respuesta en un JSONArray y se compara con []
         */
        if (JSON.stringify(respuesta.rows) === '[]') {
    
            //Se le asigna null a la respuesta
            respuesta = null;
        }
        else {
            respuesta = respuesta.rows;
        }

        return respuesta;

    } catch (err) {
        console.log(err)
        throw new Error(`clientes.controller.js->readT_citas()\n${err}`);
    }
}

const createT_citas = async(req) => {
    try {
        const {fecha_cita, hora_cita, id_tipo_cita, descripcion_cita, paciente_cita,
            propietario_cita, profecional_cita, estado_cita, dia_cita} = req.body;

        let respuesta =
            await pool.query(`SELECT * FROM f_createcitas($1::text,
                            $2::text, $3::numeric, $4::text, $5::numeric,
                            $6::numeric, $7::numeric, $8::numeric, $9::text)`, [
                fecha_cita, hora_cita, id_tipo_cita, descripcion_cita,
                paciente_cita, propietario_cita, profecional_cita,
                estado_cita, dia_cita
            ]);
        
        /**Para verificar que se retorne la fila con los datos actualizados
         * se convierte la respuesta en un JSONArray y se compara con []
         */
         if (JSON.stringify(respuesta.rows) === '[]') {
    
            //Se le asigna null a la respuesta
            respuesta = null;
        }
        else {
            respuesta = respuesta.rows;
        }

        return respuesta;

    } catch (err) {
        console.log(err)
        throw new Error(`clientes.controller.js->createT_citas()\n${err}`);
    }
}

const deleteT_citas = async(req) => {
    try {
        const { id_cita } = req.body;

        let respuesta =
            await pool.query(`SELECT * from f_deletecitas
                                ($1::integer)`, [
                id_cita
            ]);
        
        /**Para verificar que el resultado de la consulta no arroja ningún registro
         * se convierte la respuesta en un JSONArray y se compara con []
         */
        if (JSON.stringify(respuesta.rows) === '[]') {
    
            //Se le asigna null a la respuesta
            respuesta = null;
        }
        else {
            respuesta = respuesta.rows;
        }

        return respuesta;

    } catch (err) {
        console.log(err)
        throw new Error(`clientes.controller.js->deleteT_citas()\n${err}`);
    }
}

const updateT_citas = async(req) => {
    try {
        const {id_cita, fecha_cita, hora_cita, id_tipo_cita, descripcion_cita, paciente_cita,
            propietario_cita, profecional_cita, estado_cita, dia_cita} = req.body;

        let respuesta =
            await pool.query(`SELECT * FROM f_updatecitas($1::integer, $2::text,
                            $3::text, $4::numeric, $5::text, $6::numeric,
                            $7::numeric, $8::numeric, $9::numeric, $10::text)`, [
                id_cita, fecha_cita, hora_cita, id_tipo_cita, descripcion_cita,
                paciente_cita, propietario_cita, profecional_cita, estado_cita,
                dia_cita
            ]);
        
        
        /**Para verificar que se retorne la fila con los datos actualizados
         * se convierte la respuesta en un JSONArray y se compara con []
         */
         if (JSON.stringify(respuesta.rows) === '[]') {
    
            //Se le asigna null a la respuesta
            respuesta = null;
        }
        else {
            respuesta = respuesta.rows;
        }

        return respuesta;

    } catch (err) {
        console.log(err)
        throw new Error(`clientes.controller.js->updateT_citas()\n${err}`);
    }
}

const searchT_citas = async(req) => {
    try {
        const { profecional_cita, param_busqueda } = req.body;

        const estados_cita = [{
            estado: 'En espera',
            valor: 1
        },{
            estado: 'Realizada',
            valor: 2
        },{
            estado: 'Cancelada',
            valor: 3
        }];

        const estado_encontrado = estados_cita.find(x => x.estado.includes(param_busqueda));

        let respuesta;
        if (estado_encontrado){
            respuesta =
                await pool.query(`SELECT * from f_searchcitas
                                    ($1::numeric, $2::text, $3::numeric)`, [
                    profecional_cita, null, estado_encontrado.valor
                ]);
        } else {
            respuesta =
                await pool.query(`SELECT * from f_searchcitas
                                    ($1::numeric, $2::text, $3::numeric)`, [
                    profecional_cita, param_busqueda, null
                ]);
        }
        
        /**Para verificar que el resultado de la consulta no arroja ningún registro
         * se convierte la respuesta en un JSONArray y se compara con []
         */
        if (JSON.stringify(respuesta.rows) === '[]') {
    
            //Se le asigna null a la respuesta
            respuesta = null;
        }
        else {
            respuesta = respuesta.rows;
        }

        return respuesta;

    } catch (err) {
        console.log(err)
        throw new Error(`clientes.controller.js->searchT_citas()\n${err}`);
    }
}

const createT_configuracion_citas = async(req) => {
    try {
        const {id_tipo_cita, hora_inicio, hora_expiracion,
            dias, id_usuario} = req.body;

        let respuesta =
            await pool.query(`SELECT * FROM f_create_configuracioncitas($1::numeric,
                            $2::text, $3::text, $4::text[], $5::numeric)`, [
                id_tipo_cita, hora_inicio, hora_expiracion,
                dias, id_usuario
            ]);
        
        /**Para verificar que se retorne la fila con los datos actualizados
         * se convierte la respuesta en un JSONArray y se compara con []
         */
         if (JSON.stringify(respuesta.rows) === '[]') {
    
            //Se le asigna null a la respuesta
            respuesta = null;
        }
        else {
            respuesta = respuesta.rows;
        }

        return respuesta;

    } catch (err) {
        console.log(err)
        throw new Error(`clientes.controller.js->createT_configuracion_citas()\n${err}`);
    }
}

const updateT_configuracion_citas = async(req) => {
    try {
        const {id_conf_cita, id_tipo_cita, hora_inicio, hora_expiracion,
            dias, id_usuario} = req.body;

        let respuesta =
            await pool.query(`SELECT * FROM f_update_configuracioncitas($1::integer,
                $2::numeric, $3::text, $4::text, $5::text[], $6::numeric)`, [
                id_conf_cita, id_tipo_cita, hora_inicio,
                hora_expiracion, dias, id_usuario
            ]);
        
        
        /**Para verificar que se retorne la fila con los datos actualizados
         * se convierte la respuesta en un JSONArray y se compara con []
         */
         if (JSON.stringify(respuesta.rows) === '[]') {
    
            //Se le asigna null a la respuesta
            respuesta = null;
        }
        else {
            respuesta = respuesta.rows;
        }

        return respuesta;

    } catch (err) {
        console.log(err)
        throw new Error(`clientes.controller.js->updateT_configuracion_citas()\n${err}`);
    }
}

const readT_configuracion_citas = async(req) => {
    try {
        const { id_usuario } = req.body;

        let respuesta =
            await pool.query(`SELECT * from f_read_configuracioncitas
                                ($1::numeric)`, [
                id_usuario
            ]);
        
        /**Para verificar que el resultado de la consulta no arroja ningún registro
         * se convierte la respuesta en un JSONArray y se compara con []
         */
        if (JSON.stringify(respuesta.rows) === '[]') {
    
            //Se le asigna null a la respuesta
            respuesta = null;
        }
        else {
            respuesta = respuesta.rows;
        }

        return respuesta;

    } catch (err) {
        console.log(err)
        throw new Error(`clientes.controller.js->readT_configuracion_citas()\n${err}`);
    }
}

const deleteT_configuracion_citas = async(req) => {
    try {
        const { id_conf_cita } = req.body;

        let respuesta =
            await pool.query(`SELECT * from f_delete_configuracioncitas
                                ($1::integer)`, [
                id_conf_cita
            ]);
        
        /**Para verificar que el resultado de la consulta no arroja ningún registro
         * se convierte la respuesta en un JSONArray y se compara con []
         */
        if (JSON.stringify(respuesta.rows) === '[]') {
    
            //Se le asigna null a la respuesta
            respuesta = null;
        }
        else {
            respuesta = respuesta.rows;
        }

        return respuesta;

    } catch (err) {
        console.log(err)
        throw new Error(`clientes.controller.js->deleteT_configuracion_citas()\n${err}`);
    }
}

const validar_disponibilidad = async(req) => {
    try {
        const {hora_cita, id_tipo_cita, profecional_cita, dia_cita} = req.body;

        const respuesta =
            await pool.query(`SELECT f_validar_disponibilidad($1::text,
                    $2::numeric, $3::numeric, $4::text)`, [
                hora_cita, id_tipo_cita, profecional_cita, dia_cita
            ]);

        return respuesta.rows[0];

    } catch (err) {
        console.log(err)
        throw new Error(`clientes.controller.js->validar_disponibilidad()\n${err}`);
    }
}

module.exports = {
    readT_citas,
    createT_citas,
    deleteT_citas,
    updateT_citas,
    searchT_citas,
    createT_configuracion_citas,
    updateT_configuracion_citas,
    readT_configuracion_citas,
    deleteT_configuracion_citas,
    validar_disponibilidad
}