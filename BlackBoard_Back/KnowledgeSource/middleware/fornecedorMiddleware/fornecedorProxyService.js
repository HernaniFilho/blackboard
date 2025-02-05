const iFornecedorService = require("./iFornecedorService");
const FornecedorMiddleware = require("./fornecedorMiddleware");
/**
 * Classe que atua como um proxy para o serviço de fornecedor, adicionando funcionalidades de cache.
 * @class
 * @extends iFornecedorService
 */
class FornecedorProxyService extends iFornecedorService {
  /**
     * Construtor da classe FornecedorProxyService.
     * @constructor
     * @param {Object} FornecedorModel - Modelo de fornecedor usado pelo middleware.
     */
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
    this.updateFornecedorCache = this.updateFornecedorCache.bind(this);
  }
/**
     * Adiciona um novo fornecedor e marca o cache como alterado.
     * @async
     * @param {Object} req - Objeto de requisição HTTP.
     * @param {Object} res - Objeto de resposta HTTP.
     * @param {Function} next - Função de callback para passar o controle ao próximo middleware.
     */
  async addFornecedor(req, res, next) {
    this.alterado = true;
    await this.FornecedorMiddleware.addFornecedor(req, res, next);
  }
  /**
     * Lista os fornecedores, utilizando cache se disponível e não alterado.
     * @async
     * @param {Object} req - Objeto de requisição HTTP.
     * @param {Object} res - Objeto de resposta HTTP.
     * @param {Function} next - Função de callback para passar o controle ao próximo middleware.
     */
  async listFornecedor(req, res, next) {
    //const loja = req.headers.nomeloja;//atualmente nao se utiliza essa linha para nada, porem deixei alterada assim caso mude a ideia de mostrar todos os fornecedores

    if (this.alterado || this.fornecedores.length === 0) {
      await this.FornecedorMiddleware.listFornecedor(req, res, next);
    } else {
      console.log("PEGO DO PROXY");
      //const FornecedorsEmLoja = this.fornecedores.filter(Fornecedor => Fornecedor.nomeLoja === loja);
      res.status(200).json(this.fornecedores); //FornecedorsEmLoja
    }
  }
/**
     * Atualiza o cache de fornecedores.
     * @async
     * @param {Object} req - Objeto de requisição HTTP.
     * @param {Object} res - Objeto de resposta HTTP.
     * @param {Function} next - Função de callback para passar o controle ao próximo middleware.
     */
  async updateCacheFornecedors(req, res, next) {
    this.fornecedores = req.Fornecedors;
    this.alterado = false;
    res.status(201).json(this.fornecedores);
  }
  /**
     * Atualiza um fornecedor e marca o cache como alterado.
     * @async
     * @param {Object} req - Objeto de requisição HTTP.
     * @param {Object} res - Objeto de resposta HTTP.
     * @param {Function} next - Função de callback para passar o controle ao próximo middleware.
     */
  async updateFornecedor(req, res, next) {
    this.alterado = true;
    await this.FornecedorMiddleware.updateFornecedor(req, res, next);
  }
  /**
     * Atualiza o cache de um fornecedor específico.
     * @async
     * @param {Object} req - Objeto de requisição HTTP.
     * @param {Object} res - Objeto de resposta HTTP.
     * @param {Function} next - Função de callback para passar o controle ao próximo middleware.
     */
  async updateFornecedorCache(req, res, next) {
    this.alterado = false;
    const fornecedor = req.fornecedors;

    const index = this.fornecedores.findIndex(
      (f) => String(f._id) === String(fornecedor._id)
    );

    this.fornecedores[index] = fornecedor;
    res.status(201).json(fornecedor);
  }
/**
     * Remove um fornecedor e marca o cache como alterado.
     * @async
     * @param {Object} req - Objeto de requisição HTTP.
     * @param {Object} res - Objeto de resposta HTTP.
     * @param {Function} next - Função de callback para passar o controle ao próximo middleware.
     */
  async deleteFornecedor(req, res, next) {
    this.alterado = true;
    await this.FornecedorMiddleware.deleteFornecedor(req, res, next);
  }
/**
     * Atualiza o cache após a remoção de um fornecedor.
     * @async
     * @param {Object} req - Objeto de requisição HTTP.
     * @param {Object} res - Objeto de resposta HTTP.
     * @param {Function} next - Função de callback para passar o controle ao próximo middleware.
     */
  async updateDelete(req, res, next) {
    this.alterado = false;
    const index = this.fornecedores.findIndex(
      (f) => f._id.toString() === req.params.id
    );

    if (index >= 0) {
      this.fornecedores.splice(index, 1);
    }

    res.status(201).json({ message: "Fornecedor removido com sucesso!" });
  }
  /**
     * Adiciona um novo fornecedor ao cache.
     * @async
     * @param {Object} req - Objeto de requisição HTTP.
     * @param {Object} res - Objeto de resposta HTTP.
     * @param {Function} next - Função de callback para passar o controle ao próximo middleware.
     */
  async addFornecedorCache(req, res, next) {
    const fornecedorAtualizado = req.fornecedors;
    const index = this.fornecedores.push(fornecedorAtualizado);

    this.fornecedores[index] = fornecedorAtualizado;
    res.status(201).json(req.body);
  }
}
module.exports = FornecedorProxyService;
