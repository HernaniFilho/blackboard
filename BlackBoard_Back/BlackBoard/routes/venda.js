const express = require('express');
const Venda = require('../models/venda');
const Produto = require('../models/produto');
const clientesSSE = require('../routes/notify');

const VendaProxyService = require('../../KnowledgeSource/middleware/vendaMiddleware/vendaProxyService');
const NotifyService = require('../../KnowledgeSource/middleware/notifyService/publisher');

const vendaProxyMiddleware = new VendaProxyService(Venda);

const notifyPublisher = new NotifyService(clientesSSE.clients,Produto);

const router = express.Router();

// Criar venda //utilizado pelas lojas
router.post('/',
    (req, res, next) => vendaProxyMiddleware.addVenda(req, res, next),
    (req, res, next) => {
        if (req.headers.nomeloja === 'Loja A' || req.headers.nomeloja === 'Loja B') {
            notifyPublisher.notifyAlt(req, res, next);
        }
        next();
    },
    (req, res) => vendaProxyMiddleware.addVendaCache(req, res));

// Listar venda 
router.get('/', (req, res, next)=> vendaProxyMiddleware.listVenda(req, res, next), (req, res)=> vendaProxyMiddleware.updateCacheVendas(req, res));

// Atualizar venda // Não deveria ser implementado
router.put('/:id', (req, res, next)=> vendaProxyMiddleware.updateVenda(req, res, next), (req, res)=> vendaProxyMiddleware.updateVendaCache(req, res));

//gerenciador consegue deletar 
router.delete('/:id', (req, res, next)=> vendaProxyMiddleware.deleteVenda(req, res, next), (req, res)=> vendaProxyMiddleware.updateDelete(req, res));

module.exports = router;