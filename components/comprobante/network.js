const { Router } = require('express')
const ControllerComprobante = require('./controller')
const response = require('../../network/response')
const ComprobanteModel = require('./model')
const { multiple } = require('./dto')

const router = Router()

router.get('/', async (req, res) => {
  ControllerComprobante.index()
    .then(data => response.success(req, res, data.lista, data.codigo))
    .catch(err => response.error(req, res, err.mensaje, 500))
})

router.get('/pedido/:id', async (req, res) => {
  const { id } = req.params

  ControllerComprobante.buscarPorPedido(id)
    .then(data => response.success(req, res, data.lista, data.codigo))
    .catch(err => response.error(req, res, err.mensaje, 500))
})

router.get('/buscar', async (req, res) => {
  ControllerComprobante.buscar(req.query)
    .then(data => response.success(req, res, data.comprobantes, data.codigo))
    .catch(err => response.error(req, res, err.mensaje, 500))
})

router.get('/cliente', async (req, res) => {
  const { nombre } = req.query
  ControllerComprobante.buscarPorNombreCliente(nombre)
    .then(data => response.success(req, res, data.comprobante, data.codigo))
    .catch(err => response.error(req, res, err.mensaje, 500))
})

router.patch('/anular', async (req, res) => {
  const { id } = req.params
  ControllerComprobante.anularComprobante(id)
    .then(data => response.success(req, res, data.mensaje, data.codigo))
    .catch(err => response.error(req, res, err.mensaje, 500))
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  ControllerComprobante.obtenerComprobante(id)
    .then(data => response.success(req, res, data.comprobante, data.codigo))
    .catch(err => response.error(req, res, err.mensaje, 500))
})

router.post('/', async (req, res) => {
  const data = req.body

  ControllerComprobante.agregarcomprobante(data)
    .then(data => response.success(req, res, data.comprobante, data.codigo))
    .catch(err => response.error(req, res, err.mensaje, 500))
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  ControllerComprobante.eliminarComprobante(id)
    .then(data => response.success(req, res, data.mensaje, data.codigo))
    .catch(err => response.error(req, res, err.mensaje, 500))
})

module.exports = router
