const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productoSchema = new Schema({
  _id: Number,
  nombre: { type: String, required: true },
  precio: Number,
  fotoProducto: String,
  descripcion: String,
  fotosAnexas: [String],
  nombreURL: String,
  productosAccesorios: [{ type: Number, ref: 'Producto' }],
  destacado: Boolean,
  categoria: { type: Number, ref: 'Categoria', required: true }

}, { timestamps: true })

const model = mongoose.model('Producto', productoSchema)

module.exports = model
