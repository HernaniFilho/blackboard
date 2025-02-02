const express = require('express');
const Produto = require('../models/produto');
const clientesSSE = require('../routes/notify');

const ProdutoProxyService = require("../../KnowledgeSource/middleware/produtoMiddleware/produtoProxyService");
const NotifyService = require('../../KnowledgeSource/middleware/notifyService/publisher');

const produtoProxyMiddleware = new ProdutoProxyService(Produto);
const notifyPublisher = new NotifyService(clientesSSE.clients,Produto);

const router = express.Router();

router.get('/', (req, res, next) =>  produtoProxyMiddleware.listProduto(req, res, next), (req, res) => produtoProxyMiddleware.updateCacheprodutos(req, res));

//gerenciador consegue adicionar
router.post('/',
    (req, res, next) => produtoProxyMiddleware.addProduto(req, res, next),
    (req, res, next) => {
        if (req.headers.nomeloja === 'gen') {
            notifyPublisher.notifyAlt(req, res, next);
        }
        next();
    },
    (req, res) => produtoProxyMiddleware.addProdutoCache(req, res));

//gerenciador consegue alterar 
router.put('/:id',
    (req, res, next) => produtoProxyMiddleware.updateProduto(req, res, next),
    (req, res, next) => {
        if (req.headers.nomeloja === 'gen') {
            notifyPublisher.notifyAlt(req, res, next);
        }
        next();
    },
    (req, res) => produtoProxyMiddleware.updateProdutoCache(req, res));

//gerenciador consegue deletar 
router.delete('/:id',
    (req, res, next) => produtoProxyMiddleware.deleteProduto(req, res, next),
    (req, res, next) => {
        if (req.headers.nomeloja === 'gen') {
            notifyPublisher.notifyAlt(req, res, next);
        }
        next();
    },
    (req, res) => produtoProxyMiddleware.updateDelete(req, res));
module.exports = router;