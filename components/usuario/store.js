const Model = require('./model')
const { encryptPassword } = require('./services')

// Add Usuario
async function addUsuario (usuario) {
  const { _id, nombre, correo, password } = usuario

  const newUser = new Model({
    _id,
    nombre,
    correo,
    password: await encryptPassword(password)
  })

  return newUser.save()
}

// List Usuarios
async function listUsuarios () {
  return Model.find()
}

// Get Usuario
async function getUsuario (codigo) {
  const user = Model.findOne({ _id: codigo })
  return user
}

// Update Usuario
async function updateUsuario (codigo, usuario) {
  const new_usuario = await Model.findByIdAndUpdate({ _id: codigo }, usuario, { new: true })
  return new_usuario
}

// Delete Usuario
async function deleteUsuario (codigo) {
  return Model.findOneAndDelete({ _id: codigo })
}

// Find Usuario
async function findUsuario (item) {
  return await Model.find(item)
}

// Sign in
async function signIn (correo) {
  const usuarioEncontrado = await Model.findOne({ correo: correo }).select('-createdAt -updatedAt -__v')

  if (!usuarioEncontrado) return null

  return usuarioEncontrado
}

module.exports = {
  add: addUsuario,
  list: listUsuarios,
  get: getUsuario,
  update: updateUsuario,
  delete: deleteUsuario,
  find: findUsuario,
  signIn
}
