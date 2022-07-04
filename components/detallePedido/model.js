const mongoose = require('mongoose')
const Schema = mongoose.Schema

const detallePedidoSchema = new Schema(
  {
    _id: Number,
    pedidoId: {
      type: Number,
      ref: 'Pedido',
      required: [true, 'Ingrese el número del pedido']
    },
    productoId: {
      type: Number,
      ref: 'Producto',
      required: [true, 'Ingrese el código del producto']
    },
    cantidad: {
      type: Number,
      default: 1
    },
    monto: {
      type: mongoose.Decimal128
    },
    esEliminado: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

const model = mongoose.model('DetallePedido', detallePedidoSchema)

module.exports = model
