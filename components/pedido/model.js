const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StatusEnum = ['Pendiente', 'En proceso', 'En camino', 'Entregado']

const pedidoSchema = new Schema({

  _id: Number,
  fechaPedido: Date,
  estado: {
    type: String,
    enum: StatusEnum,
    default: 'Pendiente'
  },
  clienteId: {
    type: String,
    ref: 'Cliente',
    required: [true, 'El cliente id es requerido']
  },
  total: {
    type: mongoose.Decimal128,
    required: [true, 'Ingresar el monto total del pedido']
  },
  esEliminado: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

const model = mongoose.model('Pedido', pedidoSchema)

module.exports = { model, StatusEnum }
