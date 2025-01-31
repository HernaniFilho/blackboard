const express = require('express');
const Transferencia = require('../models/transferencia');
const TransferenciaProxyService = require('../../KnowledgeSource/middleware/transferenciaMiddleware/transferenciaProxyService');

const transferenciaProxyMiddleware = new TransferenciaProxyService(Transferencia);

const router = express.Router();

// Criar transferencia
router.post('/', (req, res, next)=> transferenciaProxyMiddleware.addTransferencia(req, res, next), (req, res) => transferenciaProxyMiddleware.addTransferenciaCache(req, res));

// Listar transferencia // ola
router.get('/', (req, res, next)=> transferenciaProxyMiddleware.listTransferencia(req, res, next), (req, res) => transferenciaProxyMiddleware.updateCacheTransferencias(req, res));

// Atualizar transferencia
router.put('/:id', (req, res, next)=> transferenciaProxyMiddleware.updateTransferencia(req, res, next), (req, res)=> transferenciaProxyMiddleware.updateTransferenciaCache(req, res));

// Deletar transferencia
router.delete('/:id', (req, res, next)=> transferenciaProxyMiddleware.deleteTransferencia(req, res, next), (req, res)=> transferenciaProxyMiddleware.updateDelete(req, res));

module.exports = router;