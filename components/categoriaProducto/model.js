const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriaSchema = new Schema ({

    _id: Number,
    nombreCategoria: String,
    esEliminado: Boolean

}, {timestamps: true})

const model = mongoose.model('Categoria', categoriaSchema);

module.exports = model;