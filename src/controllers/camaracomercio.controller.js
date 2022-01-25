const pool = require('../../database/dbConection');

const uploadCamaraComercio = async(req) => {
    try{

    } catch (err) {
        console.log(err)
        throw new Error(`camaracomercio.controller.js->uploadCamaraComercio()\n${err}`);
    }
}


module.exports = {
    uploadCamaraComercio
}