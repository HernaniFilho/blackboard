import axios from 'axios';

/**
 * Função genérica para fazer requisições HTTP utilizando o axios.
 *
 * @param {string} endpoint - O endpoint da API para o qual a requisição será enviada.
 * @param {Object} [param] - Parâmetros adicionais para personalizar a requisição.
 * @param {Object} [param.body] - Corpo da requisição, utilizado para métodos como POST, PUT.
 * @param {Object} [param.customConfig] - Configurações personalizadas, como headers ou parâmetros adicionais.
 * 
 * @returns {Promise<Object>} - Retorna a resposta da requisição ou um erro.
 */
async function client(endpoint, { body, ...customConfig } = {}) {
  const config = {
    url: endpoint,
    method: body ? "POST" : "GET", // Se houver corpo, o método será POST, caso contrário GET.
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
}

/**
 * Função para realizar requisição GET.
 *
 * @param {string} endpoint - O endpoint da API para o qual a requisição GET será enviada.
 * @param {Object} [customConfig] - Configurações personalizadas para a requisição.
 * 
 * @returns {Promise<Object>} - Retorna a resposta da requisição ou um erro.
 */
export const httpGet = async function (endpoint, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: "GET" });
};

/**
 * Função para realizar requisição POST.
 *
 * @param {string} endpoint - O endpoint da API para o qual a requisição POST será enviada.
 * @param {Object} body - Corpo da requisição, utilizado no método POST.
 * @param {Object} [customConfig] - Configurações personalizadas para a requisição.
 * 
 * @returns {Promise<Object>} - Retorna a resposta da requisição ou um erro.
 */
export const httpPost = async function (endpoint, body, customConfig = {}) {
  return client(endpoint, { body, ...customConfig, method: "POST" });
};

/**
 * Função para realizar requisição PUT.
 *
 * @param {string} endpoint - O endpoint da API para o qual a requisição PUT será enviada.
 * @param {Object} body - Corpo da requisição, utilizado no método PUT.
 * @param {Object} [customConfig] - Configurações personalizadas para a requisição.
 * 
 * @returns {Promise<Object>} - Retorna a resposta da requisição ou um erro.
 */
export const httpPut = async function (endpoint, body, customConfig = {}) {
  return client(endpoint, { body, ...customConfig, method: "PUT" });
};

/**
 * Função para realizar requisição DELETE.
 *
 * @param {string} endpoint - O endpoint da API para o qual a requisição DELETE será enviada.
 * @param {Object} [customConfig] - Configurações personalizadas para a requisição.
 * 
 * @returns {Promise<Object>} - Retorna a resposta da requisição ou um erro.
 */
export const httpDelete = async function (endpoint, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: "DELETE" });
};
