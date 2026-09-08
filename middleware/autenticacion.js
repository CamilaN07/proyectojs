const jwtoken = require("jsonwebtoken")

const autenticacionToken = (req, res, nex) => {
    //formato del token = Bearer <token>.
    const token = req.header("autenticacion").split("")[1]
    if (!token) {
        return res.status(401).json({ mensaje: "Acceso denegado, no provee un token." })
    }
    //verificar el token
    jwtoken.verify(token, process.env.JWT_SECRETO, (error, usuario) =>{
        if (error) {
        res.status(403).json({ mensaje: "Token invalido" })
        }
        req.aprendiz = usuario
    })
    next()
}

module.exports = autenticacionToken