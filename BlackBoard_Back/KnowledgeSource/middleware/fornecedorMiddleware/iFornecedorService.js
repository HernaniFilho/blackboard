const requiredMethods = [
    "addFornecedor",
    "listFornecedor",
    "updateFornecedor",
    "deleteFornecedor"
];

class iFornecedorService {
    constructor() {
        if (this.constructor === iFornecedorService) {
            throw new Error("Instanciamento direto não permitido");
        }
        for (const method of requiredMethods) {
            if (typeof this[method] !== "function") {
                throw new Error(`A classe deve implementar o método obrigatório: ${method.toString()}`);
            }
        }
    };
}
module.exports = iFornecedorService;