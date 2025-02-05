/**
 * Classe que representa um publicador.
 */
class publisher {
    /**
     * Cria um publicador.
     * @param {Array} clients - Os clientes a serem notificados.
     * @param {Object} ProductModel - O modelo de produto.
     */
    constructor(clients,ProductModel){
        /**
         * @type {Array}
         * @description Os clientes a serem notificados.
         */
        this.clients = clients;
        /**
         * @type {Object}
         * @description O modelo de produto.
         */
        this.Product = ProductModel;
        this.notifyAlt = this.notifyAlt.bind(this);
        this.notifyChange = this.notifyChange.bind(this);
    }
/**
     * Notifica os clientes de um evento.
     * @param {Object} req - O objeto de requisição.
     * @param {Object} res - O objeto de resposta.
     * @param {Function} next - A próxima função middleware.
     * @returns {Promise<void>}
     */
    async notifyAlt(req,res,next) {
        console.log('Chamando notifyAlt');
        const flag = true;
        this.notifyChange(flag);
    }
    
    ////////////////////////////////////////////
/**
     * Notifica os clientes de um evento de mudança.
     * @param {boolean} flag - A flag indicando a mudança.
     * @returns {void}
     */
    async notifyChange(flag) {
        const event = `event: change\n`;
        const data = `data: ${JSON.stringify({ flag })}\n\n`;
        console.log("Disparando evento SSE:", data);
        this.clients.forEach((client) => {
            client.write(event);
            client.write(data);
        });
    }
}
module.exports = publisher;