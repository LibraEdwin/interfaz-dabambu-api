const ClienteModel = require('./model')

async function todos () {
  return await ClienteModel.find({ esEliminado: false }).select('-password -createdAt -updatedAt -__v -esEliminado')
}

async function findById (id) {
  const cliente = await ClienteModel
    .findOne({ _id: id, esEliminado: false })
    .populate('distrito')
    .select('-password -createdAt -updatedAt -__v -esEliminado')

  if (!cliente) {
    return null
  }

  return cliente
}

async function create ({ _id, nombre, celular, distrito, direccion, password, documento }) {
  const passwordCifrado = await ClienteModel.cifrarPassword(password)

  const nuevoCliente = new ClienteModel({
    _id,
    nombre,
    celular,
    distrito,
    direccion,
    documento,
    password: passwordCifrado
  })

  return await nuevoCliente.save()
}

async function update (id, cliente) {
  const { nombre, celular, distrito, direccion, documento, password } = cliente

  const clienteActualizado = await ClienteModel.findOneAndUpdate(
    { _id: id, esEliminado: false },
    {
      nombre,
      celular,
      distrito,
      direccion,
      password,
      documento
    },
    {
      new: true,
      runValidation: true
    }
  ).select('-password -createdAt -updatedAt -__v -esEliminado')

  if (!clienteActualizado) {
    return null
  }

  return clienteActualizado
}

async function remove (id) {
  const result = await ClienteModel.findOneAndUpdate(
    { _id: id, esEliminado: false },
    { esEliminado: true },
    {
      rawResult: true // Return the raw result from the MongoDB driver
    }
  )
  return result.lastErrorObject.updatedExisting
}

async function emailExists (email) {
  return await ClienteModel.exists({ _id: email })
}

async function find (query) {
  const finalQuery = { esEliminado: false }

  // Buscar por nombre
  if (query.nombre) {
    finalQuery.nombre = {
      $regex: query.nombre,
      $options: 'i'
    }
  }

  if (query.fechas) {
    const rango = query.fechas.split(',')
    const min = new Date(`${rango[0]}T00:00:00.000Z`)
    const max = new Date(`${rango[1]}T23:59:59Z`)

    finalQuery.createdAt = {
      $gte: min,
      $lte: max
    }
  }

  // console.log(finalQuery)
  return await ClienteModel.find(finalQuery)
    .populate('distrito')
    .select('-password -updatedAt -__v -esEliminado')
}

async function signIn (correo) {
  const usuarioEncontrado = await ClienteModel.findOne({ _id: correo, esEliminado: false }).select('-createdAt -updatedAt -__v -esEliminado')

  if (!usuarioEncontrado) return null

  return usuarioEncontrado
}

module.exports = {
  todos,
  create,
  findById,
  update,
  remove,
  emailExists,
  find,
  signIn
}
