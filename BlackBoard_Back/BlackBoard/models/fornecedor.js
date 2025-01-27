const mongoose = require('mongoose');

const fornecedorSchema = new mongoose.Schema({
    nomeFornecedor: { type: String, required: true},
    nomeProduto: { type: String, required: true},
    preco: { type: Number, required: true}
});

module.exports = mongoose.model("fornecedor",fornecedorSchema);