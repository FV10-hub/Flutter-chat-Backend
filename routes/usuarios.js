/*
    path: /api/usuarios
*/
const { Router } = require("express");
const { getUsuarios } = require("../controllers/usuariosController");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

//renueva token
router.get("/", [validarJWT], getUsuarios);

module.exports = router;
