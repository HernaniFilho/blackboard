const express = require('express');
const Produto = require('../models/produto');
const {addProduto, listProduto, updateProduto, deleteProduto, updateCacheprodutos} = require('../../KnowledgeSource/middleware/produtoMiddleware');

const router = express.Router();

// Criar produto
router.post('/', addProduto, async (req, res)=> {
    try {
        const produto = new Produto(req.body);
        await produto.save();

        const produtos = await Produto.find();
        req.produtos = produtos;
        return next();
        //res.status(201).json(produto);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}, updateCacheprodutos);

// Listar produtos // ola
router.get('/', listProduto, async (req, res, next)=> {
    try {
        const produtos = await Produto.find();
        req.produtos = produtos;
        return next();
        //res.status(201).json(produtos); // agora vai ficar no outro middleware updateCacheProdutos
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
}, updateCacheprodutos);

// Atualizar produto
router.put('/:id', updateProduto, async (req, res)=> {
    try {
        const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        const produtos = await Produto.find();
        req.produtos = produtos;
        return next();
        res.status(201).json(produto);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
}, updateCacheprodutos);

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