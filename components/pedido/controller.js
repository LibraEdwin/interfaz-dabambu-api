const store = require('./store')
const storeDetalle = require('../detallePedido/store')
const { getDate } = require('../../utils/functions')
const StatusEnum = require('./model').StatusEnum

// Crear Pedido
async function crearPedido (pedido) {
  return new Promise((resolve, reject) => {
    pedido.fechaPedido = new Date()

    store
      .add(pedido)
      .then((result) => {
        // Crear detalle de pedido //
        try {
          for (let i = 0; pedido.detalles.length > i; i++) {
            storeDetalle.create(result._id, pedido.detalles[i])
          }
          return resolve({ code: 201, pedido: result })
        } catch (err) {
          reject({ code: 500, message: err.message })
        }

        // resolve({
        //   code: 201,
        //   pedido: result
        // })
      })
      .catch((err) => reject({ code: 500, message: err.message }))
  })
}

// Listar todos los pedidos
async function listOrders () {
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

// Obtener pedido por Id
async function getOrderById (codigo) {
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

// Actualizar estdo de Pedido
async function updateState (codigo, state) {
  return new Promise((resolve, reject) => {
    if (!StatusEnum.includes(state.estado)) {
      reject({
        codigo: 500,
        message: 'El estatus es incorrecto'
      })
    }

    store
      .change(codigo, state)
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

// Eliminar Pedido
async function orderDelete (codigo) {
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

async function SearchOrders (query) {
  return new Promise(async (resolve, reject) => {
    const { fechaRegistro } = query

    const fechas = fechaRegistro.split(',')
    const inicio = getDate(fechas[0] + 'T00:00:00')
    const fin = getDate(fechas[1] + 'T23:59:59')

    const resultadosBD = await store.search()

    const pedidosEncontrados = resultadosBD.filter(pedido => {
      const fEmision = getDate(pedido.fechaPedido)

      return fEmision >= inicio && fEmision <= fin
    })

    resolve({
      code: 200,
      data: pedidosEncontrados
    })
  })
}

module.exports = {
  crearPedido,
  listOrders,
  getOrderById,
  updateState,
  orderDelete,
  SearchOrders
}
