const mongoose = require("mongoose");
/**

@file produto.js

@description Modelo Mongoose para representar um produto disponível em uma loja.
*/

/**

@typedef {Object} Produto

@property {String} nomeProduto - Nome do produto.

@property {Number} preco - Preço unitário do produto (valor mínimo 0).

@property {Number} quantidade - Quantidade em estoque (valor mínimo 0).

@property {Number} estoqueMin - Quantidade mínima de estoque para controle de reposição (valor mínimo 0).

@property {String} nomeLoja - Nome da loja onde o produto está disponível.
*/
const produtoSchema = new mongoose.Schema({
    nomeProduto: { type: String, required: true},
    preco: { type: Number, required: true, min: 0},
    quantidade: { type: Number, required: true, min: 0},
    estoqueMin: { type: Number, required: true, min: 0},
    nomeLoja: { type: String, required: true}
});

module.exports = mongoose.model("produto", produtoSchema);