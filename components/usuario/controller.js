const store = require('./store')
const { validateUserCreate, passwordsMatch } = require('./services')
const jwt = require('jsonwebtoken')
const { config } = require('../../config')

// Login usuario
async function loginUsuario (req, res) {
  const { username, password } = req.user

  const usuarioLogeado = await store.signIn(username, password)

  /* Validar correo y contrasena */
  if (!usuarioLogeado) {
    return res.status(401).json({
      codigo: 401,
      mensaje: 'Datos invalidos'
    })
  }

  if (!await passwordsMatch(password, usuarioLogeado.password)) {
    return res.status(401).json({
      codigo: 401,
      mensaje: 'Datos no validos'
    })
  }

  /* Generar Token */
  const payload = {
    usuario: {
      _id: usuarioLogeado._id,
      email: usuarioLogeado.correo,
      nombre: usuarioLogeado.nombre
    }
  }

  const token = jwt.sign(
    payload,
    config.JWT.SECRET,
    { expiresIn: config.JWT.EXPIRE_TOKEN_IN }
  )

  /* Retornar Token */
  return res.status(200).json({
    codigo: 200,
    token: token
  })
}

// Crear usuario
function addUsuario (usuario) {
  return new Promise(async (resolver, rechazar) => {

    const errores = await validateUserCreate(usuario)

    if (errores.length > 0) {
      rechazar({
        codigo: 400,
        mensaje: errores
      })
    }

    store.add(usuario)
      .then(data => {
        return resolver({
          codigo: 200,
          usuario: data,
        })
      })
      .catch(error => {
        return rechazar({
          codigo: 400,
          mensaje: error.message,
        })
      })
  })
}

// Listar usuarios
async function listUsuarios () {
  return new Promise((resolver, rechazar) => {
    store
      .list()
      .then((result) => {
        resolver({
          codigo: 200,
          usuarios: result
        })
      })
      .catch((error) => {
        rechazar({
          codigo: 500,
          mensaje: error.message
        })
      })
  })
}

// Obtener usuario
function obtenerUsuario (codigo) {
  return new Promise((resolver, rechazar) => {
    store
      .get(codigo)
      .then(user => {
        resolver({
          codigo: 200,
          usuario: user
        })
      })
      .catch(err => {
        rechazar({
          codigo: 400,
          mensaje: err
        })
      })
  })
}

function updateUsuario (codigo, usuario) {
  return new Promise(function (resolver, rechazar) {
    if (!codigo) {
      rechazar("Datos invalidos")
      return false
    }
    resolver(store.update(codigo, usuario))
  })
}

function deleteUsuario (codigo) {
  return new Promise(function(resolver, rechazar) {

    store
      .delete(codigo)
      .then(data => {
        resolver({
          codigo: 200,
          body: data
        })
      })
      .catch(err => {
        rechazar({
          codigo: 400,
          mensaje: err
        })
      })
  })
}

module.exports = {
  addUsuario,
  listUsuarios,
  updateUsuario,
  deleteUsuario,
  obtenerUsuario,
  loginUsuario
}
