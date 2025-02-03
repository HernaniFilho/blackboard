const express = require('express');
const Fornecedor = require('../models/fornecedor');
const FornecedorProxyService = require('../../KnowledgeSource/middleware/fornecedorMiddleware/fornecedorProxyService')

const fornecedorProxyMiddleware = new FornecedorProxyService(Fornecedor)

const router = express.Router();

//gerenciador consegue adicionar 
router.post('/',(req,res,next)=>fornecedorProxyMiddleware.addFornecedor(req,res,next),(req,res)=>fornecedorProxyMiddleware.addFornecedorCache(req,res) );
// Listar fornecedores // ola
router.get('/',(req,res,next)=>fornecedorProxyMiddleware.listFornecedor(req,res,next),(req,res)=>fornecedorProxyMiddleware.updateCacheFornecedors(req,res));
//gerenciador consegue alterar 
router.put('/:id',(req,res,next)=>fornecedorProxyMiddleware.updateFornecedor(req,res,next) ,(req,res)=>fornecedorProxyMiddleware.updateFornecedorCache(req,res));
//gerenciador consegue deletar 
router.delete('/:id',(req,res,next)=>fornecedorProxyMiddleware.deleteFornecedor(req,res,next),(req,res)=>fornecedorProxyMiddleware.updateDelete(req,res) );

module.exports = router;