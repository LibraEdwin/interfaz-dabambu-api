const mongoose = require('mongoose')
const Schema = mongoose.Schema

const departamentoSchema = new Schema ({

    _id: String,
    nombre: String,

}, {timestamps: true})

const model = mongoose.model('Departamento', departamentoSchema)

module.exports = model