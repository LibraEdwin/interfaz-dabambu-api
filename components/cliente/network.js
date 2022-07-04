const { Router } = require('express')
const passport = require('passport')
const ClienteController = require('./controller')

const enrutador = Router()

enrutador.get('/', ClienteController.listaClientes)
enrutador.post('/login', passport.authenticate('basic', { session: false }), ClienteController.login)
enrutador.get('/logout', ClienteController.logout)
enrutador.get('/search', ClienteController.buscarCliente)
enrutador.get('/:id', ClienteController.clientePorID)
enrutador.post('/', ClienteController.crearCliente)
enrutador.patch('/:id', ClienteController.editarCliente)
enrutador.delete('/:id', ClienteController.eliminarCliente)

module.exports = enrutador
