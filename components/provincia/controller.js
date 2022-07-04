const store = require('./store')

const listarProvincias = async () => {
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

const obtenerProvincia = async (codigo) => {
    return new Promise((resolver, rechazar) => {
        if(!codigo) {
            rechazar('No existe el codigo')
        }
        resolver(store.obtener({ _id: codigo }))
    })
}

const obtenerDistritos = async (codigo) => {
    return new Promise((resolver, rechazar) => {
        if(!codigo) {
            rechazar('No existen datos')
        }
        resolver(store.filtrar({ _id: codigo }))
    })
}

module.exports = {
    listarProvincias,
    obtenerProvincia,
    obtenerDistritos
}