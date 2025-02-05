const iVendaService = require('./iVendaService');
const VendaMiddleware = require('./vendaMiddleware');
/**
 * Classe que representa um serviço proxy para vendas.
 * Extende a interface iVendaService.
 */
class VendaProxyService extends iVendaService {
/**
     * Cria uma instância de VendaProxyService.
     * @param {Object} VendaModel - O modelo de venda.
     */
    constructor(VendaModel) {
        super();
        this.VendaMiddleware = new VendaMiddleware(VendaModel);
        this.vendas = [];
        this.alterado = false;
        this.addVenda = this.addVenda.bind(this);
        this.listVenda = this.listVenda.bind(this);
        this.updateCacheVendas = this.updateCacheVendas.bind(this);
        this.updateVenda = this.updateVenda.bind(this);
        this.deleteVenda = this.deleteVenda.bind(this);
        this.updateVendaCache =this.updateVendaCache.bind(this);
    }
/**
     * Adiciona uma venda.
     * @param {Object} req - O objeto de requisição.
     * @param {Object} res - O objeto de resposta.
     * @param {Function} next - A próxima função middleware.
     * @returns {Promise<void>}
     */
    async addVenda(req, res, next) {
        this.alterado = true;
        await this.VendaMiddleware.addVenda(req, res, next);
    }
    /**
     * Lista as vendas.
     * @param {Object} req - O objeto de requisição.
     * @param {Object} res - O objeto de resposta.
     * @param {Function} next - A próxima função middleware.
     * @returns {Promise<void>}
     */
    async listVenda(req, res, next) {
        //const loja = req.headers.nomeloja;

        if (this.alterado || this.vendas.length === 0) {
            await this.VendaMiddleware.listVenda(req, res, next);
        } else {
            console.log("PEGO DO PROXY");
            //const VendasEmLoja = this.vendas.filter(vendas => vendas.nomeLoja === loja);
            res.status(200).json(this.vendas);//VendasEmLoja
        }
    }
/**
     * Atualiza o cache de vendas.
     * @param {Object} req - O objeto de requisição.
     * @param {Object} res - O objeto de resposta.
     * @param {Function} next - A próxima função middleware.
     * @returns {Promise<void>}
     */
    async updateCacheVendas(req, res, next) {
        this.vendas = req.vendas;
        this.alterado = false;
        res.status(201).json(this.vendas);
    }
    /**
     * Atualiza uma venda.
     * @param {Object} req - O objeto de requisição.
     * @param {Object} res - O objeto de resposta.
     * @param {Function} next - A próxima função middleware.
     * @returns {Promise<void>}
     */
    async updateVenda(req, res, next) {
        this.alterado = true;
        await this.VendaMiddleware.updateVenda(req, res, next);
    }
    /**
     * Atualiza o cache de vendas após uma atualização.
     * @param {Object} req - O objeto de requisição.
     * @param {Object} res - O objeto de resposta.
     * @param {Function} next - A próxima função middleware.
     * @returns {Promise<void>}
     */
    async updateVendaCache(req, res, next) {
        this.alterado = false;
        const Venda = req.vendas;

        const index = this.vendas.findIndex(v => String(v._id) === String(Venda._id));

        this.vendas[index] = Venda;
        res.status(201).json(Venda);
    }
    /**
     * Deleta uma venda.
     * @param {Object} req - O objeto de requisição.
     * @param {Object} res - O objeto de resposta.
     * @param {Function} next - A próxima função middleware.
     * @returns {Promise<void>}
     */
    async deleteVenda(req, res, next) {
        this.alterado = true;
        await this.VendaMiddleware.deleteVenda(req, res, next);
    }
/**
     * Atualiza a lista de vendas após uma exclusão.
     * @param {Object} req - O objeto de requisição.
     * @param {Object} res - O objeto de resposta.
     * @param {Function} next - A próxima função middleware.
     * @returns {Promise<void>}
     */
    async updateDelete(req, res, next) {
        this.alterado = false;
        const Venda = req.body;

        const index = this.vendas.findIndex(v => v._id === req.params.id);
        this.vendas.splice(index, 1);
        res.status(201).json({ message: 'Venda removido com sucesso!' });
    }
    /**
     * Adiciona uma venda ao cache.
     * @param {Object} req - O objeto de requisição.
     * @param {Object} res - O objeto de resposta.
     * @param {Function} next - A próxima função middleware.
     * @returns {Promise<void>}
     */
    async addVendaCache(req, res, next) {
        const VendaAtualizado = req.vendas;
        const index = this.vendas.push(VendaAtualizado);

        this.vendas[index] = VendaAtualizado;
        res.status(201).json(req.body);
    }
}
module.exports = VendaProxyService;