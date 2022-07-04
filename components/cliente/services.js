const bcrypt = require('bcryptjs')
const { Types } = require('mongoose')
const store = require('./store')
const storeDistrito = require('../distrito/store')
const UserModel = require('./model')

async function encryptPassword (password) {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

async function comparePassword (password, passwordReceived) {
  // return await bcrypt.compare(passwordReceived, password)

  console.log('COMPARAR CONTRASEÑAS')
}

async function validateId (id) {
  return Types.ObjectId.isValid(id)
}

async function validarCliente ({ _id, nombre, celular, distrito, direccion, password, documento }) {
  const errores = []

  if (!_id || !nombre || !celular || !distrito || !direccion || !password || !documento) {
    errores.push('Por favor verificar que todos los campos estén completos')
  }

  if (await store.emailExists(_id)) {
    errores.push('El email ya se encuentra registrado')
  }

  if (!await storeDistrito.existe(distrito)) {
    errores.push('El distrito es incorrecto')
  }

  return errores
}

async function validarClienteActualizado ({ nombre, celular, distrito, direccion, password, documento }) {
  const errores = []

  if (celular && celular === '') {
    errores.push('El número de celular no puede estar vacío')
  }

  return errores
}

async function esEmail (email) {
  const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return regexEmail.test(email)
}

async function passwordsMatch (password, passwordEncrypted) {
  return await UserModel.compararPassword(passwordEncrypted, password)
}

module.exports = {
  validarCliente,
  validarClienteActualizado,
  validateId,
  encryptPassword,
  comparePassword,
  esEmail,
  passwordsMatch
}
