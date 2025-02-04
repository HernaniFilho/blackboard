import axios from "axios";

/**
 * Função auxiliar para fazer requisições HTTP usando o axios.
 * Determina o método HTTP (GET ou POST) com base na presença de um corpo (body),
 * e permite configuração personalizada das requisições.
 *
 * @param {string} endpoint - O endpoint da API para a requisição.
 * @param {Object} options - Opções de configuração personalizadas para a requisição.
 * @param {Object} options.body - O corpo da requisição (para POST e PUT).
 * @param {Object} options.customConfig - Configuração adicional para o axios.
 * @returns {Promise<Object>} - Retorna a resposta da requisição ou um erro.
 */
async function client(endpoint, { body, ...customConfig } = {}) {
  const config = {
    url: endpoint,
    method: body ? "POST" : "GET", // Se body existir, usaremos POST, caso contrário GET.
    data: body,
    headers: {
      "Content-Type": "application/json", // Cabeçalho padrão
      ...customConfig.headers, // Cabeçalhos personalizados (se houver)
    },
    ...customConfig, // Outras configurações personalizadas
  };
  try {
    const response = await axios(config);
    return response.data; // Retorna os dados da resposta
  } catch (err) {
    // Extrai a mensagem de erro, se disponível, ou retorna uma mensagem padrão
    const errMsg =
      err.response?.data?.message || err.message || "Erro desconhecido";
    return Promise.reject(errMsg); // Retorna o erro
  }
}

/**
 * Função para fazer requisições GET.
 *
 * @param {string} endpoint - O endpoint da API para a requisição.
 * @param {Object} customConfig - Configuração adicional para o axios.
 * @returns {Promise<Object>} - Retorna a resposta da requisição GET.
 */
export const httpGet = async function (endpoint, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: "GET" });
};

/**
 * Função para fazer requisições POST.
 *
 * @param {string} endpoint - O endpoint da API para a requisição.
 * @param {Object} body - O corpo da requisição POST.
 * @param {Object} customConfig - Configuração adicional para o axios.
 * @returns {Promise<Object>} - Retorna a resposta da requisição POST.
 */
export const httpPost = async function (endpoint, body, customConfig = {}) {
  return client(endpoint, { body, ...customConfig, method: "POST" });
};

/**
 * Função para fazer requisições PUT.
 *
 * @param {string} endpoint - O endpoint da API para a requisição.
 * @param {Object} body - O corpo da requisição PUT.
 * @param {Object} customConfig - Configuração adicional para o axios.
 * @returns {Promise<Object>} - Retorna a resposta da requisição PUT.
 */
export const httpPut = async function (endpoint, body, customConfig = {}) {
  return client(endpoint, { body, ...customConfig, method: "PUT" });
};

/**
 * Função para fazer requisições DELETE.
 *
 * @param {string} endpoint - O endpoint da API para a requisição.
 * @param {Object} customConfig - Configuração adicional para o axios.
 * @returns {Promise<Object>} - Retorna a resposta da requisição DELETE.
 */
export const httpDelete = async function (endpoint, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: "DELETE" });
};
