const iFornecedorService = require('./iFornecedorService');
const FornecedorMiddleware = require('./fornecedorMiddleware');

class FornecedorProxyService extends iFornecedorService {

    constructor(FornecedorModel) {
        super();
        this.FornecedorMiddleware = new FornecedorMiddleware(FornecedorModel);
        this.fornecedores = [];
        this.alterado = false;
        this.addFornecedor = this.addFornecedor.bind(this);
        this.listFornecedor = this.listFornecedor.bind(this);
        this.updateCacheFornecedors = this.updateCacheFornecedors.bind(this);
        this.updateFornecedor = this.updateFornecedor.bind(this);
        this.deleteFornecedor = this.deleteFornecedor.bind(this);
        this.updateFornecedorCache =this.updateFornecedorCache.bind(this);
    }

    async addFornecedor(req, res, next) {
        this.alterado = true;
        await this.FornecedorMiddleware.addFornecedor(req, res, next);
    }
    async listFornecedor(req, res, next) {
        //const loja = req.headers.nomeloja;//atualmente nao se utiliza essa linha para nada, porem deixei alterada assim caso mude a ideia de mostrar todos os fornecedores

        if (this.alterado || this.fornecedores.length === 0) {
            await this.FornecedorMiddleware.listFornecedor(req, res, next);
        } else {
            console.log("PEGO DO PROXY");
            //const FornecedorsEmLoja = this.fornecedores.filter(Fornecedor => Fornecedor.nomeLoja === loja);
            res.status(200).json(this.fornecedores);//FornecedorsEmLoja
        }
    }

    async updateCacheFornecedors(req, res, next) {
        this.fornecedores = req.Fornecedors;
        this.alterado = false;
        res.status(201).json(this.fornecedores);
    }
    async updateFornecedor(req, res, next) {
        this.alterado = true;
        await this.FornecedorMiddleware.updateFornecedor(req, res, next);
    }
    async updateFornecedorCache(req, res, next) {
        this.alterado = false;
        const fornecedor = req.fornecedors;

        const index = this.fornecedores.findIndex(f => String(f._id) === String(fornecedor._id));

        this.fornecedores[index] = fornecedor;
        res.status(201).json(fornecedor);
    }

    
    async deleteFornecedor(req, res, next) {
        this.alterado = true;
        await this.FornecedorMiddleware.deleteFornecedor(req, res, next);
    }

    async updateDelete(req, res, next) {
        this.alterado = false;
        const fornecedor = req.body;

        const index = this.fornecedores.findIndex(f => f.nomeFornecedor === fornecedor.nomeFornecedor && f._id === req.params.id);
        this.fornecedores.splice(index, 1);
        res.status(201).json({ message: 'Fornecedor removido com sucesso!' });
    }
    async addFornecedorCache(req, res, next) {
        const fornecedorAtualizado = req.fornecedors;
        const index = this.fornecedores.push(fornecedorAtualizado);

        this.fornecedores[index] = fornecedorAtualizado;
        res.status(201).json(req.body);
    }
}
module.exports = FornecedorProxyService;