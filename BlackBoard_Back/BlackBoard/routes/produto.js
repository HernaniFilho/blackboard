const express = require('express');
const Produto = require('../models/produto');

const ProdutoProxyService = require("../../KnowledgeSource/middleware/produtoMiddleware/produtoProxyService");

const produtoProxyMiddleware = new ProdutoProxyService(Produto);

const router = express.Router();

router.get('/', (req, res, next) => produtoProxyMiddleware.listProduto(req, res, next), (req, res) => produtoProxyMiddleware.updateCacheprodutos(req, res));

router.post('/', (req, res, next) => produtoProxyMiddleware.addProduto(req, res, next), (req, res) => produtoProxyMiddleware.addProdutoCache(req, res));

router.put('/:id', (req, res, next) => produtoProxyMiddleware.updateProduto(req, res, next), (req, res) => produtoProxyMiddleware.updateProdutoCache(req, res));

router.delete('/:id', (req, res, next) => produtoProxyMiddleware.deleteProduto(req, res, next), (req, res) => produtoProxyMiddleware.updateDelete(req, res));
module.exports = router;