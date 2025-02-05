const express = require('express');
const Transferencia = require('../models/transferencia');
const TransferenciaProxyService = require('../../KnowledgeSource/middleware/transferenciaMiddleware/transferenciaProxyService');

const transferenciaProxyMiddleware = new TransferenciaProxyService(Transferencia);

const router = express.Router();
/**

@file transferencia.js

@description Rotas para gerenciamento de transferências.
*/
/**

@route POST /

@description Cria uma nova transferência e atualiza o cache.
*/
// Criar transferencia
router.post('/', (req, res, next)=> transferenciaProxyMiddleware.addTransferencia(req, res, next), (req, res) => transferenciaProxyMiddleware.addTransferenciaCache(req, res));
/**

@route GET /

@description Lista todas as transferências e atualiza o cache.
*/
// Listar transferencia // ola
router.get('/', (req, res, next)=> transferenciaProxyMiddleware.listTransferencia(req, res, next), (req, res) => transferenciaProxyMiddleware.updateCacheTransferencias(req, res));
/**

@route PUT /:id

@description Atualiza uma transferência pelo ID e atualiza o cache.
*/
// Atualizar transferencia
router.put('/:id', (req, res, next)=> transferenciaProxyMiddleware.updateTransferencia(req, res, next), (req, res)=> transferenciaProxyMiddleware.updateTransferenciaCache(req, res));
/**

@route DELETE /:id

@description Deleta uma transferência pelo ID e atualiza o cache.
*/

// Deletar transferencia
router.delete('/:id', (req, res, next)=> transferenciaProxyMiddleware.deleteTransferencia(req, res, next), (req, res)=> transferenciaProxyMiddleware.updateDelete(req, res));

module.exports = router;