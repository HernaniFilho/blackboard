const express = require('express');
const Compra = require('../models/compra');

const CompraProxyService = require('../../KnowledgeSource/middleware/compraMiddleware/compraProxyService')
const compraProxyMiddleware = new CompraProxyService(Compra);

const router = express.Router();
/**
 * @module BlackBoard
 */
/**
 * 
 * @memberof blackb 

@file compra.js

@description Rotas para gerenciamento de compras.
*/
/**

@route POST /

@description Cria uma nova compra e atualiza o cache.
*/
//gerenciador consegue adicionar 
router.post('/',(req,res,next)=>compraProxyMiddleware.criaCompra(req,res,next),(req,res)=>compraProxyMiddleware.updateCompraCache(req,res));
/**

@route GET /

@description Lista todas as compras e atualiza o cache.
*/
router.get('/',(req,res,next)=>compraProxyMiddleware.listCompra(req,res,next),(req,res)=>compraProxyMiddleware.updateCacheCompra(req,res));
/**

@route DELETE /:id

@description Deleta uma compra pelo ID e atualiza o cache.
*/
//gerenciador consegue deletar 
router.delete('/:id',(req,res,next)=>compraProxyMiddleware.deleteCompra(req,res,next),(req,res)=>compraProxyMiddleware.updateDelete(req,res));

module.exports = router;

// Atualizar compra // Não deveria ser implementado
/*
router.put('/:id', async (req, res)=> {
    try {
        const compra = await Compra.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(compra);
    } catch (err) {
        res.status(500).json({ error: err.message});
    } 
   res.status(300).json({ message: 'Função não implementada!'});
});
*/