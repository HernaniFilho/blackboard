const express = require('express');
const Venda = require('../models/venda');
const Produto = require('../models/produto');
const clientesSSE = require('../routes/notify');

const VendaProxyService = require('../../KnowledgeSource/middleware/vendaMiddleware/vendaProxyService');
const NotifyService = require('../../KnowledgeSource/middleware/notifyService/publisher');

const vendaProxyMiddleware = new VendaProxyService(Venda);

const notifyPublisher = new NotifyService(clientesSSE.clients,Produto);

const router = express.Router();
/**

@file venda.js

@description Rotas para gerenciamento de vendas.
*/
/**

@route POST /

@description Cria uma nova venda, notifica alterações se aplicável e atualiza o cache.
*/
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
/**

@route GET /

@description Lista todas as vendas e atualiza o cache.
*/
// Listar venda 
router.get('/', (req, res, next)=> vendaProxyMiddleware.listVenda(req, res, next), (req, res)=> vendaProxyMiddleware.updateCacheVendas(req, res));
/**

@route PUT /:id

@description Atualiza uma venda pelo ID e atualiza o cache.
*/
// Atualizar venda // Não deveria ser implementado
router.put('/:id', (req, res, next)=> vendaProxyMiddleware.updateVenda(req, res, next), (req, res)=> vendaProxyMiddleware.updateVendaCache(req, res));
/**

@route DELETE /:id

@description Deleta uma venda pelo ID e atualiza o cache.
*/
//gerenciador consegue deletar 
router.delete('/:id', (req, res, next)=> vendaProxyMiddleware.deleteVenda(req, res, next), (req, res)=> vendaProxyMiddleware.updateDelete(req, res));

module.exports = router;