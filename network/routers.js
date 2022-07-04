const producto = require('../components/producto/network')
const categoria = require('../components/categoriaProducto/network')
const usuario = require('../components/usuario/network')
const clientes = require('../components/cliente/network')
const departamento = require('../components/departamento/network')
const provincia = require('../components/provincia/network')
const distrito = require('../components/distrito/network')
const comprobante = require('../components/comprobante/network')
const notaVenta = require('../components/notaVenta/network')
const pedidos = require('../components/pedido/network')
const detalle = require('../components/detallePedido/network')

const routers = function (server) {
  server.use('/api-dabambu-service/producto', producto)
  server.use('/api-dabambu-service/categoria', categoria)
  server.use('/api-dabambu-service/usuario', usuario)
  server.use('/api-dabambu-service/clientes', clientes)
  server.use('/api-dabambu-service/departamentos', departamento)
  server.use('/api-dabambu-service/provincias', provincia)
  server.use('/api-dabambu-service/distritos', distrito)
  server.use('/api-dabambu-service/comprobantes', comprobante)
  server.use('/api-dabambu-service/notas-ventas', notaVenta)
  server.use('/api-dabambu-service/pedidos', pedidos)
  server.use('/api-dabambu-service/detallePedido', detalle)
}

module.exports = routers
