const Model = require('./model')
const ModelDepartamento = require('./model')

const listarDistritos = async () => {
  return await Model.find()
}

const obtenerDistrito = async (codigo) => {
  return await Model.findOne({ _id: codigo })
    .populate('provinciaId')
    .populate('departamentoId')
}

const existeDistrito = async (codigo) => {
  return await Model.exists({ _id: codigo })
}

module.exports = {
  listar: listarDistritos,
  obtener: obtenerDistrito,
  existe: existeDistrito
}
