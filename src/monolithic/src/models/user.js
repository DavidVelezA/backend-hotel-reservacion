const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    cedula: { type: String },
    nombre: { type: String },
    correo: { type: String },
    telefono: { type: String },

  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.model("User", UserSchema);
