const express = require('express')
const { addUsuario, listUsuarios, updateUsuario, deleteUsuario, obtenerUsuario, loginUsuario } = require('./controller')
const response = require('../../network/response')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const { config } = require('../../config')

// Basic strategy
require('../../utils/auth/strategies/Basic')
// JWt strategy
require('../../utils/auth/strategies/jwt')

const router = express.Router()

// Login usuario
router.post('/login', passport.authenticate('basic', { session: false }), loginUsuario)

// Logout usuario
router.post('/logout', function (req, res) {
  res.cookie('token', '', {
    expires: new Date(0),
    path: '/'
  })
})

// List Usuario
router.get('/', passport.authorize('jwt', { session: false }), function (req, res) {
  listUsuarios()
    .then((data) => {
      response.success(req, res, data.usuarios, data.codigo)
    })
    .catch((err) => {
      console.log(err, 'errorrrr')
      response.error(req, res, err.mensaje, err.codigo)
    })
})

// Get Usuario
router.get('/:codigo', function (req, res) {
  const { codigo } = req.params

  obtenerUsuario(codigo)
    .then((data) => {
      response.success(req, res, data.usuario, data.codigo)
    })
    .catch((err) => {
      response.error(req, res, err.mensaje, err.codigo)
    })
})

// Add Usuario
router.post('/', passport.authorize('jwt', { session: false }), async (req, res) => {
  const dataUser = req.body

  await addUsuario(dataUser)
    .then((data) => {
      response.success(req, res, data.usuario, data.codigo)
    })
    .catch((error) => {
      response.error(req, res, error.mensaje, error.codigo)
    })
})

// Update Usuario
router.patch('/:codigo', passport.authorize('jwt', { session: false }), function (req, res) {
  updateUsuario(req.params.codigo, req.body)
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch((e) => {
      response.error(req, res, 'Error interno', 500, e)
    })
})

// Delete Usuario
router.delete('/:codigo', passport.authorize('jwt', { session: false }), async (req, res) => {
  const { codigo } = req.params

  await deleteUsuario(codigo)
    .then((data) => {
      response.success(req, res, data.body, data.codigo)
    })
    .catch((e) => {
      response.error(req, res, e.mensaje, e.codigo)
    })
})

module.exports = router
