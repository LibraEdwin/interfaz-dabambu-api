const { uploadTempImage } = require('../utils/uploadImg')
const multer = require('multer')

function isValidFiles (req, res, next) {
  const upload = uploadTempImage.fields([
    { name: 'fotoProducto', maxCount: 1 },
    { name: 'fotosAnexas', maxCount: 4 }
  ])

  upload(req, res, err => {
    // errores de multer
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ codigo: 400, error: 'El sistema no permite imagenes que exceden el peso permitido de 1mb' })
      }
    }
    // errores personalizados
    if (err) {
      return res.status(500).json({ codigo: 500, error: err.message })
    }

    next()
  })
}

function validFilesUpdate (req, res, next) {
  const upload = uploadTempImage.fields([
    { name: 'fotoProducto', maxCount: 1 },
    { name: 'anexa1', maxCount: 1 },
    { name: 'anexa2', maxCount: 1 },
    { name: 'anexa3', maxCount: 1 },
    { name: 'anexa4', maxCount: 1 }
  ])

  upload(req, res, err => {
    // errores de multer
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ codigo: 400, error: 'El sistema no permite imagenes que exceden el peso permitido de 1mb' })
      }
    }
    // errores personalizados
    if (err) {
      return res.status(500).json({ codigo: 500, error: err.message })
    }

    next()
  })
}

module.exports = { isValidFiles, validFilesUpdate }
