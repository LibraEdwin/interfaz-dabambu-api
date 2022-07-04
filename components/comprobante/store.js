const ComprobanteModel = require('./model')

const obtenerTodos = async () => {
  return await ComprobanteModel
    .find({ esEliminado: false })
    .populate({
      path: 'pedidoId',
      match: { esEliminado: false },
      populate: [
        {
          path: 'clienteId',
          model: 'Cliente'
        }
      ]
    })
}

const obtenerPorId = async (id) => {
  return await ComprobanteModel
    .findOne({ _id: id, esEliminado: false })
    .populate({
      path: 'pedidoId',
      match: { esEliminado: false },
      populate: [
        {
          path: 'clienteId',
          model: 'Cliente',
          populate: [
            {
              path: 'distrito',
              model: 'Distrito',
              populate: [
                {
                  path: 'provinciaId',
                  model: 'Provincia'
                }

              ]
            }
          ]
        }
      ]
    })
}

const obtenerPorIdPedido = async (idPedido) => {
  return await ComprobanteModel.findOne({ pedidoId: idPedido, esEliminado: false })
}

const crear = async (data) => {
  const _id = await obtenerCodigoCorrelativo()
  const nuevo = new ComprobanteModel({ _id, ...data })

  return await nuevo.save()
}

async function anular (id) {
  const result = await ComprobanteModel.findOneAndUpdate(
    { _id: id, esEliminado: false },
    { fechaCancelacion: new Date() },
    {
      rawResult: true // Return the raw result from the MongoDB driver
    }
  )
  return result.lastErrorObject.updatedExisting
}

async function eliminar (id) {
  const result = await ComprobanteModel.findOneAndUpdate(
    { _id: id, esEliminado: false },
    { esEliminado: true },
    {
      rawResult: true // Return the raw result from the MongoDB driver
    }
  )
  return result.lastErrorObject.updatedExisting
}

async function obtenerCodigoCorrelativo () {
  const totalDocumentos = await ComprobanteModel.countDocuments()
  return totalDocumentos + 1
}

module.exports = {
  obtenerTodos,
  obtenerPorId,
  crear,
  eliminar,
  obtenerCodigoCorrelativo,
  obtenerPorIdPedido,
  anular
}
