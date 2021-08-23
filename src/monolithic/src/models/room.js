const mongoose = require("mongoose");
const { Schema } = mongoose;

const RoomSchema = new Schema(
  {
    nombre: { type: String },
    detalle: { type: String },
    imagen: [{ type: String}],
    camas: { type: String },
    banios: { type: String },
    estado: { type: String },
    precio: { type: String },
    fechasReservaciones: []

  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.model("Room", RoomSchema);
