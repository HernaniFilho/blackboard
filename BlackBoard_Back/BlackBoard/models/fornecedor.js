const mongoose = require('mongoose');
/**

@file fornecedor.js

@description Modelo Mongoose para representar um fornecedor e os produtos que ele fornece.
*/

/**

@typedef {Object} Fornecedor

@property {String} nomeFornecedor - Nome do fornecedor.

@property {String} nomeProduto - Nome do produto fornecido.

@property {Number} preco - Preço do produto fornecido.
*/
const fornecedorSchema = new mongoose.Schema({
    nomeFornecedor: { type: String, required: true},
    nomeProduto: { type: String, required: true},
    preco: { type: Number, required: true}
});

module.exports = mongoose.model("fornecedor",fornecedorSchema);