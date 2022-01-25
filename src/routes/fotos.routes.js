const router = require("express").Router();

//=========================================================
// Sube archivos a un directorio
//=========================================================
const uploadController = require('../controllers/fotos.controller');

router.post("/upload", uploadController.uploadFile);

router.post("/uploadInventario", uploadController.uploadFileInventario);

module.exports = { router };