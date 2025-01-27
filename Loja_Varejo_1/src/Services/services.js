import axios from "axios";

const baseURL = "http://localhost:3000";

export async function listarProdutos(){
    //const token = localStorage.getItem('token');
    const response = axios.get(`${baseURL}/api/produtos`);
    return response;
};


export async function registrarVenda(body) {
    /*const tokenCria = localStorage.getItem('token');
    if (!tokenCria) {
        throw new Error("Token não encontrado. Verifique se o usuário está autenticado.");
    }*/

    try {
        //console.log("CRIAR VENDA AQUI", body);
        
        const response = await axios.post(`${baseURL}/api/vendas`, body/*, {
            headers: {
                Authorization: `Bearer ${tokenCria}`
            },
        }*/);
        console.log("Resposta do servidor:", response.data);
        return response.data; // Return response data if needed
    } catch (error) {
        console.error("Erro ao criar venda:", error.response ? error.response.data : error.message);
        throw error;
    }

//AtualizarProduto


};