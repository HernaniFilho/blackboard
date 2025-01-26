const CompraMiddleware = require('./compraMiddleware');
const iCompraService = require('./iCompraService');

class CompraProxyService extends iCompraService {

    constructor(compraModel) {
        super();
        this.compraMiddleware = new CompraMiddleware(compraModel);
        this.compras = [];
        this.alterado = false;
        this.criacompra = this.addcompra.bind(this);
        this.listcompra = this.listcompra.bind(this);
        this.updateCachecompras = this.updateCachecompras.bind(this);
        this.updatecompra = this.updatecompra.bind(this);
        this.deletecompra = this.deletecompra.bind(this);
    }

    async addcompra(req, res, next) {
        this.alterado = true;
        await this.compraMiddleware.addcompra(req, res, next);
    }
    async listcompra(req, res, next) {
        const loja = req.body.nomeLoja;

        if (this.alterado || this.compras.length === 0) {
            await this.compraMiddleware.listcompra(req, res, next);
        } else {
            const comprasEmLoja = this.compras.filter(compra => compra.nomeLoja === loja);
            res.status(200).json(comprasEmLoja);
        }
    }

    async updateCachecompras(req, res, next) {
        this.compras = req.compras;
        this.alterado = false;
        const loja = req.body.nomeLoja;
        const comprasEmLoja = this.compras.filter(compras => compras.nomeLoja === loja);
        res.status(201).json(comprasEmLoja);
    }
    async updatecompra(req, res, next) {
        this.alterado = true;
        await this.compraMiddleware.updatecompra(req, res, next);
    }
    async updatecompraCache(req, res, next) {
        const compraAtualizado = req.body;
        const index = this.compras.findIndex(
            p => p.nome === compraAtualizado.nome && p.nomeLoja === compraAtualizado.nomeLoja
        );
        if (index >= 0) {
            this.compras[index] = compraAtualizado;
            res.status(201).json(req.body);
        }

    }
    async deletecompra(req, res, next) {
        this.alterado = true;
        await this.compraMiddleware.deletecompra(req, res, next);
    }

    async updateDelete(req, res, next) {
        this.alterado = true;

        const compra = req.body;
        const index = this.compras.findIndex(p => p.nome === compra.nome && p.nomeLoja === compra.nomeLoja);

        if (index >= 0) {
            this.compras.splice(index, 1);
        }
        res.status(201).json({ message: 'compra removido com sucesso!' });
    }
}
module.exports = CompraProxyService;