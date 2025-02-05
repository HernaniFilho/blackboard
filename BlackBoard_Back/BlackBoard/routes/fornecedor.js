const express = require('express');
const Fornecedor = require('../models/fornecedor');
const FornecedorProxyService = require('../../KnowledgeSource/middleware/fornecedorMiddleware/fornecedorProxyService')

const fornecedorProxyMiddleware = new FornecedorProxyService(Fornecedor)

const router = express.Router();
/**

@file fornecedor.js

@description Rotas para gerenciamento de fornecedores.
*/
/**

@route POST /

@description Adiciona um novo fornecedor e atualiza o cache.
*/
//gerenciador consegue adicionar 
router.post('/',(req,res,next)=>fornecedorProxyMiddleware.addFornecedor(req,res,next),(req,res)=>fornecedorProxyMiddleware.addFornecedorCache(req,res) );
/**

@route GET /

@description Lista todos os fornecedores e atualiza o cache.
*/
// Listar fornecedores // ola
router.get('/',(req,res,next)=>fornecedorProxyMiddleware.listFornecedor(req,res,next),(req,res)=>fornecedorProxyMiddleware.updateCacheFornecedors(req,res));
/**

@route PUT /:id

@description Atualiza um fornecedor pelo ID e atualiza o cache.
*/

//gerenciador consegue alterar 
router.put('/:id',(req,res,next)=>fornecedorProxyMiddleware.updateFornecedor(req,res,next) ,(req,res)=>fornecedorProxyMiddleware.updateFornecedorCache(req,res));
/**

@route DELETE /:id

@description Deleta um fornecedor pelo ID e atualiza o cache.
*/

//gerenciador consegue deletar 
router.delete('/:id',(req,res,next)=>fornecedorProxyMiddleware.deleteFornecedor(req,res,next),(req,res)=>fornecedorProxyMiddleware.updateDelete(req,res) );

module.exports = router;