const iFornecedorService = require("./iFornecedorService");
/**
 * Classe que implementa a lógica de negócio para operações de fornecedor.
 * @class
 * @extends iFornecedorService
 */
class FornecedorMiddleware extends iFornecedorService {
  /**
     * Construtor da classe FornecedorMiddleware.
     * @constructor
     * @param {Object} FornecedorModel - Modelo de fornecedor usado para operações de banco de dados.
     */
  constructor(FornecedorModel) {
    super();
    this.Fornecedor = FornecedorModel;
    this.addFornecedor = this.addFornecedor.bind(this);
    this.listFornecedor = this.listFornecedor.bind(this);
    this.updateFornecedor = this.updateFornecedor.bind(this);
    this.deleteFornecedor = this.deleteFornecedor.bind(this);
  }
/**
     * Adiciona um novo fornecedor ao banco de dados.
     * @async
     * @param {Object} req - Objeto de requisição HTTP.
     * @param {Object} res - Objeto de resposta HTTP.
     * @param {Function} next - Função de callback para passar o controle ao próximo middleware.
     */
  async addFornecedor(req, res, next) {
    try {
      const Fornecedor = new this.Fornecedor(req.body);
      await Fornecedor.save();

      req.fornecedors = Fornecedor;
      return next();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  /**
     * Lista todos os fornecedores do banco de dados.
     * @async
     * @param {Object} req - Objeto de requisição HTTP.
     * @param {Object} res - Objeto de resposta HTTP.
     * @param {Function} next - Função de callback para passar o controle ao próximo middleware.
     */
  async listFornecedor(req, res, next) {
    try {
      const Fornecedors = await this.Fornecedor.find();
      req.Fornecedors = Fornecedors;
      return next();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  /**
     * Atualiza um fornecedor existente no banco de dados.
     * @async
     * @param {Object} req - Objeto de requisição HTTP.
     * @param {Object} res - Objeto de resposta HTTP.
     * @param {Function} next - Função de callback para passar o controle ao próximo middleware.
     */
  async updateFornecedor(req, res, next) {
    try {
      const fornecedorALT = await this.Fornecedor.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      req.fornecedors = fornecedorALT;

      return next();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  /**
     * Remove um fornecedor do banco de dados.
     * @async
     * @param {Object} req - Objeto de requisição HTTP.
     * @param {Object} res - Objeto de resposta HTTP.
     * @param {Function} next - Função de callback para passar o controle ao próximo middleware.
     */
  async deleteFornecedor(req, res, next) {
    try {
      await this.Fornecedor.findByIdAndDelete(req.params.id);
      //res.Fornecedors = req.params.id;
      return next();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
module.exports = FornecedorMiddleware;
