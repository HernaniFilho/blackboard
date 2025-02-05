const iTransferenciaService = require('./iTransferenciaService');
/**
 * Classe que representa o middleware de transferência.
 * Extende a interface iTransferenciaService.
 */
class TransferenciaMiddleware extends iTransferenciaService {
    /**
     * Cria uma instância de TransferenciaMiddleware.
     * @param {Object} TransferenciaModel - O modelo de transferência.
     */
    constructor(TransferenciaModel) {
        super();
        this.Transferencia = TransferenciaModel;
        this.addTransferencia = this.addTransferencia.bind(this);
        this.listTransferencia = this.listTransferencia.bind(this);
        this.updateTransferencia = this.updateTransferencia.bind(this);
        this.deleteTransferencia = this.deleteTransferencia.bind(this);
    }
/**
     * Adiciona uma transferência.
     * @param {Object} req - O objeto de requisição.
     * @param {Object} res - O objeto de resposta.
     * @param {Function} next - A próxima função middleware.
     * @returns {Promise<void>}
     */
    async addTransferencia(req, res, next) {
        try {
            const Transferencia = new this.Transferencia(req.body);
            await Transferencia.save();

            req.transferencias = Transferencia;
            return next();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    /**
     * Lista as transferências.
     * @param {Object} req - O objeto de requisição.
     * @param {Object} res - O objeto de resposta.
     * @param {Function} next - A próxima função middleware.
     * @returns {Promise<void>}
     */
    async listTransferencia(req, res, next) {
        try {
            const Transferencias = await this.Transferencia.find();
            req.transferencias = Transferencias;
            return next();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    /**
     * Atualiza uma transferência.
     * @param {Object} req - O objeto de requisição.
     * @param {Object} res - O objeto de resposta.
     * @param {Function} next - A próxima função middleware.
     * @returns {Promise<void>}
     */
    async updateTransferencia(req, res, next) {
        try {
            const TransferenciaALT = await this.Transferencia.findByIdAndUpdate(req.params.id, req.body, { new: true });
            req.transferencias = TransferenciaALT;

            return next();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    /**
     * Deleta uma transferência.
     * @param {Object} req - O objeto de requisição.
     * @param {Object} res - O objeto de resposta.
     * @param {Function} next - A próxima função middleware.
     * @returns {Promise<void>}
     */
    async deleteTransferencia(req, res, next) {
        try {
            await this.transferencias.findByIdAndDelete(req.params.id);
            //res.Fornecedors = req.params.id;
            return next();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }

    }
}
module.exports = TransferenciaMiddleware;