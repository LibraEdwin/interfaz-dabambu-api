const model = require('./model')
const generate = require('nanoid/generate')

// Crear un detalle de pedido
async function createOrderDetail(pedidoId, orderDetail) {
  const _id = generate('123456789', 8)
  const nuevoDetalle = new model({
    _id,
    pedidoId,
    ...orderDetail
  })
  return await nuevoDetalle.save()
}

// Listar todos los detalles de pedido
async function listAllOrderDetail() {
  return model.find({ esEliminado: false })
}

// Obtener un detalle de pedido
async function getOrderDetail(codigo) {
  try {
    const orderDetail = model.findOne({ _id: codigo, esEliminado: false })
      .populate('productoId')
      .populate('pedidoId')

    if (!orderDetail) {
      throw Error(`El detalle de pedido ${codigo} no existe`)
    }
    return orderDetail
  } catch (error) {
    return error.message
  }
}

// Listar todos los detalles de pedido por Pedido ID
async function getOrderDetailByOrder(codigo) {
  return model.find({ pedidoId: codigo, esEliminado: false }).populate('productoId')
}

// Actualizar un detalle de pedido
async function updateOrderDetail(codigo, data) {
  const newState = await model.findByIdAndUpdate({ _id: codigo, esEliminado: false }, data, { new: true, runValidation: true })
  return newState
}

// Eliminar un detalle de pedido
async function deleteOrderDetail(codigo) {
  const order_deleted = await model.findOneAndUpdate({ _id: codigo, esEliminado: false }, { esEliminado: true }, {
    new: true,
    runValidation: true
  })
  return order_deleted
}

async function search() {
  return await model.find({ esEliminado: false })
    .populate({
      path: 'pedidoId',
      model: 'Pedido',
      select: 'estado total fechaPedido',
      populate: [
        {
          path: 'clienteId',
          model: 'Cliente',
          select: '-password -updatedAt -esEliminado -createdAt -__v',
          populate: [
            { path: 'distrito', model: 'Distrito' }
          ]
        }
      ]
    })
    .populate({
      path: 'productoId',
      model: 'Producto',
      select: 'nombre'
    })
}

module.exports = {
  create: createOrderDetail,
  list: listAllOrderDetail,
  get: getOrderDetail,
  getByOrderID: getOrderDetailByOrder,
  update: updateOrderDetail,
  delete: deleteOrderDetail,
  search
}
