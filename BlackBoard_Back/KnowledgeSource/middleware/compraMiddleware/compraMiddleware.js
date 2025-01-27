const iCompraService = require('./iCompraService');

class CompraMiddleware extends iCompraService {
    constructor(compraModel) {
        super();
        this.Compra = compraModel;
        this.criaCompra = this.criaCompra.bind(this);
        this.listCompra = this.listCompra.bind(this);
        this.updateCacheCompra = this.updateCacheCompra.bind(this);
        //this.updateCompra = this.updateCompra.bind(this);
        this.deleteCompra = this.deleteCompra.bind(this);
    }

    async criaCompra(req, res, next) {
        try {
            const compra = new this.Compra(req.body);
            await compra.save();

            req.compras = compra;
            return next();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async listCompra(req, res, next) {

        try {
            const compras = await this.Compra.find();
            //res.status(201).json(compras);
            req.compras = compras;
            return next();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async updateCacheCompra(req, res, next) {
        this.compras = req.compras;
        this.alterado = false;

        const loja = req.body.nomeLoja;
        const comprasEmLoja = this.compras.filter(compras => compras.nomeLoja === loja);
        res.status(201).json(comprasEmLoja);
    }
    /*
    não implementaddo
    async updateCompra(req, res, next) {

        try {
            await this.compra.findByIdAndUpdate(req.params.id, req.body, { new: true });
            return next();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
        */
    async deleteCompra(req, res, next) {
        try {
            await this.Compra.findByIdAndDelete(req.params.id);
            res.compras = req.params.id;
            return next();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

}
module.exports = CompraMiddleware;