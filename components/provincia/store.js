const ModelProvincia = require('./model')
const ModelDistrito = require('../distrito/model')

const listarProvincias = async () => {
  return await ModelProvincia.find()
}

const obtenerProvincia = async (codigo) => {
  return await ModelProvincia.findOne({ _id: codigo })
    .populate('departamentoId')
}

const obtenerDistritos = async (codigo) => {
  return await ModelDistrito.find({ provinciaId: codigo })
}

module.exports = {
  listar: listarProvincias,
  obtener: obtenerProvincia,
  filtrar: obtenerDistritos
}
