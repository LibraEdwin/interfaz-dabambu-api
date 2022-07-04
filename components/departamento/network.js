const { Router } = require('express')
const { listarDepartamentos, obtenerDepartamento, obtenerProvincias } = require('./controller')
const response = require('../../network/response')

const router = Router()

// Listar departamentos

router.get('/', async (req, res) => {
  listarDepartamentos()
    .then(data =>
      response.success(req, res, data, 200)
    )
    .catch(err =>
      response.error(req, res, err, 500))
})

// Obtener departamento por id

router.get('/:codigo', async (req, res) => {
  const { codigo } = req.params

  obtenerDepartamento(codigo)
    .then(data =>
      response.success(req, res, data, 200)
    )
    .catch(err =>
      response.error(req, res, err, 500))
})

// Obtener provincias por departamento

router.get('/:codigo/provincias', async (req, res) => {
  const { codigo } = req.params

  obtenerProvincias(codigo)
    .then(data =>
      response.success(req, res, data, 200)
    )
    .catch(err =>
      response.error(req, res, err, 500))
})

module.exports = router
