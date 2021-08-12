const Room = require("../models/room");
const path = require('path');
const fs = require('fs');


const response = {
    data: [],
    services: "All services",
    architecture: "Monolithic"
}

const controller = {

    save: function (req, res) {
        const params = req.body;

        if (params.nombre && params.detalle && params.camas && params.banios && params.estado) {
            
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
        const params = req.body;        

        Room.find({ "fechasReservaciones":params.fecha_entrada}).exec((err, rooms) => {
        
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


        if (params.nombre && params.detalle && params.camas && params.banios && params.estado) {

            //montar un json con los datos modificables

            const update = {
                nombre: params.nombre,
                detalle: params.detalle,
                camas: params.camas,
                banios: params.banios,
                estado: params.estado,
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

    uploadImg: function (req, res) {
        // Configurar el modulo multiparty (md) para habilitar subida de imagenes routes/users.js
        // Recoger el fichero de la peticion
        var file_name = 'Avatar no subido';
        if (!req.files) {
            response.message = file_name;
            return res.send(response);

        }
        let file_path = req.files.file0.path;
        let file_split = file_path.split('\\'); //mostrar en partes en array
      
        // Nombre del archivo
        var file_name = file_split[2];
        // Extension del archivo
        let ext_split = file_name.split('.');
        let file_ext = ext_split[1];
        // extension
        if (
          file_ext != 'png' &&
          file_ext != 'jpg' &&
          file_ext != 'jpeg' &&
          file_ext != 'gif'
        ) {
          fs.unlink(file_path, (err) => {
            response.message = 'La extension del archivo no es valida';
            return res.send(response);
          
          });
        } 
      },

      getImg: function (req, res) {
        const fileName = req.params.fileName;
        const pathFile = '../upload/' + fileName;
    
        fs.stat(pathFile, (err, stats) => {
          if (err) {
              response.message = err
            return res.send(response);

          }
          return res.sendFile(path.resolve(pathFile));
        });
      },

};
module.exports = controller;

