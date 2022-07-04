const { restart } = require('nodemon')
const path = require('path')
const model = require('./model')

// Add producto

function addProducto (producto) {
  return new Promise(function (resolver, rechazar) {
    const nuevoProducto = new model(producto)

    nuevoProducto
      .save()
      .then((response) => {
        resolver(response)
      })
      .catch((error) => {
        rechazar(error)
      })
  })
}

// Listar productos

function listProducto () {
  return model.find({})
    .sort({ nombre: 1 })
    .populate('categoria')
    // .populate({
    //   path: "productosAccesorios",
    //   populate: { path: "productosAccesorios" },
    // })
}

// Obtener producto por id

function getProductById (codigo) {
  return model
    .findOne({ _id: codigo })
    .populate('categoria')
    .populate({
      path: 'productosAccesorios',
      populate: { path: 'productosAccesorios' }
    })
}

// Listar productos por categoria

const listProductByCategory = async (codigo) => {
  // const resultado = await model.find({ categoria: { _id: 11 } }).populate("categoria")
  const resultado = await model.find({ categoria: codigo })
  return resultado
}

// Update producto sin foto

function updateProducto (codigo, producto) {
  const doc_producto = model.findByIdAndUpdate({ _id: codigo }, producto, {
    new: true
  })
  return doc_producto
}

// Update producto con foto

function updateProductoConFoto (codigo, producto, indices) {
  if (indices) {
    const doc_producto = model.findOne({ _id: codigo }).then((result) => {
      const arrFotosAnexasFromDb = result.fotosAnexas
      const newArrFotosAnexasToSave = [...arrFotosAnexasFromDb]

      const arrPathFotosAnexasForUpdate = indices.map((indice) => {
        return `/app/${codigo}/anexas/${indice}.png`
      })

      arrPathFotosAnexasForUpdate.forEach((photoPath) => {
        const index = arrFotosAnexasFromDb.indexOf(photoPath)
        const doesNotExistInDb = index === -1
        if (doesNotExistInDb) {
          newArrFotosAnexasToSave.push(photoPath)
        }
      })

      const newProducto = {
        ...producto,
        fotosAnexas: newArrFotosAnexasToSave.sort()
      }

      const productoUpdated = model.findOneAndUpdate(
        { _id: codigo },
        newProducto,
        { new: true }
      )

      return productoUpdated
    })

    return doc_producto
  }

  if (producto.fotoProducto) {
    const doc_producto = model.findOne({ _id: codigo }).then((result) => {
      const newProducto = {
        ...producto,
        fotoProducto: result.fotoProducto,
        fotosAnexas: result.fotosAnexas
      }

      const productoUpdated = model.findOneAndUpdate(
        { _id: codigo },
        newProducto,
        { new: true }
      )
      return productoUpdated
    })
    return doc_producto
  }
}

// Delete producto

function deleteProducto (codigo) {
  return new Promise((resolver, rechazar) => {
    model.deleteOne({ _id: codigo }, (err, d) => {
      if (err) rechazar(err)
      if (d.deletedCount == 1) {
        resolver('Deleted Successfully')
      } else {
        rechazar('Producto no existe o ya fue eliminado')
      }
    })
  })
}

// Delete foto Anexas

function deleteFotoAnexa (codigoProducto, codigoFotoAnexa) {
  const doc_producto = model
    .findById({ _id: codigoProducto })
    .then((result) => {
      const arrayFotosAnexasFromDB = [...result.fotosAnexas]
      arrayFotosAnexasFromDB.map((fotoAnexaFromDB) => {
        const numberOfFotoAnexaFromDB = Number(
          fotoAnexaFromDB.substring(19, 20)
        )
        const codigoFotoAnexaToBeDeleted = Number(codigoFotoAnexa)

        if (numberOfFotoAnexaFromDB === codigoFotoAnexaToBeDeleted) {
          const indexOfFotoAnexaFromDB =
            arrayFotosAnexasFromDB.indexOf(fotoAnexaFromDB)
          arrayFotosAnexasFromDB.splice(indexOfFotoAnexaFromDB, 1)
        }
      })

      const newProducto = {
        ...result._doc,
        fotosAnexas: [...arrayFotosAnexasFromDB]
      }
      const productoUpdated = model.findOneAndUpdate(
        { _id: codigoProducto },
        newProducto,
        { new: true }
      )
      return productoUpdated
    })

  return doc_producto
}

module.exports = {
  add: addProducto,
  list: listProducto,
  get: getProductById,
  update: updateProducto,
  delete: deleteProducto,
  updateConFoto: updateProductoConFoto,
  deleteFoto: deleteFotoAnexa,
  filterCategory: listProductByCategory
}
