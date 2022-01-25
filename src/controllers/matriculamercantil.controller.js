const pool = require('../../database/dbConection');

const uploadMatriculaMercantil = async(req) => {
    try{

    } catch (err) {
        console.log(err)
        throw new Error(`matriculamercantil.controller.js->uploadMatriculaMercantil()\n${err}`);
    }
}


module.exports = {
    uploadMatriculaMercantil
}