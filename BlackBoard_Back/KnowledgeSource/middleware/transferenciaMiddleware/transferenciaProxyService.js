const iProdutoService = require('./iTransferenciaService');
const ProdutoMiddleware = require('./produtoMiddleware');

class produtoProxyService extends iProdutoService {

    constructor(produtoModel) {
        super();
        this.produtoMiddleware = new ProdutoMiddleware(produtoModel);
        this.produtos = [];
        this.alterado = false;
        this.addProduto = this.addProduto.bind(this);
        this.listProduto = this.listProduto.bind(this);
        this.updateCacheprodutos = this.updateCacheprodutos.bind(this);
        this.updateProduto = this.updateProduto.bind(this);
        this.deleteProduto = this.deleteProduto.bind(this);
    }

    async addProduto(req, res, next) {
        this.alterado = true;
        await this.produtoMiddleware.addProduto(req, res, next);
    }
    async listProduto(req, res, next) {
        const loja = req.body.nomeLoja;

        if (this.alterado || this.produtos.length === 0) {
            await this.produtoMiddleware.listProduto(req, res, next);
        } else {
            const produtosEmLoja = this.produtos.filter(produto => produto.nomeLoja === loja);
            res.status(200).json(produtosEmLoja);
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
        this.alterado = true;
        await this.produtoMiddleware.updateProduto(req, res, next);
    }
    async updateProdutoCache(req, res, next) {
        const produtoAtualizado = req.body;
        const index = this.produtos.findIndex(
            p => p.nome === produtoAtualizado.nome && p.nomeLoja === produtoAtualizado.nomeLoja
        );
        if (index >= 0) {
            this.produtos[index] = produtoAtualizado;
            res.status(201).json(req.body);
        }

    }
    async deleteProduto(req, res, next) {
        this.alterado = true;
        await this.produtoMiddleware.deleteProduto(req, res, next);
    }

    async updateDelete(req, res, next) {
        this.alterado = true;

        const produto = req.body;
        const index = this.produtos.findIndex(p => p.nome === produto.nome && p.nomeLoja === produto.nomeLoja);

        if (index >= 0) {
            this.produtos.splice(index, 1);
        }
        res.status(201).json({ message: 'Produto removido com sucesso!' });
    }
}
module.exports = produtoProxyService;