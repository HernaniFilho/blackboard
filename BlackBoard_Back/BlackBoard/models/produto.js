const mongoose = require("mongoose");

const produtoSchema = new mongoose.Schema({
    nomeProduto: { type: String, required: true},
    preco: { type: Number, required: true, min: 0},
    quantidade: { type: Number, required: true, min: 0},
    estoqueMin: { type: Number, required: true, min: 0},
    nomeLoja: { type: String, required: true}
});

module.exports = mongoose.model("produto", produtoSchema);