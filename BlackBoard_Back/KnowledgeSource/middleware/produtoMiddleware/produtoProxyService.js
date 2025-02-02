const iProdutoService = require('./iProdutoService');
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
        const loja = req.headers.nomeloja;
        var produtosEmLoja = [];
        if (this.alterado || this.produtos.length === 0) {
            await this.produtoMiddleware.listProduto(req, res, next);
        } else {
            console.log("Peguei do Proxy")
            if(loja !== "z") {
                produtosEmLoja = this.produtos.filter(produtos => produtos.nomeLoja === loja);
            } else {
                produtosEmLoja = this.produtos;
            }
            res.status(200).json(produtosEmLoja);
        }
    }

    async updateCacheprodutos(req, res, next) {
        this.produtos = req.produtos;
        this.alterado = false;
        const loja = req.headers.nomeloja;//const loja = req.headers.nomeLoja;
        var produtosEmLoja = [];
        if(loja !== "z") {
            produtosEmLoja = this.produtos.filter(produtos => produtos.nomeLoja === loja);
        } else {
            produtosEmLoja = this.produtos;
        }
        res.status(201).json(produtosEmLoja);
    }

    async updateProduto(req, res, next) {
        this.alterado = true;
        const nomeAlteracao = req.body.nomeProduto;
        //const HEADER = req.headers.nomeloja;
        //console.log("HEADERS AQUI EM updateProduto:", HEADER);
        
        if(this.produtos.length !== 0){
            if((this.produtos.filter(produto=>produto.nomeProduto === nomeAlteracao)).length === 0 ){
                res.status(401).json({nomeProduto:'Não é permitido a alteração do nome do produto.'})
            }else{
                await this.produtoMiddleware.updateProduto(req, res, next);   
            }
        }else{
            res.status(401).json({semCache:'Não há produto para alterar na cache.'})
        }
    }

    async updateProdutoCache(req, res, next) {
        const produtoAtualizado = req.body;
            const index = this.produtos.findIndex(
                p => p.nomeProduto === produtoAtualizado.nomeProduto && p.nomeLoja === produtoAtualizado.nomeLoja
            );
            this.produtos[index] = produtoAtualizado;
            res.status(201).json(req.body);
    }
    async deleteProduto(req, res, next) {
        this.alterado = true;
        await this.produtoMiddleware.deleteProduto(req, res, next);
    }

    async updateDelete(req, res, next) {
        this.alterado = true;
        //const HEADER = req.headers.nomeloja;
        //console.log("HEADERS AQUI EM updateDelete:", HEADER);
        const produto = req.body;
        const index = this.produtos.findIndex(p => p.nomeProduto === produto.nomeProduto && p.nomeLoja === produto.nomeLoja);

        if (index >= 0) {
            this.produtos.splice(index, 1);
        }
        res.status(201).json({ message: 'Produto removido com sucesso!' });
    }

    async addProdutoCache(req, res, next) {
        const novoProduto = req.produtos;
        const index = this.produtos.push(novoProduto);
        console.log("addProdutoCache", req.headers);

        this.produtos[index] = novoProduto;
        res.status(201).json(novoProduto);
    }

}
module.exports = produtoProxyService;