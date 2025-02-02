const express = require('express');
const Fornecedor = require('../models/fornecedor');
const FornecedorProxyService = require('../../KnowledgeSource/middleware/fornecedorMiddleware/fornecedorProxyService')

const fornecedorMiddleware = new FornecedorProxyService(Fornecedor)

const router = express.Router();

//gerenciador consegue adicionar 
router.post('/',(req,res,next)=>fornecedorMiddleware.addFornecedor(req,res,next),(req,res)=>fornecedorMiddleware.addFornecedorCache(req,res) );
// Listar fornecedores // ola
router.get('/',(req,res,next)=>fornecedorMiddleware.listFornecedor(req,res,next),(req,res)=>fornecedorMiddleware.updateCacheFornecedors(req,res));
//gerenciador consegue alterar 
router.put('/:id',(req,res,next)=>fornecedorMiddleware.updateFornecedor(req,res,next) ,(req,res)=>fornecedorMiddleware.updateFornecedorCache(req,res));
//gerenciador consegue deletar 
router.delete('/:id',(req,res,next)=>fornecedorMiddleware.deleteFornecedor(req,res,next),(req,res)=>fornecedorMiddleware.updateDelete(req,res) );

module.exports = router;