const mongoose = require('mongoose');
/**

@file compra.js

@description Modelo Mongoose para representar uma compra realizada por uma loja a um fornecedor.
*/

/**

@typedef {Object} Compra

@property {String} nomeFornecedor - Nome do fornecedor da compra.

@property {String} nomeLoja - Nome da loja que realizou a compra.

@property {String} nomeProduto - Nome do produto adquirido.

@property {Number} quantidade - Quantidade do produto comprado.

@property {Date} data - Data em que a compra foi realizada.

@property {Number} precoTotal - Preço total da compra.
*/
const compraSchema = new mongoose.Schema({
    nomeFornecedor: { type: String, required: true},
    nomeLoja: { type: String, required: true},
    nomeProduto: { type: String, required: true},
    quantidade: { type: Number, required: true},
    data: { type: Date, required: true},
    precoTotal: {type: Number, required: true}
});

module.exports = mongoose.model("compra",compraSchema);