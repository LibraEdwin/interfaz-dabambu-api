const { Router } = require('express')
const response = require('../../network/response')
const NotaVentaController = require('./controller')

const router = Router()

router.post('/', async (req, res) => {
  const data = req.body
  NotaVentaController.crearNotaventa(data)
    .then(data => response.success(req, res, data.notaVenta, data.codigo))
    .catch(err => response.error(req, res, err.mensaje, 500))
})

module.exports = router
