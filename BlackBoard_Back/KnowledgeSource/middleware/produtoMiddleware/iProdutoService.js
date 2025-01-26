const requiredMethods = [
    "addProduto",
    "listProduto",
    "updateCacheprodutos",
    "updateProduto",
    "deleteProduto"
];

class iProdutoService {
    constructor() {
        if (this.constructor === iProdutoService) {
            throw new Error("Instanciamento direto não permitido");
        }
        for (const method of requiredMethods) {
            if (typeof this[method] !== "function") {
                throw new Error(`A classe deve implementar o método obrigatório: ${method.toString()}`);
            }
        }
    };
}
module.exports = iProdutoService;
