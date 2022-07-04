const StoreNotaVenta = require('./store')

const crearNotaventa = (data) => {
  return new Promise((resolve, reject) => {
    StoreNotaVenta.crear(data)
      .then(notaCreada => {
        return resolve({
          codigo: 201,
          notaVenta: notaCreada
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

module.exports = {
  crearNotaventa
}
