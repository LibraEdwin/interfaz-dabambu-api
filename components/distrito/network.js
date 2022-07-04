const { Router } = require('express')
const { listarDistritos, obtenerDistrito } = require('./controller')
const response = require('../../network/response')

const router = Router()

// Listar distritos

router.get('/', async (req, res) => {
    listarDistritos()
    .then(data => 
        response.success(req, res, data, 200)
    )
    .catch(err => 
        response.error(req,res, err, 500))
})


// Obtener distrito por id

router.get('/:codigo', async (req, res) => {

    const { codigo } = req.params

    obtenerDistrito(codigo)
    .then(data => 
        response.success(req, res, data, 200)
    )
    .catch(err => 
        response.error(req,res, err, 500))
})

module.exports = router