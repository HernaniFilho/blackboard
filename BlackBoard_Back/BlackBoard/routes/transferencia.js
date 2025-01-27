const express = require('express');
const Transferencia = require('../models/transferencia');
const TransferenciaProxyService = require('../../KnowledgeSource/middleware/transferenciaMiddleware/transferenciaProxyService');

const transferenciaMiddleware = new TransferenciaProxyService(Transferencia);

const router = express.Router();

// Criar transferencia
router.post('/', (req, res, next)=> transferenciaMiddleware.addTransferencia(req, res, next), (req, res) => transferenciaMiddleware.addTransferenciaCache(req, res));

// Listar transferencia // ola
router.get('/', (req, res, next)=> transferenciaMiddleware.listTransferencia(req, res, next), (req, res) => transferenciaMiddleware.updateCacheTransferencias(req, res));

// Atualizar transferencia
router.put('/:id', (req, res, next)=> transferenciaMiddleware.updateTransferencia(req, res, next), (req, res)=> transferenciaMiddleware.updateTransferenciaCache(req, res));

// Deletar transferencia
router.delete('/:id', (req, res, next)=> transferenciaMiddleware.deleteTransferencia(req, res, next), (req, res)=> transferenciaMiddleware.updateDelete(req, res));

module.exports = router;