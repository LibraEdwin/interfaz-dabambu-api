const express = require('express')
const response = require('../../network/response')
const { crearPedido, listOrders, getOrderById, updateState, orderDelete, SearchOrders, UpdateStatusOrderById } = require('./controller')

const router = express.Router()

// Create order
router.post('/', async (req, res) => {
  const data = req.body

  crearPedido(data)
    .then((result) => response.success(req, res, result.pedido, result.code))
    .catch((error) => response.error(req, res, error.message, error.code))
})

// Get all orders
router.get('/', async (req, res) => {
  listOrders()
    .then((result) => response.success(req, res, result.data, result.code))
    .catch((error) => response.error(req, res, error.message, error.code))
})

// Get all orders
router.get('/buscar', async (req, res) => {
  SearchOrders(req.query)
    .then((result) => response.success(req, res, result.data, result.code))
    .catch((error) => response.error(req, res, error.message, error.code))
})

// Get order by id
router.get('/:codigo', async (req, res) => {
  const { codigo } = req.params

  getOrderById(codigo)
    .then((result) => response.success(req, res, result.data, result.code))
    .catch((error) => response.error(req, res, error.message, error.code))
})

// Change state by id
router.patch('/:codigo', async (req, res) => {
  const { codigo } = req.params
  const state = req.body

  updateState(codigo, state)
    .then((result) => response.success(req, res, result.data, result.code))
    .catch((error) => response.error(req, res, error.message, error.code))
})

// Delete order
router.delete('/:codigo/delete', async (req, res) => {
  const { codigo } = req.params

  orderDelete(codigo)
    .then((result) => response.success(req, res, result.data, result.code))
    .catch((error) => response.error(req, res, error.message, error.code))
})

module.exports = router
