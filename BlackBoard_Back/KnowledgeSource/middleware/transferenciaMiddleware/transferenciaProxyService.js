const iTransferenciaService = require('./iTransferenciaService');
const TransferenciaMiddleware = require('./transferenciaMiddleware');
/**
 * Classe que representa um serviço proxy para transferências.
 * Extende a interface iTransferenciaService.
 */
class TransferenciaProxyService extends iTransferenciaService {
/**
     * Cria uma instância de TransferenciaProxyService.
     * @param {Object} TransferenciaModel - O modelo de transferência.
     */
    constructor(TransferenciaModel) {
        super();
        this.TransferenciaMiddleware = new TransferenciaMiddleware(TransferenciaModel);
        this.transferencias = [];
        this.alterado = false;
        this.addTransferencia = this.addTransferencia.bind(this);
        this.listTransferencia = this.listTransferencia.bind(this);
        this.updateCacheTransferencias = this.updateCacheTransferencias.bind(this);
        this.updateTransferencia = this.updateTransferencia.bind(this);
        this.deleteTransferencia = this.deleteTransferencia.bind(this);
        this.updateTransferenciaCache =this.updateTransferenciaCache.bind(this);
    }
/**
     * Adiciona uma transferência.
     * @param {Object} req - O objeto de requisição.
     * @param {Object} res - O objeto de resposta.
     * @param {Function} next - A próxima função middleware.
     * @returns {Promise<void>}
     */
    async addTransferencia(req, res, next) {
        this.alterado = true;
        await this.TransferenciaMiddleware.addTransferencia(req, res, next);
    }
    /**
     * Lista as transferências.
     * @param {Object} req - O objeto de requisição.
     * @param {Object} res - O objeto de resposta.
     * @param {Function} next - A próxima função middleware.
     * @returns {Promise<void>}
     */
    async listTransferencia(req, res, next) {
        //const loja = req.headers.nomeloja;

        if (this.alterado || this.transferencias.length === 0) {
            await this.TransferenciaMiddleware.listTransferencia(req, res, next);
        } else {
            console.log("PEGO DO PROXY");
            //const FornecedorsEmLoja = this.fornecedores.filter(Fornecedor => Fornecedor.nomeLoja === loja);
            res.status(200).json(this.transferencias);//FornecedorsEmLoja
        }
    }
/**
     * Atualiza o cache de transferências.
     * @param {Object} req - O objeto de requisição.
     * @param {Object} res - O objeto de resposta.
     * @param {Function} next - A próxima função middleware.
     * @returns {Promise<void>}
     */
    async updateCacheTransferencias(req, res, next) {
        this.transferencias = req.transferencias;
        this.alterado = false;
        res.status(201).json(this.transferencias);
    }
    /**
     * Atualiza uma transferência.
     * @param {Object} req - O objeto de requisição.
     * @param {Object} res - O objeto de resposta.
     * @param {Function} next - A próxima função middleware.
     * @returns {Promise<void>}
     */
    async updateTransferencia(req, res, next) {
        this.alterado = true;
        await this.TransferenciaMiddleware.updateTransferencia(req, res, next);
    }
    /**
     * Atualiza o cache de transferências após uma atualização.
     * @param {Object} req - O objeto de requisição.
     * @param {Object} res - O objeto de resposta.
     * @param {Function} next - A próxima função middleware.
     * @returns {Promise<void>}
     */
    async updateTransferenciaCache(req, res, next) {
        this.alterado = false;
        const transferencia = req.transferencias;

        const index = this.transferencias.findIndex(t => String(t._id) === String(transferencia._id));

        this.transferencias[index] = transferencia;
        res.status(201).json(transferencia);
    }
    /**
     * Deleta uma transferência.
     * @param {Object} req - O objeto de requisição.
     * @param {Object} res - O objeto de resposta.
     * @param {Function} next - A próxima função middleware.
     * @returns {Promise<void>}
     */
    async deleteTransferencia(req, res, next) {
        this.alterado = true;
        await this.TransferenciaMiddleware.deleteTransferencia(req, res, next);
    }
/**
     * Atualiza a lista de transferências após uma exclusão.
     * @param {Object} req - O objeto de requisição.
     * @param {Object} res - O objeto de resposta.
     * @param {Function} next - A próxima função middleware.
     * @returns {Promise<void>}
     */
    async updateDelete(req, res, next) {
        this.alterado = false;
        //const transferencia = req.body;

        const index = this.transferencias.findIndex(t => t._id === req.params.id);
        this.transferencias.splice(index, 1);
        res.status(201).json({ message: 'Transferencia removida com sucesso!' });
    }
    /**
     * Adiciona uma transferência ao cache.
     * @param {Object} req - O objeto de requisição.
     * @param {Object} res - O objeto de resposta.
     * @param {Function} next - A próxima função middleware.
     * @returns {Promise<void>}
     */
    async addTransferenciaCache(req, res, next) {
        const transferenciaAtualizado = req.transferencias;
        const index = this.transferencias.push(transferenciaAtualizado);

        this.transferencias[index] = transferenciaAtualizado;
        res.status(201).json(req.body);
    }
}
module.exports = TransferenciaProxyService;