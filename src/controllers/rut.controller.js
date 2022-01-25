const pool = require('../../database/dbConection');

const uploadRut = async(req) => {
    try{

    } catch (err) {
        console.log(err)
        throw new Error(`rut.controller.js->uploadRut()\n${err}`);
    }
}


module.exports = {
    uploadRut
}