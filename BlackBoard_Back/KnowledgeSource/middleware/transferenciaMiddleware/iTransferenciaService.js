/**

@interface iTransferenciaService

@description Interface para o serviço de transferencia, definindo métodos obrigatórios que devem ser implementados.

@throws {Error} Se tentar instanciar diretamente ou se um método obrigatório não for implementado.
*/
const requiredMethods = [
    "addTransferencia",
    "listTransferencia",
    "updateTransferencia",
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
