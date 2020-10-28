const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/JWT");

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;
  const existeEmail = await Usuario.findOne({ email });

  if (existeEmail) {
    return res.status(400).json({
      ok: false,
      msg: "El Correo ya esta registrado",
    });
  }

  try {
    const usuario = new Usuario(req.body);

    // encriptar las contrasenas
    const salt = bcrypt.genSaltSync(); //esto es para que siempre genere codigos aleatorios
    usuario.password = bcrypt.hashSync(password, salt);
    await usuario.save();

    //genera el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: `Ocurrio un Errror ${error}`,
    });
  }
};

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const usuarioDB = await Usuario.findOne({ email });
    if (!usuarioDB) {
      res.status(400).json({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }
    const validPass = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPass) {
      res.status(400).json({
        ok: false,
        msg: "el pass no correcto",
      });
    }
    const token = await generarJWT(usuarioDB.id);
    res.json({
      ok: true,
      msg: "login Exitoso",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: `Ocurrio un Errror al login ${error}`,
    });
  }
};

const renewToken = async(req, res = response) => {

    const uid = req.uid; //ya podemos recuperar pro que en el middleware le inyectamos ese valor
    const token = await generarJWT(uid);
    const usuario = await Usuario.findById( uid );

    res.json({
        ok: true,
        msg: 'Renew',
        uid: req.uid,
        usuario,
        token
    });
}

module.exports = {
  crearUsuario,
    login,
    renewToken
};
