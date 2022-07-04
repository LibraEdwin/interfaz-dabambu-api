const mongoose = require('mongoose')
const Schema = mongoose.Schema

const provinciaSchema = new Schema({

  _id: String,
  departamentoId: { type: String, ref: 'Departamento' },
  nombre: String

}, { timestamps: true })

const model = mongoose.model('Provincia', provinciaSchema)

module.exports = model
