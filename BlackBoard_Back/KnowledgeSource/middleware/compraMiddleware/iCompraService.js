const requiredMethods = [
    "criaCompra",
    "listCompra",
    "updateCacheCompra",
    "deleteCompra"
];

class iCompraService {
    constructor() {
        if (this.constructor === iCompraService) {
            throw new Error("Instanciamento direto não permitido");
        }
        for (const method of requiredMethods) {
            if (typeof this[method] !== "function") {
                throw new Error(`A classe deve implementar o método obrigatório: ${method.toString()}`);
            }
        }
    };
}
module.exports = iCompraService;
