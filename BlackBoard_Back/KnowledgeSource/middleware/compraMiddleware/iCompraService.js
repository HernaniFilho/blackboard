/**

@interface iCompraService

@description Interface para o serviço de compra, definindo métodos obrigatórios que devem ser implementados.

@throws {Error} Se tentar instanciar diretamente ou se um método obrigatório não for implementado.
*/
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
