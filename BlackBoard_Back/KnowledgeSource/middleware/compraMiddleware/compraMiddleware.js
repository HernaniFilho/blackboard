const iCompraService = require('./iCompraService');

class CompraMiddleware extends iCompraService {
    constructor(produtoModel) {
        super();
        this.Produto = produtoModel;
        this.addProduto = this.addProduto.bind(this);
        this.listProduto = this.listProduto.bind(this);
        this.updateCacheprodutos = this.updateCacheprodutos.bind(this);
        this.updateProduto = this.updateProduto.bind(this);
        this.deleteProduto = this.deleteProduto.bind(this);
    }

    async addProduto(req, res, next) {
        try {
            const produto = new this.Produto(req.body);
            await produto.save();

            const produtos = await this.Produto.find();
            req.produtos = produtos;
            return next();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async listProduto(req, res, next) {
        try {
            const produtos = await this.Produto.find();
            req.produtos = produtos;
            return next();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async updateCacheprodutos(req, res, next) {
        this.produtos = req.produtos;
        this.alterado = false;

        const loja = req.body.nomeLoja;
        const produtosEmLoja = this.produtos.filter(produtos => produtos.nomeLoja === loja);
        res.status(201).json(produtosEmLoja);
    }
    async updateProduto(req, res, next) {

        try {
            await this.Produto.findByIdAndUpdate(req.params.id, req.body, { new: true });
            return next();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async deleteProduto(req, res, next) {
        try {
            await this.Produto.findByIdAndDelete(req.params.id);
            res.produtos = req.params.id;
            return next();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }

    }
}
module.exports = CompraMiddleware;