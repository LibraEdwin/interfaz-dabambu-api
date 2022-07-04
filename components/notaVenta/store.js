const NotaVentaModel = require('./model')

const crear = async (notaVenta) => {
  notaVenta._id = await obtenerCodigoCorrelativo()

  const nuevaNotaventa = new NotaVentaModel(notaVenta)
  return await nuevaNotaventa.save()
}

const obtenerCodigoCorrelativo = async () => {
  const totalDocumentos = await NotaVentaModel.countDocuments()

  return totalDocumentos + 1
}

module.exports = {
  crear,
  obtenerCodigoCorrelativo
}
