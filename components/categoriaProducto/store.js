const model = require("./model")

//Add categoria
function addCategoria(categoria) {
  const nuevoCategoria = new model(categoria);
  return nuevoCategoria.save()
}

async function allCategorias() {
  return await model.find(
    { esEliminado: false },
    { __v: 0, createdAt: 0, updatedAt: 0, esEliminado: false }
  )
}

//List categoria
async function listCategoria(codigo) {
  return await model.findOne(
    { _id: codigo, esEliminado: false },
    { __v: 0, createdAt: 0, updatedAt: 0, esEliminado: false }
  )
}

// Update Categoria
async function updateCategoria(codigo, categoria) {
  return await model.findByIdAndUpdate(
    { _id: codigo, esEliminado: false },
    categoria,
    {
      new: true,
      runValidation: true,
    }
  )
}

// Delete Categoria
async function deleteCategoria(codigo) {
  await model.findOneAndUpdate(
    { _id: codigo, esEliminado: false },
    { esEliminado: true },
    {
      new: true,
      runValidation: true,
    }
  );
}

async function getTotalCategorias() {
  return await model.countDocuments()
}

module.exports = {
  add: addCategoria,
  all: allCategorias,
  list: listCategoria,
  update: updateCategoria,
  delete: deleteCategoria,
  totalDocumentos: getTotalCategorias,
}
