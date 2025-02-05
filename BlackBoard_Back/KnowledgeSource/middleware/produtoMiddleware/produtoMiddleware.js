const iProdutoService = require('./iProdutoService');
/**
 * Classe que representa o middleware de produto.
 */
class ProdutoMiddleware extends iProdutoService {
    /**
     * Cria uma instância de ProdutoMiddleware.
     * @param {Object} produtoModel - O modelo de produto.
     */
    constructor(produtoModel) {
        super();
        this.Produto = produtoModel;
        this.addProduto = this.addProduto.bind(this);
        this.listProduto = this.listProduto.bind(this);
        this.updateCacheprodutos = this.updateCacheprodutos.bind(this);
        this.updateProduto = this.updateProduto.bind(this);
        this.deleteProduto = this.deleteProduto.bind(this);
    }
/**
     * Adiciona um produto.
     * @param {Object} req - O objeto de requisição.
     * @param {Object} res - O objeto de resposta.
     * @param {Function} next - A próxima função middleware.
     * @returns {Promise<void>}
     */
    async addProduto(req, res, next) {
        try {
            const produto = new this.Produto(req.body);
            await produto.save();

            req.produtos = produto;
            return next();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
/**
     * Lista os produtos.
     * @param {Object} req - O objeto de requisição.
     * @param {Object} res - O objeto de resposta.
     * @param {Function} next - A próxima função middleware.
     * @returns {Promise<void>}
     */
    async listProduto(req, res, next) {
        try {
            const produtos = await this.Produto.find();
            req.produtos = produtos;
            return next();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    /**
     * Atualiza o cache de produtos.
     * @param {Object} req - O objeto de requisição.
     * @param {Object} res - O objeto de resposta.
     * @param {Function} next - A próxima função middleware.
     * @returns {Promise<void>}
     */
    async updateCacheprodutos(req, res, next) {
        this.produtos = req.produtos;
        this.alterado = false;

        const loja = req.body.nomeLoja;
        const produtosEmLoja = this.produtos.filter(produtos => produtos.nomeLoja === loja);
        res.status(201).json(produtosEmLoja);
    }
    /**
     * Atualiza um produto.
     * @param {Object} req - O objeto de requisição.
     * @param {Object} res - O objeto de resposta.
     * @param {Function} next - A próxima função middleware.
     * @returns {Promise<void>}
     */
    async updateProduto(req, res, next) {

        try {
            await this.Produto.findByIdAndUpdate(req.params.id, req.body, { new: true });
            return next();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    /**
     * Deleta um produto.
     * @param {Object} req - O objeto de requisição.
     * @param {Object} res - O objeto de resposta.
     * @param {Function} next - A próxima função middleware.
     * @returns {Promise<void>}
     */
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
module.exports = ProdutoMiddleware;