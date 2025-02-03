const iFornecedorService = require("./iFornecedorService");

class FornecedorMiddleware extends iFornecedorService {
  constructor(FornecedorModel) {
    super();
    this.Fornecedor = FornecedorModel;
    this.addFornecedor = this.addFornecedor.bind(this);
    this.listFornecedor = this.listFornecedor.bind(this);
    this.updateFornecedor = this.updateFornecedor.bind(this);
    this.deleteFornecedor = this.deleteFornecedor.bind(this);
  }

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
  async listFornecedor(req, res, next) {
    try {
      const Fornecedors = await this.Fornecedor.find();
      req.Fornecedors = Fornecedors;
      return next();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
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
