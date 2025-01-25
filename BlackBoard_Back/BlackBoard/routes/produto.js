const express = require('express');
const Produto = require('../models/produto');
const {addProduto, listProduto, updateProduto, deleteProduto} = require('../../KnowledgeSource/middleware/produtoMiddleware');

const router = express.Router();

// Criar produto
router.post('/', addProduto, async (req, res)=> {
    try {
        const produto = new Produto(req.body);
        await produto.save();
        res.status(201).json(produto);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Listar produtos // ola
router.get('/', listProduto, async (req, res)=> {
    try {
        const produtos = await Produto.find();
        res.produtos = produtos;
        res.status(201).json(produtos);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

// Atualizar produto
router.put('/:id', updateProduto, async (req, res)=> {
    try {
        const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(produto);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

// Deletar produto
router.delete('/:id', deleteProduto, async (req, res)=> {
    try {
        await Produto.findByIdAndDelete(req.params.id);
        res.status(201).json({ message: 'Produto removido com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

module.exports = router;