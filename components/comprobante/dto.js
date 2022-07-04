const { getDate } = require('../../utils/functions')

const single = (resource) => {
  return {
    _id: resource._id,
    pedidoId: resource.pedidoId,
    fechaEmision: getDate(resource.fechaEmision),
    fechaCancelacion: getDate(resource.fechaCancelacion),
    esEliminado: false,
    estadoCobro: resource.estadoCobro,
    tipoCobro: resource.tipoCobro
    // createdAt: getDate(resource.createdAt),
    // updatedAt: getDate(resource.updatedAt)
  }
}

const multiple = (resources) => {
  return resources.map(resource => single(resource))
}

module.exports = {
  single,
  multiple
}
