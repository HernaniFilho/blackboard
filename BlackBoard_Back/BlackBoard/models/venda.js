const mongoose = require('mongoose');
/**

@file venda.js

@description Modelo Mongoose para representar uma venda de produto realizada por uma loja.
*/

/**

@typedef {Object} Venda

@property {String} nomeLoja - Nome da loja que realizou a venda.

@property {String} nomeProduto - Nome do produto vendido.

@property {Number} quantidade - Quantidade de produtos vendidos.

@property {Date} data - Data da venda.

@property {Number} precoTotal - Preço total da venda.
*/
const vendaSchema = new mongoose.Schema({
    nomeLoja: { type: String, required: true},
    nomeProduto: { type: String, required: true},
    quantidade: { type: Number, required: true},
    data: { type: Date, required: true},
    precoTotal: {type: Number, required: true}
});

module.exports = mongoose.model("venda",vendaSchema);