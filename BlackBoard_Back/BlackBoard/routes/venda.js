const express = require('express');
const Venda = require('../models/venda');
const VendaProxyService = require('../../KnowledgeSource/middleware/vendaMiddleware/vendaProxyService');

const vendaProxyMiddleware = new VendaProxyService(Venda);

const router = express.Router();

// Criar venda
router.post('/', (req, res, next)=> vendaProxyMiddleware.addVenda(req, res, next), (req, res)=> vendaProxyMiddleware.addVendaCache(req, res));

// Listar venda 
router.get('/', (req, res, next)=> vendaProxyMiddleware.listVenda(req, res, next), (req, res)=> vendaProxyMiddleware.updateCacheVendas(req, res));

// Atualizar venda // Não deveria ser implementado
router.put('/:id', (req, res, next)=> vendaProxyMiddleware.updateVenda(req, res, next), (req, res)=> vendaProxyMiddleware.updateVendaCache(req, res));

// Deletar venda
router.delete('/:id', (req, res, next)=> vendaProxyMiddleware.deleteVenda(req, res, next), (req, res)=> vendaProxyMiddleware.updateDelete(req, res));

module.exports = router;