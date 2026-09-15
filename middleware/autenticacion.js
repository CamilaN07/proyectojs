const jwtoken = require("jsonwebtoken")

const autenticacionToken = (req, res, next) => {
  //formato del token = Bearer <token>.
  const authHeader = req.header("autenticacion")
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ mensaje: "Acceso denegado, no provee un token." })
  }

  jwtoken.verify(token, process.env.JWT_SECRETO, (error, usuario) => {
    if (error) {
      return res.status(403).json({ mensaje: "Token invalido" })
    }
    req.aprendiz = usuario
    next()
  })
}

module.exports = autenticacionToken