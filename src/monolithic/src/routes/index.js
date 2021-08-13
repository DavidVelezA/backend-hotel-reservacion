const express = require('express');
const RoomController = require('../controller/roomController');
const ReservationController = require('../controller/reservationController');

const router = express.Router();


// rutas panel de administracion

// habitaciones
router.post('/rooms',  RoomController.save); //
router.post('/rooms-fechas',  RoomController.getRoomsByDates);//
router.get('/rooms',  RoomController.getRooms);
router.get('/rooms/:id',  RoomController.getRoomById);//
router.put('/rooms/:id',  RoomController.updateRoom);//
router.delete('/rooms/:id',  RoomController.deleteRoom);//

router.post('/rooms/subir-img', RoomController.uploadImg);


// reservaciones
router.post('/reservations',  ReservationController.save);//
router.get('/reservations',  ReservationController.getReservations);



module.exports = router;