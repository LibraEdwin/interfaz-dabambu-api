const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define un schema
const usuarioSchema = new Schema({
  _id: Number,
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true })

// Compila el modelo
const UserModel = mongoose.model('Usuario', usuarioSchema)

// Exportar modelo
module.exports = UserModel
