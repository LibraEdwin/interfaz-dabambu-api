const mongoose = require('mongoose')
const Schema = mongoose.Schema

const distritoSchema = new Schema({

  _id: String,
  provinciaId: { type: String, ref: 'Provincia' },
  departamentoId: { type: String, ref: 'Departamento' },
  nombre: String

}, { timestamps: true })

const model = mongoose.model('Distrito', distritoSchema)

module.exports = model
