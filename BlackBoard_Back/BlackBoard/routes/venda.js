const express = require('express');
const Venda = require('../models/venda');
const VendaProxyService = require('../../KnowledgeSource/middleware/vendaMiddleware/vendaProxyService');

const vendaMiddleware = new VendaProxyService(Venda);

const router = express.Router();

// Criar venda
router.post('/', (req, res, next)=> vendaMiddleware.addVenda(req, res, next), (req, res)=> vendaMiddleware.addVendaCache(req, res));

// Listar venda 
router.get('/', (req, res, next)=> vendaMiddleware.listVenda(req, res, next), (req, res)=> vendaMiddleware.updateCacheVendas(req, res));

// Atualizar venda // Não deveria ser implementado
router.put('/:id', (req, res, next)=> vendaMiddleware.updateVenda(req, res, next), (req, res)=> vendaMiddleware.updateVendaCache(req, res));

// Deletar venda
router.delete('/:id', (req, res, next)=> vendaMiddleware.deleteVenda(req, res, next), (req, res)=> vendaMiddleware.updateDelete(req, res));

module.exports = router;