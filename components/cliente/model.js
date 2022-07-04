const { model, Schema } = require('mongoose')
const bcrypt = require('bcryptjs')

const ClienteSchema = new Schema({
  _id: String,
  nombre: String,
  celular: Number,
  distrito: {
    type: String,
    ref: 'Distrito'
  },
  documento: String,
  direccion: String,
  password: String,
  esEliminado: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

ClienteSchema.static('cifrarPassword', async (password) => {
  const salt = await bcrypt.genSalt(10)

  return await bcrypt.hash(password, salt)
})

/**
 * --------------------------------------------------------------------
 * Comparar Password
 * --------------------------------------------------------------------
 *
 * @param {password} string, password de la base de datos
 * @param {passwordRecibido} string, password enviada en la solicitud
 *
 * @return {boolean}
 */
ClienteSchema.static('compararPassword', async (password, passwordRecibido) => {
  return await bcrypt.compare(passwordRecibido, password)
})

module.exports = model('Cliente', ClienteSchema)
