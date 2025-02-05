/**

@interface iVendaService

@description Interface para o serviço de venda, definindo métodos obrigatórios que devem ser implementados.

@throws {Error} Se tentar instanciar diretamente ou se um método obrigatório não for implementado.
*/
const requiredMethods = [
    "addVenda",
    "listVenda",
    "updateVenda",
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
