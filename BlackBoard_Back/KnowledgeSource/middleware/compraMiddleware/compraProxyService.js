const CompraMiddleware = require('./compraMiddleware');
const iCompraService = require('./iCompraService');

class CompraProxyService extends iCompraService {

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

    async criaCompra(req, res, next) {
        this.alterado = true;
        await this.compraMiddleware.criaCompra(req, res, next);
    }

    async listCompra(req, res, next) {
        const loja = req.headers.nomeloja;
        if (this.alterado || this.compras.length === 0) {
            await this.compraMiddleware.listCompra(req, res, next);
        } else {
            console.log("VEIO DO CACHE PROXY");
            const comprasEmLoja = this.compras.filter(compra => compra.nomeLoja === loja);
            res.status(200).json(comprasEmLoja);
        }
    }

    async updateCacheCompra(req, res, next) {
        this.compras = req.compras;
        this.alterado = false;
        const loja = req.headers.nomeloja;
        
        const comprasEmLoja = this.compras.filter(compras => compras.nomeLoja === loja);
        res.status(201).json(comprasEmLoja);
    }
    /*
    nao implementado
    async updateCompra(req, res, next) {
        this.alterado = true;
        await this.compraMiddleware.updateCompra(req, res, next);
    }
        */
    async deleteCompra(req, res, next) {
        this.alterado = true;
        await this.compraMiddleware.deleteCompra(req, res, next);
    }

    async updateDelete(req, res, next) {
        this.alterado = true;

        const compra = req.body;
        const index = this.compras.findIndex(c => c._id === compra._id && c.nomeLoja === compra.nomeLoja);

        if (index >= 0) {
            this.compras.splice(index, 1);
        }
        res.status(201).json({ message: 'compra removido com sucesso!' });
    }
    
    async updateCompraCache(req, res, next) {
        const compraAtualizado = req.compras;
        const index = this.compras.push(compraAtualizado);

        this.compras[index] = compraAtualizado;
        res.status(201).json(req.body);
    }

}
module.exports = CompraProxyService;