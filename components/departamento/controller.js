const store = require('./store')

const listarDepartamentos = async () => {
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

const obtenerDepartamento = async (codigo) => {
    return new Promise((resolver, rechazar) => {
        if(!codigo) {
            rechazar('No existe el codigo')
        }
        resolver(store.obtener({ _id: codigo }))
    })
}

const obtenerProvincias = async (codigo) => {
    return new Promise((resolver, rechazar) => {
        if(!codigo) {
            rechazar('No hay datos')
        }
        resolver(store.filtrar({ _id: codigo }))
    })
}

module.exports = {
    listarDepartamentos,
    obtenerDepartamento,
    obtenerProvincias
}