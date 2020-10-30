/*
    Path: /api/mensajes
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

const { obtenerChat } = require('../controllers/mensajesController');

const router = Router();


router.get('/:de', validarJWT, obtenerChat );

module.exports = router;


