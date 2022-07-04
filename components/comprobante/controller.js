const { single, multiple } = require('./dto')
const StoreComprobante = require('./store')
const ComprobanteModel = require('./model')
const { getDate } = require('../../utils/functions')

const index = () => {
  return new Promise((resolve, reject) => {
    StoreComprobante.obtenerTodos()
      .then(lista => {
        return resolve({
          codigo: 200,
          lista: multiple(lista)
        })
      })
      .catch(err => {
        return reject({
          codigo: 500,
          mensaje: err.message
        })
      })
  })
}

const obtenerComprobante = (id) => {
  return new Promise((resolve, reject) => {
    StoreComprobante.obtenerPorId(id)
      .then(comprobante => {
        if (!comprobante) {
          return reject({
            codigo: 400,
            mensaje: 'No se encontró el comprobante'
          })
        }

        return resolve({
          codigo: 200,
          comprobante: single(comprobante)
        })
      })
      .catch(err => {
        return reject({
          codigo: 500,
          mensaje: err.message
        })
      })
  })
}

const anularComprobante = (id) => {
  return new Promise((resolve, reject) => {
    StoreComprobante.anular(id)
      .then(comprobante => {
        if (!comprobante) {
          return reject({
            codigo: 400,
            mensaje: 'No se encontró el comprobante'
          })
        }

        return resolve({
          codigo: 200,
          mensaje: 'Se canceló el comprobante'
        })
      })
      .catch(err => {
        return reject({
          codigo: 500,
          mensaje: err.message
        })
      })
  })
}

const agregarcomprobante = (comprobante) => {
  return new Promise((resolve, reject) => {
    comprobante.fechaEmision = new Date()
    comprobante.fechaCancelacion = new Date()

    StoreComprobante.crear(comprobante)
      .then(comprobanteCreado => {
        return resolve({
          codigo: 201,
          comprobante: single(comprobanteCreado)
        })
      })
      .catch(err => {
        return reject({
          codigo: 500,
          mensaje: err.message
        })
      })
  })
}

const eliminarComprobante = (id) => {
  return new Promise((resolve, reject) => {
    StoreComprobante.eliminar(id)
      .then(comprobante => {
        if (!comprobante) {
          return reject({
            codigo: 400,
            mensaje: 'No se encontró el comprobante'
          })
        }

        return resolve({
          codigo: 200,
          mensaje: 'Se eliminó el comprobante'
        })
      })
      .catch(err => {
        return reject({
          codigo: 500,
          mensaje: err.message
        })
      })
  })
}

const buscarPorPedido = (idPedido) => {
  return new Promise((resolve, reject) => {
    StoreComprobante.obtenerPorIdPedido(idPedido)
      .then(comprobante => {
        if (!comprobante) {
          return reject({
            codigo: 400,
            mensaje: 'No se encontró el comprobante con el id de pedido ' + idPedido
          })
        }

        return resolve({
          codigo: 200,
          comprobante: single(comprobante)
        })
      })
      .catch(err => {
        return reject({
          codigo: 500,
          mensaje: err.message
        })
      })
  })
}

const buscar = (query) => {
  return new Promise(async (resolve, reject) => {
    const { fechaRegistro } = query

    const fechas = fechaRegistro.split(',')
    const inicio = getDate(fechas[0] + 'T00:00:00')
    const fin = getDate(fechas[1] + 'T23:59:59')

    const resultadosBD = await StoreComprobante.obtenerTodos()

    const comprobantesEncontrados = resultadosBD.filter(comprobante => {
      const fEmision = getDate(comprobante.fechaEmision)

      return fEmision >= inicio && fEmision <= fin
    })

    resolve({
      codigo: 200,
      comprobantes: multiple(comprobantesEncontrados)
    })
  })
}

const buscarPorNombreCliente = (nombreCliente) => {
  return new Promise((resolve, reject) => {
    resolve({
      codigo: 200,
      comprobante: nombreCliente
    })
  })
}

module.exports = {
  index,
  obtenerComprobante,
  eliminarComprobante,
  agregarcomprobante,
  buscarPorPedido,
  anularComprobante,
  buscar,
  buscarPorNombreCliente
}
