const { model, Schema } = require('mongoose')

const NotaVentaSchema = new Schema({
  _id: Number,
  serie: {
    type: Number,
    required: [true, 'La serie es requerida']
  },
  comprobanteId: {
    type: Number,
    required: [true, 'El id del comprobante es requerido']
  },
  esEliminado: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

module.exports = model('NotaVenta', NotaVentaSchema)
