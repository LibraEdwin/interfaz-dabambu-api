const store = require('./store');

function addCategoria(categoria){

    return new Promise(async (resolver, rechazar)=> {
        if(!categoria){
          rechazar('No exsite datos')
        }

        const totalDocumentos = await store.totalDocumentos()
        categoria._id  = totalDocumentos + 1
        categoria.esEliminado = false
        resolver(store.add(categoria))
    })
}

function categorias () {
    return new Promise((resolver, rechazar) => {
        store.all()
        .then(resultados => {
            resolver(resultados)
        })
        .catch(err => {
            return rechazar(err.message)
        })
    })
}


function listCategoria(codigo){

    return new Promise((resolver, rechazar) =>{
        if(!codigo){
          rechazar('No existe datos')
        }
        resolver(store.list({ _id : codigo }))
    })
}


function updateCategoria(codigo, categoria){
    return new Promise(function(resolver,rechazar){
        if(!codigo){
            rechazar('No existen datos');
            return false;
        }
        resolver(store.update(codigo, categoria))
    })
}


function deleteCategoria(codigo){
    return new Promise(function(resolver, rechazar){
        if(!codigo){
            return rechazar('No existen datos')
        }

        resolver(store.delete(codigo))
    })
}


module.exports = {
    categorias,
    addCategoria,
    listCategoria,
    updateCategoria,
    deleteCategoria,
}