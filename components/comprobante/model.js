const { model, Schema } = require('mongoose')

const estadoCobroEnum = ['pendiente', 'en proceso', 'cancelado']
const tipoCobroEnum = ['tarjeta', 'deposito', 'contra entrega']

const ComprobanteSchema = new Schema({
  _id: Number,
  pedidoId: {
    type: Number,
    ref: 'Pedido'
  },
  fechaEmision: Date,
  fechaCancelacion: Date,
  estadoCobro: {
    type: String,
    enum: estadoCobroEnum
  },
  tipoCobro: {
    type: String,
    enum: tipoCobroEnum,
    default: 'tarjeta'
  },
  esEliminado: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

module.exports = model('Comprobante', ComprobanteSchema)
