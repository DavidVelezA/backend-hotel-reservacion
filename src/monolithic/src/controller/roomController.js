const Room = require("../models/room");


const response = {
    data: [],
    services: "All services",
    architecture: "Monolithic"
}

const controller = {

    save: function (req, res) {
        const params = req.body;
        console.log('dddddddddd', params);

        if (params.nombre && params.detalle && params.camas && params.banios && params.imagen && params.precio && params.estado) {
            
            params.fechasReservaciones = [];
            const room = new Room(params);
            room.save();
            response.data = room;

        } else {
            response.validator = true;
        }
        return res.send(response);


    },

    getRooms: function (req, res) {
        Room.find().exec((err, rooms) => {
            response.data = rooms;
            return res.send(response);

        });
    },
    getRoomsByDates: function (req, res) {
        response.data = [];
        const params = req.body;        

        // Room.find({ "fechasReservaciones":params.fecha_entrada}).exec((err, rooms) => {
        Room.find({ fechasReservaciones: { $ne: params.fecha_entrada } }).exec((err, rooms) => {

            
            response.data = rooms;
            return res.send(response);

        });
    },

    getRoomById: function (req, res) {

        const id = req.params.id;

        Room.findById(id).exec((err, room) => {
            response.data = room;
            return res.send(response);

        });
    },

    updateRoom: function (req, res) {
        //recoger el id del topic de la url
        const id = req.params.id;

        // recoger los datos que llegan desde post
        const params = req.body;


        if (params.nombre && params.detalle && params.camas && params.banios && params.estado && params.imagen) {

            //montar un json con los datos modificables

            const update = {
                nombre: params.nombre,
                detalle: params.detalle,
                camas: params.camas,
                banios: params.banios,
                estado: params.estado,
                imagen: params.imagen,

            };

            // find and update del topic por id y por id de usuario

            Room.findOneAndUpdate({ _id: id }, update, { new: true }, (err, RoomUpdate) => {

                if (err || !RoomUpdate) {
                    response.fail = true;
                } else {
                    response.data = RoomUpdate;
                }

                return res.send(response);

            });
        } else {
            response.validator = true;
            return res.send(response);

        }
    },

    deleteRoom: function (req, res) {
        //sacar el id del topic de la url
        const id = req.params.id;

        Room.findOneAndDelete({ _id: id }, (err, RoomRemoved) => {

            if (err || !RoomRemoved) {
                response.fail = true;

            } else {
                response.data = RoomRemoved;
            }
            return res.send(response);
        });

    },

    deleteImg: function (req, res) {
        //sacar el id del topic de la url
        const id = req.params.id;
        const params = req.body;

        Room.findOne({ _id: id }, (err, room) => {

            if (err || !room) {
                response.fail = true;

            } else {
                let imagenesNuevas = room.imagen.filter(img => img != params.link );
                room.imagen = imagenesNuevas;
                room.save()
                response.data = 'Eliminado';
            }
            return res.send(response);
        });

    },

    uploadImg: function (req, res) {
        const room = new Room();
        room.imagen =  req.body.imagen;
        room.save();
        response.message = 'ok';
        return res.send(response);

      
       
      },

    

};
module.exports = controller;

