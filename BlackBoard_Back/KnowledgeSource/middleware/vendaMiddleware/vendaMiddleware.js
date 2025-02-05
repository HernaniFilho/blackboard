const iVendaService = require('./iVendaService');
/**
 * Classe que representa o middleware de venda.
 * Extende a interface iVendaService.
 */
class VendaMiddleware extends iVendaService {
    /**
     * Cria uma instância de VendaMiddleware.
     * @param {Object} VendaModel - O modelo de venda.
     */
    constructor(VendaModel) {
        super();
        this.Venda = VendaModel;
        this.addVenda = this.addVenda.bind(this);
        this.listVenda = this.listVenda.bind(this);
        this.updateVenda = this.updateVenda.bind(this);
        this.deleteVenda = this.deleteVenda.bind(this);
    }
/**
     * Adiciona uma venda.
     * @param {Object} req - O objeto de requisição.
     * @param {Object} res - O objeto de resposta.
     * @param {Function} next - A próxima função middleware.
     * @returns {Promise<void>}
     */
    async addVenda(req, res, next) {
        try {
            const Venda = new this.Venda(req.body);
            await Venda.save();

            req.vendas = Venda;
            const HEADER = req.headers.nomeloja;
            console.log("HEADERS AQUI EM addVenda:", HEADER);
            return next();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    /**
     * Lista as vendas.
     * @param {Object} req - O objeto de requisição.
     * @param {Object} res - O objeto de resposta.
     * @param {Function} next - A próxima função middleware.
     * @returns {Promise<void>}
     */
    async listVenda(req, res, next) {
        try {
            const Vendas = await this.Venda.find();
            req.vendas = Vendas;
            return next();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    /**
     * Atualiza uma venda.
     * @param {Object} req - O objeto de requisição.
     * @param {Object} res - O objeto de resposta.
     * @param {Function} next - A próxima função middleware.
     * @returns {Promise<void>}
     */
    async updateVenda(req, res, next) {
        try {
            const VendaALT = await this.Venda.findByIdAndUpdate(req.params.id, req.body, { new: true });
            req.vendas = VendaALT;

            return next();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    /**
     * Deleta uma venda.
     * @param {Object} req - O objeto de requisição.
     * @param {Object} res - O objeto de resposta.
     * @param {Function} next - A próxima função middleware.
     * @returns {Promise<void>}
     */
    async deleteVenda(req, res, next) {
        try {
            await this.Venda.findByIdAndDelete(req.params.id);
            //res.vendas = req.params.id;
            return next();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }

    }
}
module.exports = VendaMiddleware;