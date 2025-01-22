import axios from 'axios';

async function client(endpoint,{body,...customConfig} = {}) {
    const config = {
        url:endpoint,
        method: body ? "POST":"GET",
        data: body,
        headers:{
            "Content-Type":"application/json",
            ...customConfig.headers,
        },
        ...customConfig,
    };
    try{
        const response = await axios(config);
        return response.data;
    }catch(err){
        const errMsg = err.response?.data?.message || err.message || "Erro desconhecido";
        return Promise.reject(errorMessage);
    }
};



export const httpGet = async function (endpoint, customConfig = {}) {
    return client(endpoint, { ...customConfig, method: "GET" });
};

export const httpPost = async function (endpoint, body, customConfig = {}) {

    return client(endpoint, { body, ...customConfig, method: "POST" });
};

export const httpPut = async function (endpoint, body, customConfig = {}) {
    return client(endpoint, { body, ...customConfig, method: "PUT" });
};

export const httpDelete = async function (endpoint, customConfig = {}) {
    return client(endpoint, { ...customConfig, method: "DELETE" });
};
