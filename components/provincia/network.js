const { Router } = require('express')
const { listarProvincias, obtenerProvincia, obtenerDistritos } = require('./controller')
const response = require('../../network/response')

const router = Router()

// Listar provincias

router.get('/', async (req, res) => {
    listarProvincias()
    .then(data => 
        response.success(req, res, data, 200)
    )
    .catch(err => 
        response.error(req,res, err, 500))
})


// Obtener provincia por id

router.get('/:codigo', async (req, res) => {

    const { codigo } = req.params

    obtenerProvincia(codigo)
    .then(data => 
        response.success(req, res, data, 200)
    )
    .catch(err => 
        response.error(req,res, err, 500))
})

// Obtener distritos por provincia

router.get('/:codigo/distritos', async (req, res) => {

    const { codigo } = req.params

    obtenerDistritos(codigo)
    .then(data => 
        response.success(req, res, data, 200)
    )
    .catch(err => 
        response.error(req,res, err, 500))
})

module.exports = router