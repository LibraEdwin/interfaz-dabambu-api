const ModelDepartamento = require('./model')
const ModelProvincia = require('../provincia/model')

const listarDepartamentos = async () => {
    return await ModelDepartamento.find()
}

const obtenerDepartamento = async (codigo) => {
    return await ModelDepartamento.findOne({ _id: codigo })
}

const obtenerProvincias = async (codigo) => {
    return await ModelProvincia.find({ departamentoId: codigo })
}

module.exports = {
    listar: listarDepartamentos,
    obtener: obtenerDepartamento,
    filtrar: obtenerProvincias
}
