const store = require('./store')

const listarDistritos = async () => {
    return new Promise((resolver, rechazar) => {
        store.listar()
        .then(resultados => {
            resolver(resultados)
        })
        .catch(error => {
            return rechazar(error)
        })
    })
}

const obtenerDistrito = async (codigo) => {
    return new Promise((resolver, rechazar) => {
        if(!codigo) {
            rechazar('No existe el codigo')
        }
        resolver(store.obtener({ _id: codigo }))
    })
}

module.exports = {
    listarDistritos,
    obtenerDistrito
}