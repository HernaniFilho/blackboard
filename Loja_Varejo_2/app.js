import axios from 'axios';

/**
 * Função genérica para fazer requisições HTTP com axios.
 * @param {string} endpoint - O endpoint da API para a requisição.
 * @param {Object} [param] - Parâmetros para a requisição.
 * @param {Object} [param.body] - O corpo da requisição, utilizado para métodos POST e PUT.
 * @param {Object} [param.customConfig] - Configurações customizadas para a requisição (ex: headers, params).
 * @returns {Promise<Object>} A resposta da API.
 * @throws {Promise<Error>} Erro em caso de falha na requisição.
 */
async function client(endpoint, { body, ...customConfig } = {}) {
    const config = {
        url: endpoint,
        method: body ? "POST" : "GET",
        data: body,
        headers: {
            "Content-Type": "application/json",
            ...customConfig.headers,
        },
        ...customConfig,
    };
    try {
        const response = await axios(config);
        return response.data;
    } catch (err) {
        const errMsg = err.response?.data?.message || err.message || "Erro desconhecido";
        return Promise.reject(errMsg);
    }
};

/**
 * Função para realizar uma requisição GET.
 * @param {string} endpoint - O endpoint da API para a requisição GET.
 * @param {Object} [customConfig] - Configurações adicionais para a requisição (opcional).
 * @returns {Promise<Object>} A resposta da API.
 */
export const httpGet = async function (endpoint, customConfig = {}) {
    return client(endpoint, { ...customConfig, method: "GET" });
};

/**
 * Função para realizar uma requisição POST.
 * @param {string} endpoint - O endpoint da API para a requisição POST.
 * @param {Object} body - O corpo da requisição.
 * @param {Object} [customConfig] - Configurações adicionais para a requisição (opcional).
 * @returns {Promise<Object>} A resposta da API.
 */
export const httpPost = async function (endpoint, body, customConfig = {}) {
    return client(endpoint, { body, ...customConfig, method: "POST" });
};

/**
 * Função para realizar uma requisição PUT.
 * @param {string} endpoint - O endpoint da API para a requisição PUT.
 * @param {Object} body - O corpo da requisição.
 * @param {Object} [customConfig] - Configurações adicionais para a requisição (opcional).
 * @returns {Promise<Object>} A resposta da API.
 */
export const httpPut = async function (endpoint, body, customConfig = {}) {
    return client(endpoint, { body, ...customConfig, method: "PUT" });
};

/**
 * Função para realizar uma requisição DELETE.
 * @param {string} endpoint - O endpoint da API para a requisição DELETE.
 * @param {Object} [customConfig] - Configurações adicionais para a requisição (opcional).
 * @returns {Promise<Object>} A resposta da API.
 */
export const httpDelete = async function (endpoint, customConfig = {}) {
    return client(endpoint, { ...customConfig, method: "DELETE" });
};
