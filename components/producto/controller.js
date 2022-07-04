const store = require('./store')
const path = require('path')
const Bucket = require('../../storage/google')
const { DIR_TEMP, deleteFileTemp } = require('../../utils/uploadImg')
const { generateUrlName } = require('../../utils/functions')
const generate = require('nanoid/generate')

// const config = require('../../config').config

function addProducto (producto, files) {
  return new Promise(async function (resolve, reject) {
    if (!producto) {
      reject('No existe datos')
    }

    /**
      * Generamos el id random
      * @type {number}
      */
    const _id = generate('123456789', 10)

    const fileMain = files.fotoProducto[0]
    const fileAnexas = files.fotosAnexas

    if (fileMain) {
      const fileTempMain = path.join(DIR_TEMP, fileMain.filename)
      const destinationFolder = `uploads/products-dabambu/${_id}/`

      await Bucket.uploadFile('1.jpg', fileTempMain, destinationFolder)

      await deleteFileTemp(fileMain.filename)

      producto.fotoProducto = `/${destinationFolder}1.jpg`
    }

    if (fileAnexas) {
      const urls = []
      for (let i = 0; i < fileAnexas.length; i++) {
        const fileTempAnexa = path.join(DIR_TEMP, fileAnexas[i].filename)
        const destinationFolder = `uploads/products-dabambu/${_id}/anexas/`

        await Bucket.uploadFile(`${i + 2}.jpg`, fileTempAnexa, destinationFolder)
        await deleteFileTemp(fileAnexas[i].filename)

        urls.push(`/${destinationFolder}${i + 2}.jpg`)
      }

      producto.fotosAnexas = urls
    }

    producto._id = _id

    producto.nombreURL = generateUrlName(producto._id, producto.nombre)

    resolve(store.add(producto))
  })
}

// Listar productos

function listProducto () {
  return new Promise(function (resolve, reject) {
    resolve(store.list({}))
  })
}

// Obtener producto por id

function obtenerProducto (codigo) {
  return new Promise(function (resolve, reject) {
    store
      .get(codigo)
      .then((producto) => {
        if (!producto) {
          return reject({
            code: 404,
            message: `El codigo ${codigo} no existe`
          })
        }
        return resolve({ code: 200, body: producto })
      })
      .catch((error) => {
        return reject({ code: 500, message: error.message })
      })
  })
}

// Listar productos por categorias

const filtrarProductosCategoria = (codigo) => {
  return new Promise(async (resolve, reject) => {
    if (!codigo) {
      resolve(store.filterCategory({}))
    }
    resolve(store.filterCategory({ _id: codigo }))
  })
}

function updateProducto (codigo, producto, files) {
  return new Promise(async function (resolve, reject) {
    if (!codigo) {
      reject('Ingrese un código')
      return false
    }

    const foundProduct = await store.get(codigo)

    if (files.fotoProducto !== undefined) {
      const fileMain = files.fotoProducto[0]

      if (fileMain) {
        const fileTempMain = path.join(DIR_TEMP, fileMain.filename)
        const destinationFolder = `uploads/products-dabambu/${codigo}/`

        await Bucket.uploadFile('1.jpg', fileTempMain, destinationFolder)

        await deleteFileTemp(fileMain.filename)
      }
    }

    // console.log('ANTES DE REMOVER', foundProduct.fotosAnexas)

    if (producto.removeAnexa) {
      // console.log(producto.removeFileName)
      if (typeof producto.removeAnexa === 'string') {
        Bucket.deleteFile(`uploads/products-dabambu/${codigo}/anexas/`, producto.removeFileName)
        foundProduct.fotosAnexas[Number(producto.removeAnexa) - 1] = ''
      } else {
        producto.removeAnexa.forEach((anexaRemovida) => {
          foundProduct.fotosAnexas[Number(anexaRemovida) - 1] = ''
        })
      }
    }

    if (files.anexa1) {
      const fileAnexa1 = files.anexa1[0]

      if (fileAnexa1) {
        const fileAnexa1Tem = path.join(DIR_TEMP, fileAnexa1.filename)
        const destinationFolder = `uploads/products-dabambu/${codigo}/anexas/`

        await Bucket.uploadFile('2.jpg', fileAnexa1Tem, destinationFolder)

        await deleteFileTemp(fileAnexa1.filename)

        foundProduct.fotosAnexas[0] = `/${destinationFolder}2.jpg`
      }
    }

    if (files.anexa2) {
      const fileAnexa2 = files.anexa2[0]

      if (fileAnexa2) {
        const fileAnexa2Tem = path.join(DIR_TEMP, fileAnexa2.filename)
        const destinationFolder = `uploads/products-dabambu/${codigo}/anexas/`

        await Bucket.uploadFile('3.jpg', fileAnexa2Tem, destinationFolder)

        await deleteFileTemp(fileAnexa2.filename)

        foundProduct.fotosAnexas[1] = `/${destinationFolder}3.jpg`
      }
    }

    if (files.anexa3) {
      const fileAnexa3 = files.anexa3[0]

      if (fileAnexa3) {
        const fileAnexa3Tem = path.join(DIR_TEMP, fileAnexa3.filename)
        const destinationFolder = `uploads/products-dabambu/${codigo}/anexas/`

        await Bucket.uploadFile('4.jpg', fileAnexa3Tem, destinationFolder)

        await deleteFileTemp(fileAnexa3.filename)

        foundProduct.fotosAnexas[2] = `/${destinationFolder}4.jpg`
      }
    }

    if (files.anexa4) {
      const fileAnexa4 = files.anexa4[0]

      if (fileAnexa4) {
        const fileAnexa4Tem = path.join(DIR_TEMP, fileAnexa4.filename)
        const destinationFolder = `uploads/products-dabambu/${codigo}/anexas/`

        await Bucket.uploadFile('5.jpg', fileAnexa4Tem, destinationFolder)

        await deleteFileTemp(fileAnexa4.filename)

        foundProduct.fotosAnexas[3] = `/${destinationFolder}5.jpg`
      }
    }

    // console.log('DESPUES DE LA ELIMINACION', foundProduct.fotosAnexas)
    producto.fotosAnexas = foundProduct.fotosAnexas

    resolve(store.update(codigo, producto))
  })
}

// Con foto

function updateProductoConFoto (codigo, producto, indices) {
  return new Promise(function (resolve, reject) {
    if (!codigo) {
      reject('Datos invalido')
      return false
    }

    resolve(store.updateConFoto(codigo, producto, indices))
  })
}

function deleteProducto (codigo) {
  return new Promise(function (resolve, reject) {
    if (!codigo) {
      reject('No existe datos')
    } else {
      store
        .delete(codigo)
        .then((data) => {
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    }
  })
}

function deleteFotoAnexa (codigoProducto, codigoFotoAnexa) {
  console.log(
    'main code Controller',
    codigoProducto,
    'codigo foto',
    codigoFotoAnexa
  )

  return new Promise(function (resolve, reject) {
    if (!codigoProducto) {
      reject('No exsite datos')
    }
    resolve(store.deleteFoto(codigoProducto, codigoFotoAnexa))
  })
}

module.exports = {
  listProducto,
  addProducto,
  obtenerProducto,
  updateProducto,
  deleteProducto,
  deleteFotoAnexa,
  updateProductoConFoto,
  filtrarProductosCategoria
}
