const store = require('./store')
const { getDate } = require('../../utils/functions')
const { groupBy } = require('../../utils/functions')
// Crear un detalle de pedido
async function addOrderDetail (orderDetail) {
  return new Promise(async (resolve, reject) => {
    const { pedidoId, detalles } = orderDetail

    try {
      for (let i = 0; detalles.length > i; i++) {
        await store.create(pedidoId, detalles[i])
      }
      resolve({ code: 201, data: orderDetail })
    } catch (err) {
      reject({ code: 500, message: err.message })
    }
  })
}

// Listar detalles de pedido
async function listOrderDetail () {
  return new Promise((resolve, reject) => {
    store
      .list()
      .then(result => {
        resolve({
          codigo: 200,
          data: result
        })
      })
      .catch(error => {
        reject({
          codigo: 500,
          message: error.message
        })
      })
  })
}

// Obtener un detalle de pedido por ID
async function getOrderDetailById (codigo) {
  return new Promise((resolve, reject) => {
    store
      .get(codigo)
      .then(order => {
        resolve({
          codigo: 200,
          data: order
        })
      })
      .catch(error => {
        reject({
          codigo: 500,
          message: error.message
        })
      })
  })
}

// Obtener un detalle de pedido por ID de Pedido
async function getOrderDetailByOrderId (codigo) {
  return new Promise((resolve, reject) => {
    store
      .getByOrderID(codigo)
      .then(order => {
        resolve({
          codigo: 200,
          data: order
        })
      })
      .catch(error => {
        reject({
          codigo: 500,
          message: error.message
        })
      })
  })
}

// Actualizar detalle de pedido
async function updateOrderDetail (codigo, data) {
  return new Promise((resolve, reject) => {
    store
      .update(codigo, data)
      .then(updateData => {
        resolve({
          codigo: 200,
          data: updateData
        })
      })
      .catch(err => {
        reject({
          codigo: 500,
          message: err.message
        })
      })
  })
}

// Eliminar detalle de pedido
async function orderDetailDelete (codigo) {
  return new Promise((resolve, reject) => {
    store
      .delete(codigo)
      .then(order => {
        resolve({
          codigo: 200,
          data: order
        })
      })
      .catch(err => {
        reject({
          codigo: 500,
          message: err.message
        })
      })
  })
}

async function searchOrderDetail (query) {
  return new Promise(async (resolve, reject) => {
    const { fechaRegistro } = query

    const fechas = fechaRegistro.split(',')
    const inicio = getDate(fechas[0] + 'T00:00:00')
    const fin = getDate(fechas[1] + 'T23:59:59')

    const resultadosBD = await store.search()

    const detallesEncontrados = resultadosBD.filter(detalle => {
      const fEmision = getDate(detalle.pedidoId.fechaPedido)

      return fEmision >= inicio && fEmision <= fin
    })

    resolve({
      code: 200,
      data: detallesEncontrados
    })
  })
}

module.exports = {
  addOrderDetail,
  listOrderDetail,
  getOrderDetailById,
  updateOrderDetail,
  orderDetailDelete,
  getOrderDetailByOrderId,
  searchOrderDetail
}
