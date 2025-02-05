const CompraMiddleware = require('./compraMiddleware');
const iCompraService = require('./iCompraService');
/**

@class CompraProxyService

@extends iCompraService

@description Implementação do serviço de compra com cache e controle de alterações.
*/
class CompraProxyService extends iCompraService {
    /**
    * @constructor
    * @param {Model} compraModel - Modelo de dados para compra.
    */
    constructor(compraModel) {
        super();
        this.compraMiddleware = new CompraMiddleware(compraModel);
        this.compras = [];
        this.alterado = false;
        this.criaCompra = this.criaCompra.bind(this);
        this.listCompra = this.listCompra.bind(this);
        this.updateCacheCompra = this.updateCacheCompra.bind(this);
        //this.updateCompra = this.updateCompra.bind(this);
        this.deleteCompra = this.deleteCompra.bind(this);
    }
/**
 * @method criaCompra
 * @description Cria uma nova compra.
 * @param {Request} req - Requisição HTTP.
 * @param {Response} res - Resposta HTTP.
 * @param {Function} next - Middleware seguinte.
 */
    async criaCompra(req, res, next) {
        this.alterado = true;
        await this.compraMiddleware.criaCompra(req, res, next);
    }
/**
 * @method listCompra
 * @description Lista compras do cache ou banco de dados se houver alterações.
 * @param {Request} req - Requisição HTTP.
 * @param {Response} res - Resposta HTTP.
 * @param {Function} next - Middleware seguinte.
 */
    async listCompra(req, res, next) {
        const loja = req.headers.nomeloja;
        if (this.alterado || this.compras.length === 0) {
            await this.compraMiddleware.listCompra(req, res, next);
        } else {
            console.log("VEIO DO CACHE PROXY");
            const comprasEmLoja = this.compras;
            res.status(200).json(comprasEmLoja);
        }
    }
/**
 * @method updateCacheCompra
 * @description Atualiza o cache com as compras recentes.
 * @param {Request} req - Requisição HTTP.
 * @param {Response} res - Resposta HTTP.
 */
    async updateCacheCompra(req, res, next) {
        this.compras = req.compras;
        this.alterado = false;
        const loja = req.headers.nomeloja;
        
        const comprasEmLoja = this.compras.filter(compras => compras.nomeLoja === loja);
        res.status(201).json(comprasEmLoja);
    }
/**
 * @method deleteCompra
 * @description Deleta uma compra.
 * @param {Request} req - Requisição HTTP.
 * @param {Response} res - Resposta HTTP.
 * @param {Function} next - Middleware seguinte.
 */
    async deleteCompra(req, res, next) {
        this.alterado = true;
        await this.compraMiddleware.deleteCompra(req, res, next);
    }
/**
 * @method updateDelete
 * @description Atualiza o cache após a exclusão de uma compra.
 * @param {Request} req - Requisição HTTP.
 * @param {Response} res - Resposta HTTP.
 */
    async updateDelete(req, res, next) {
        this.alterado = true;

        const compra = req.body;
        const index = this.compras.findIndex(c => c._id === compra._id && c.nomeLoja === compra.nomeLoja);

        if (index >= 0) {
            this.compras.splice(index, 1);
        }
        res.status(201).json({ message: 'compra removido com sucesso!' });
    }
/**
 * @method updateCompraCache
 * @description Atualiza o cache com uma compra modificada.
 * @param {Request} req - Requisição HTTP.
 * @param {Response} res - Resposta HTTP.
 */
    async updateCompraCache(req, res, next) {
        const compraAtualizado = req.compras;
        const index = this.compras.push(compraAtualizado);

        this.compras[index] = compraAtualizado;
        res.status(201).json(req.body);
    }

}
module.exports = CompraProxyService;