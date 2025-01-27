const iTransferenciaService = require('./iTransferenciaService');

class TransferenciaMiddleware extends iTransferenciaService {
    constructor(TransferenciaModel) {
        super();
        this.Transferencia = TransferenciaModel;
        this.addTransferencia = this.addTransferencia.bind(this);
        this.listTransferencia = this.listTransferencia.bind(this);
        this.updateTransferencia = this.updateTransferencia.bind(this);
        this.deleteTransferencia = this.deleteTransferencia.bind(this);
    }

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
    async listTransferencia(req, res, next) {
        try {
            const Transferencias = await this.Transferencia.find();
            req.transferencias = Transferencias;
            return next();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async updateTransferencia(req, res, next) {
        try {
            const TransferenciaALT = await this.Transferencia.findByIdAndUpdate(req.params.id, req.body, { new: true });
            req.transferencias = TransferenciaALT;

            return next();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
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