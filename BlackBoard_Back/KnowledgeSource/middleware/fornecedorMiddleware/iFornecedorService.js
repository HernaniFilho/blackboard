/**
 * Interface que define os métodos obrigatórios para um serviço de fornecedor.
 * @class
 * @abstract
 */

const requiredMethods = [
    "addFornecedor",
    "listFornecedor",
    "updateFornecedor",
    "deleteFornecedor"
];
class iFornecedorService {
/**
* Construtor da classe iFornecedorService.
* @constructor
* @throws {Error} Se tentar instanciar diretamente a classe.
* @throws {Error} Se a classe filha não implementar todos os métodos obrigatórios.
*/
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