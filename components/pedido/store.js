const Model = require('./model').model
const ModelDetalle = require('../detallePedido/model')
const generate = require('nanoid/generate')

// Crear Pedido
async function addPedido (pedido) {
  const idPedido = generate('123456789', 6)
  const nuevoPedido = new Model({ _id: `${22 + idPedido}`, ...pedido })
  return nuevoPedido.save()
}

// Listar todoso los pedidos
async function listAllOrders () {
  return Model.find({ esEliminado: false })
}

// Obtener pedido por Id
async function getOrder (codigo) {
  try {
    const order = Model
      .findOne({ _id: codigo, esEliminado: false })
      .populate('clienteId')

    if (!order) {
      throw Error(`El pedido ${codigo} no existe`)
    }

    return order
  } catch (error) {
    return error.message
  }
}

// Cambiar estado de pedido
async function changeState (codigo, state) {
  const newState = await Model.findByIdAndUpdate({ _id: codigo, esEliminado: false }, state, { new: true, runValidation: true })
  return newState
}

// Eliminar pedido
async function deleteOrder (codigo) {
  const order_deleted = await Model.findOneAndUpdate(
    { _id: codigo, esEliminado: false },
    { esEliminado: true },
    {
      new: true,
      runValidation: true
    }
  )

  return order_deleted
}

async function search () {
  const pedidos = await Model
    .find({ esEliminado: false })
    .populate('clienteId')

  return pedidos
}

module.exports = {
  add: addPedido,
  list: listAllOrders,
  get: getOrder,
  change: changeState,
  delete: deleteOrder,
  search
}
