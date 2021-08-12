const jwt = require('jwt-simple');
const moment = require('moment');
const secret = "clave-secreta-para-generar-el-token-9999";

exports.createToken = function(auth) {
    // payload es el objeto que se va a usar para generar el token
    const payload = {
        sub: auth._id,
        correo: auth.correo,
        clave: auth.clave,      
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    }

    return jwt.encode(payload, secret)
}