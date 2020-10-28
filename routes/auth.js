/*
    path: /api/login
*/ 
const { Router } = require('express');
const { check } = require('express-validator');

const { crearUsuario, login, renewToken } = require('../controllers/authController');
const { validarCampos }  = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//crea usuario
router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe ser valido').not().isEmpty(),
    validarCampos
], crearUsuario);

//logueo
router.post('/', [
    check('email', 'El mail no puede ser invalido y/o nulo').isEmail(),
    check('password', 'El pass es incorrecto').not().isEmpty()
], login);

//renueva token
router.get('/renew',[validarJWT],renewToken);


module.exports = router;
