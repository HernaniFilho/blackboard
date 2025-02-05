const express = require("express");
const Produto = require("../models/produto");
const clientesSSE = require("../routes/notify");

const ProdutoProxyService = require("../../KnowledgeSource/middleware/produtoMiddleware/produtoProxyService");
const NotifyService = require("../../KnowledgeSource/middleware/notifyService/publisher");

const produtoProxyMiddleware = new ProdutoProxyService(Produto);
const notifyPublisher = new NotifyService(clientesSSE.clients, Produto);

const router = express.Router();
/**

@file produto.js

@description Rotas para gerenciamento de produtos.
*/
/**

@route GET /

@description Lista todos os produtos, notifica alterações se aplicável e atualiza a cache.
*/
router.get(
  "/",
  (req, res, next) => produtoProxyMiddleware.listProduto(req, res, next),
  (req, res, next) => {
    if (req.headers.nomeloja === "gen") {
      notifyPublisher.notifyAlt(req, res, next);
    }
    next();
  },
  (req, res) => produtoProxyMiddleware.updateCacheprodutos(req, res)
);
/**

@route POST /

@description Adiciona um novo produto, notifica alterações se aplicável e atualiza o cache.
*/

//gerenciador consegue adicionar
router.post(
  "/",
  (req, res, next) => produtoProxyMiddleware.addProduto(req, res, next),
  (req, res, next) => {
    if (req.headers.nomeloja === "gen") {
      notifyPublisher.notifyAlt(req, res, next);
    }
    next();
  },
  (req, res) => produtoProxyMiddleware.addProdutoCache(req, res)
);
/**

@route PUT /:id

@description Atualiza um produto pelo ID, notifica alterações se aplicável e atualiza a cache.
*/
//gerenciador consegue alterar
router.put(
  "/:id",
  (req, res, next) => produtoProxyMiddleware.updateProduto(req, res, next),
  (req, res, next) => {
    if (req.headers.nomeloja === "gen") {
      notifyPublisher.notifyAlt(req, res, next);
    }
    next();
  },
  (req, res) => produtoProxyMiddleware.updateProdutoCache(req, res)
);
/**

@route DELETE /:id

@description Deleta um produto pelo ID, notifica alterações se aplicável e atualiza a cache.
*/
//gerenciador consegue deletar
router.delete(
  "/:id",
  (req, res, next) => produtoProxyMiddleware.deleteProduto(req, res, next),
  (req, res, next) => {
    if (req.headers.nomeloja === "gen") {
      notifyPublisher.notifyAlt(req, res, next);
    }
    next();
  },
  (req, res) => produtoProxyMiddleware.updateDelete(req, res)
);
module.exports = router;
