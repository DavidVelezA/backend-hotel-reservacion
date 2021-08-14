const Reservation = require("../models/reservation");
const User = require("../models/user");
const Room = require("../models/room");

const moment = require('moment')

const response = {
    data: [],
    services: "All services",
    architecture: "Monolithic"
}
const controller = {

    save: function (req, res) {
        let params = req.body;

        // usuario
        // validar campos de usuario
        if (params.cedula && params.nombre && params.correo && params.telefono) {

            // guardar usuario
            const usuario = { cedula: params.cedula, nombre: params.nombre, correo: params.correo, telefono: params.telefono };
            const user = new User(usuario);
            user.save();

            // una vez que el usuario existe hacer la reservacion 

            if (params.habitacion && params.fecha_entrada) {

                // validar si la habitacion es dispoble en esas fechas

                // consultar si existe esa reservacion
                Reservation.find({ habitacion: params.habitacion, fecha_entrada: params.fecha_entrada }).exec((err, reser) => {

                    // si existe no se guarda
                    if (reser.length > 0) {

                        response.message = 'Reservacion ya existe';
                        response.data = [];
                        return res.send(response);

                    } else {

                        params.usuario = user._id;
                        const reservation = new Reservation(params);
                        reservation.save();
                        response.data = reservation;
                        response.message = '';

                        // asigar el id al room 
                        Room.findById(params.habitacion).exec((err, room) => {
                            room.fechasReservaciones.push(params.fecha_entrada);
                            room.save();
                            return res.send(response);
                
                        });                        
                    }
                });

            } else {
                response.validator = true;
                return res.send(response);
            }

        } else {
            response.validator = true;
            return res.send(response);

        }
        // return res.send(response);

    },


    // todas reservaciones para admin
    getReservations: function (req, res) {
        Reservation.find().populate('habitacion').populate('usuario').exec((err, reservations) => {
            response.data = reservations;
            return res.send(response);

        });
    },

    deleteReservations: function (req, res) {
        //sacar el id del topic de la url
        const id = req.params.id;

        Reservation.findOneAndDelete({ _id: id }, (err, ReservationRemoved) => {

            

            if (err || !ReservationRemoved) {
                response.fail = true;

            } else {
                // eliminar la fecha de el array
                Room.findOne({ _id: ReservationRemoved.habitacion, fechasReservaciones:  ReservationRemoved.fecha_entrada  }).exec((err, room) => {

                 let nuevasFechas = room.fechasReservaciones.filter(fecha => fecha != ReservationRemoved.fecha_entrada);
                 room.fechasReservaciones = nuevasFechas;
                 room.save()

                 return res.send(room);
            });

            }
        });

    },


};
module.exports = controller;

