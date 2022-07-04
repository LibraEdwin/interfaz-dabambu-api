const express = require('express')
const router = express.Router()
const response = require('../../network/response')
const path = require('path')
const { isValidFiles, validFilesUpdate } = require('../../middlewares/files')
const passport = require('passport')
// JWt strategy
require('../../utils/auth/strategies/jwt')

const {
  listProducto,
  addProducto,
  obtenerProducto,
  updateProducto,
  deleteFotoAnexa,
  deleteProducto,
  filtrarProductosCategoria
} = require('./controller')

/**
 * Add Productos
 */
router.post('/', passport.authorize('jwt', { session: false }), isValidFiles, (req, res) => {
  const dataProduct = req.body
  const files = req.files
  addProducto(dataProduct, files)
    .then(data => response.success(req, res, data, 200))
    .catch(err => response.error(req, res, err, 500))
})

// List productos

router.get('/', function (req, res) {
  listProducto()
    .then((data) => {
      response.success(req, res, data, data.code)
    })
    .catch((error) => {
      response.error(req, res, error, error.code)
    })
})

// Obtener producto por id

router.get('/:codigo', function (req, res) {
  const { codigo } = req.params

  obtenerProducto(codigo)
    .then((data) => response.success(req, res, data, data.code))
    .catch((error) => response.error(req, res, error, error.code))
})

// List Productos por categoria
router.get('/categoria/:codigo', async (req, resp) => {
  const { codigo } = req.params

  filtrarProductosCategoria(codigo)
    .then((data) => {
      response.success(req, resp, data, data.codigo)
    })
    .catch((error) => response.error(req, resp, error.mensaje, error.codigo))
})

// UPDATE 2
router.patch('/:codigo', passport.authorize('jwt', { session: false }), validFilesUpdate, (req, res) => {
  const { codigo } = req.params

  const dataProduct = req.body
  const files = req.files

  updateProducto(codigo, dataProduct, files)
    .then(data => response.success(req, res, data, 200))
    .catch(err => response.error(req, res, err, 500))
})

// Delete producto

router.delete('/:codigo', passport.authorize('jwt', { session: false }), (req, res) => {
  const codigo = req.params.codigo

  deleteProducto(codigo)
    .then(async (data) => {
      await deleteFolder(`imagenesProducto/${codigo}`)
      response.success(req, res, 'Producto eliminado', 200)
    })
    .catch((e) => {
      response.error(req, res, 'Error Interno', 500, e)
    })
})

// Delete fotos anexas

router.patch('/:codigoProducto/anexas/:codigoFotoAnexa', (req, res) => {
  const codigoProducto = req.params.codigoProducto
  const codigoFotoAnexa = req.params.codigoFotoAnexa
  const nombreFolderProducto = path.join('./imagenesProducto/', codigoProducto)
  const nombreFotosAnexasFolder = `${nombreFolderProducto}` + '/anexas/'

  console.log("Entrando a endpoint fotos anexas")

  deleteFotoAnexa(codigoProducto, codigoFotoAnexa)
    .then((data) => {

      console.log("Entrando a deletefoto anexa")

      deleteFile(`${nombreFotosAnexasFolder}${codigoFotoAnexa}.png`)
      response.success(req, res, data, 200)
    })
    .catch((e) => {
      response.error(req, res, 'Error Interno', 500, e)
    })
})

module.exports = router
