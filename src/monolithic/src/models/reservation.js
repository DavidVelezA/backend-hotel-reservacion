const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReservationSchema = new Schema(
  {
    // habitacion: { type: Schema.ObjectId, ref: 'Room' },
    usuario: { type: Schema.ObjectId, ref: 'User' },
    habitacion: { type: Schema.ObjectId, ref: 'Room' },
    // usuario: { type: String },
    fecha_entrada: { type: String },
    fecha_salida: { type: String },
    dias: { type: String }
    
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.model("Reservation", ReservationSchema);
