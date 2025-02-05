const mongoose = require("mongoose");
/**

@file transferencia.js

@description Modelo Mongoose para representar a transferência de produtos entre lojas.
*/

/**

@typedef {Object} Transferencia

@property {String} lojaSaida - Nome da loja de origem da transferência.

@property {String} lojaEntrada - Nome da loja de destino da transferência.

@property {String} nomeProduto - Nome do produto transferido.

@property {Number} quantidade - Quantidade de produtos transferidos.

@property {Date} data - Data da transferência.
*/
const transferenciaSchema = new mongoose.Schema({
    lojaSaida: { type: String, required: true},
    lojaEntrada: { type: String, required: true},
    nomeProduto: { type: String, required: true},
    quantidade: { type: Number, required: true},
    data: { type: Date, required: true}
});

module.exports = mongoose.model("transferencia", transferenciaSchema);