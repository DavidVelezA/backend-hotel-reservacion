const Auth = require('../models/auth');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

const response = {
    data: [],
    services: "Auth services",
    architecture: "Microservices"
}


const controller = {

    register: function (req, res) {

        Auth.findOne({ correo: 'admin@admin.com' }, (err, auth) => {

            if (auth) {
                response.data = 'Usuario administrador ya ha sido creado';

            } else {

                bcrypt.hash('admin', null, null, (err, hash) => {

                    // guardar usuario           
                    const auth = new Auth({ correo: 'admin@admin.com', clave: hash });
                    auth.save();
                    response.data = 'ok';


                }); //close bcrypt
            }
            return res.send(response);


        })


    },

    login: function (req, res) {
        //recoger parametros de la peticion 
        const params = req.body;

        if (params.correo && params.clave) {

            // buscar usuarios que coincidan con el email
            Auth.findOne({ correo: params.correo.toLowerCase() }, (err, auth) => {

                if (!auth) {
                    response.data = [];
                    return res.send(response);
                }
                //si lo encuentra
                // comprobar la contaseña (coincidencia de email y password / bcrypt)
                bcrypt.compare(params.clave, auth.clave, (err, check) => {

                    // si es correcto
                    if (check) {

                        //generar token de jwt y devolverlo 
                        if (params.gettoken) {
                            return res.status(200).send({
                                token: jwt.createToken(auth)
                            });

                        } else {
                            //limpiar objeto antes de devolverlo
                            auth.clave = undefined;

                            response.data = auth;
                            //devolver los datos
                            return res.send(response);
                        }

                    } else {
                        response.data = 'Credenciales no correctas';
                        return res.send(response);

                    }
                });
            });
        }

    },

};
module.exports = controller;
