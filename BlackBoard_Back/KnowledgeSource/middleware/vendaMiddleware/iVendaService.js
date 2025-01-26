const requiredMethods = [
    "addVenda",
    "listVenda",
    "updateCacheVenda",
    "deleteVenda"
];

class iVendaService {
    constructor() {
        if (this.constructor === iVendaService) {
            throw new Error("Instanciamento direto não permitido");
        }
        for (const method of requiredMethods) {
            if (typeof this[method] !== "function") {
                throw new Error(`A classe deve implementar o método obrigatório: ${method.toString()}`);
            }
        }
    };
}
module.exports = iVendaService;
