const mongoose = require("mongoose");
const { Schema } = mongoose;

const AuthSchema = new Schema(
  {
    correo: { type: String },
    clave: { type: String }

  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.model("Auth", AuthSchema);
