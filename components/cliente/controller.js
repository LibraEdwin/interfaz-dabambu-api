const {
  validarCliente,
  validarClienteActualizado,
  encryptPassword,
  esEmail,
  passwordsMatch
} = require('./services')
const store = require('./store')
const jwt = require('jsonwebtoken')
const { config } = require('../../config')

async function listaClientes (req, res) {
  const lista = await store.todos()

  return res.status(200).json({
    codigo: 200,
    data: lista
  })
}

async function clientePorID (req, res) {
  const { id } = req.params

  const clienteEncontrado = await store.findById(id)

  if (!clienteEncontrado) {
    return res.status(404).json({ codigo: 404, error: 'No se encontró al cliente' })
  }

  return res.status(200).json({
    codigo: 200,
    data: clienteEncontrado
  })
}

async function crearCliente (req, res) {
  const cliente = req.body
  const erroresValidacion = await validarCliente(cliente)

  if (erroresValidacion.length > 0) {
    return res.status(400).json({
      codigo: 400,
      errores: erroresValidacion
    })
  }

  const nuevoUsuario = await store.create(cliente)

  return res.status(201).json({
    codigo: 201,
    data: nuevoUsuario
  })
}

async function editarCliente (req, res) {
  const { id } = req.params
  const cliente = req.body

  const erroresValidacion = await validarClienteActualizado(cliente)

  if (erroresValidacion.length > 0) {
    return res.status(400).json({ erroresValidacion })
  }

  if (cliente.password) {
    cliente.password = await encryptPassword(cliente.password)
  }

  const clienteActualizado = await store.update(id, cliente)

  if (!clienteActualizado) {
    return res.status(404).json({ codigo: 404, error: 'No se encontró al usuario' })
  }

  return res.status(200).json({ codigo: 200, data: clienteActualizado })
}

async function eliminarCliente (req, res) {
  const { id } = req.params

  const cliente = await store.remove(id)

  if (!cliente) {
    return res.status(404).json({ codigo: 404, error: 'No se encontró al cliente' })
  }

  return res.status(200).json({
    codigo: 200,
    mensaje: 'Se eliminó el cliente'
  })
}

async function buscarCliente (req, res) {
  const { query } = req
  const whiteList = [
    '_id',
    'nombre',
    'fechas'
  ]

  Object.getOwnPropertyNames(query).forEach(key => {
    if (!whiteList.includes(key) || query[key] === '') {
      delete query[key]
    }
  })

  if (Object.keys(query).length === 0) {
    return res.status(400).json({ codigo: 400, error: 'No se realizó ninguna busqueda' })
  }

  const resultado = await store.find(query)

  return res.status(200).json({
    codigo: 200,
    data: resultado
  })
}

async function login (req, res) {
  const { username, password } = req.user

  if (!esEmail(username)) {
    return res.status(400).json({ codigo: 400, error: 'No es un correo electrónico' })
  }

  const usuarioLogeado = await store.signIn(username, password)

  if (!usuarioLogeado) {
    return res.status(401).json({
      codigo: 401,
      mensaje: 'Correo inválido'
    })
  }

  if (!await passwordsMatch(password, usuarioLogeado.password)) {
    return res.status(401).json({
      codigo: 401,
      mensaje: 'La contraseña es incorrecta'
    })
  }

  const payload = {
    usuario: {
      _id: usuarioLogeado._id,
      celular: usuarioLogeado.celular,
      nombre: usuarioLogeado.nombre
    }
  }

  const token = jwt.sign(
    payload,
    config.JWT.SECRET,
    { expiresIn: config.JWT.EXPIRE_TOKEN_IN }
  )

  return res.status(200).json({
    codigo: 200,
    token
  })
}

async function logout (req, res) {
  res.cookie('token', '', {
    expires: new Date(0),
    path: '/'
  })
}

module.exports = {
  listaClientes,
  clientePorID,
  crearCliente,
  editarCliente,
  eliminarCliente,
  buscarCliente,
  login,
  logout
}
