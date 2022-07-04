
const bcrypt = require('bcryptjs')

async function encryptPassword (password) {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

async function comparePassword (password, passwordRecibido) {
  return await bcrypt.compare(passwordRecibido, password)
}

function validatePassword (password) {
  const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

  if (!password) {
    return 'La contraseña es requerida'
  }

  if (!regexPassword.test(password)) {
    return 'La contraseña debe tener mínimo 8 catacteres, una mayúscula, un número y un caracter especial'
  }

  return null
}

async function validateEmail (correo) {
  const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (!correo) {
    return 'El email es requerido'
  }

  if (!regexEmail.test(correo)) {
    return 'El email ingresado tiene un formato incorrecto'
  }

  return null
}

async function validateUserCreate (user) {
  const { correo, password } = user
  const errores = []

  const errorEmail = await validateEmail(correo)
  const errorPassword = validatePassword(password)

  if (errorEmail) {
    errores.push(errorEmail)
  }
  if (errorPassword) {
    errores.push(errorPassword)
  }

  return errores
}

async function esEmail (email) {
  const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return regexEmail.test(email)
}

async function passwordsMatch (password, passwordEncrypted) {
  return await comparePassword(passwordEncrypted, password)
}

module.exports = {
  encryptPassword,
  comparePassword,
  validateUserCreate,
  esEmail,
  passwordsMatch
}
