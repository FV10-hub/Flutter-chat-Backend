const jwt = require("jsonwebtoken");

const validarJWT = (req, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la peticion",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY);
    req.uid = uid; //esto hago para que en cualquier lado donde se valide el token ya en la req este accesible el token
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: `Ocurrio un Errror al validar token ${error}`,
    });
  }
};

module.exports = {
  validarJWT,
};
