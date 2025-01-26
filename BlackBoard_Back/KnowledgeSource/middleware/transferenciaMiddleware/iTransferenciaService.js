const requiredMethods = [
    "addTransferencia",
    "listTransferencia",
    "updateCacheTransferencia",
    "deleteTransferencia"
];

class iTransferenciaService {
    constructor() {
        if (this.constructor === iTransferenciaService) {
            throw new Error("Instanciamento direto não permitido");
        }
        for (const method of requiredMethods) {
            if (typeof this[method] !== "function") {
                throw new Error(`A classe deve implementar o método obrigatório: ${method.toString()}`);
            }
        }
    };
}
module.exports = iTransferenciaService;
