const express = require('express')
const { addCategoria, listCategoria, updateCategoria, deleteCategoria, categorias } = require('./controller')
const response = require('../../network/response')

const router = express.Router()

// Add categoria

router.post('/', async (req, res) => {
  const data = req.body

  addCategoria(data)
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch((data) => {
      response.error(req, res, data, 500)
    })
})

// List categoria

router.get('/', async (req, res) => {
  categorias()
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch((err) => {
      response.error(req, res, data, 500, err)
    })
})

router.get('/:codigo', async (req, res) => {
  const { codigo } = req.params

  listCategoria(codigo)
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch((err) => {
      response.error(req, res, data, 500, err)
    })
})

// Update Categoria
router.patch('/:codigo', function (req, res) {
  const { codigo } = req.params
  const data = req.body

  updateCategoria(codigo, data)
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch((e) => {
      response.error(req, res, 'Error interno', 500, e)
    })
})

// Delete Categoria
router.delete('/:codigo', async (req, res) => {
  const { codigo } = req.params

  deleteCategoria(codigo)
    .then((data) => {
      response.success(req, res, 'Categoria eliminada', 200)
    })
    .catch((e) => {
      response.error(req, res, 'Error interno', 500, e)
    })
})

module.exports = router
