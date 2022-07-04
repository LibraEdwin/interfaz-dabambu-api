const express = require('express')
const response = require('../../network/response')
const {
  addOrderDetail,
  listOrderDetail,
  getOrderDetailById,
  updateOrderDetail,
  orderDetailDelete,
  getOrderDetailByOrderId,
  searchOrderDetail
} = require('./controller')
const router = express.Router()

// Create order detail
router.post('/', async (req, res) => {
  const data = req.body

  addOrderDetail(data)
    .then((result) => response.success(req, res, result.data, result.code))
    .catch((error) => response.error(req, res, error.message, error.code))
})

// Get all order detail
router.get('/', async (req, res) => {
  listOrderDetail()
    .then((result) => response.success(req, res, result.data, result.code))
    .catch((error) => response.error(req, res, error.message, error.code))
})

router.get('/buscar', async (req, res) => {
  searchOrderDetail(req.query)
    .then((result) => response.success(req, res, result.data, result.code))
    .catch((error) => response.error(req, res, error.message, error.code))
})

// Get order detail by id
router.get('/:codigo', async (req, res) => {
  const { codigo } = req.params

  getOrderDetailById(codigo)
    .then((result) => response.success(req, res, result.data, result.code))
    .catch((error) => response.error(req, res, error.message, error.code))
})

// Get order detail by PedidoID
router.get('/pedidoId/:codigo', async (req, res) => {
  const { codigo } = req.params

  getOrderDetailByOrderId(codigo)
    .then((result) => response.success(req, res, result.data, result.code))
    .catch((error) => response.error(req, res, error.message, error.code))
})

// Update order detail by id
router.patch('/:codigo/update', async (req, res) => {
  const { codigo } = req.params
  const data = req.body

  updateOrderDetail(codigo, data)
    .then((result) => response.success(req, res, result.data, result.code))
    .catch((error) => response.error(req, res, error.message, error.code))
})

// Delete order detail
router.delete('/:codigo/delete', async (req, res) => {
  const { codigo } = req.params

  orderDetailDelete(codigo)
    .then((result) => response.success(req, res, result.data, result.code))
    .catch((error) => response.error(req, res, error.message, error.code))
})

module.exports = router
