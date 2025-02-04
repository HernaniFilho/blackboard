import {create} from 'zustand';

/**
 * Store global para gerenciar o estado da venda na aplicação utilizando Zustand.
 * 
 * Esta store é responsável por armazenar e atualizar informações relacionadas à venda,
 * como o nome do produto, quantidade, preço total, e a data da venda.
 * Além disso, ela mantém um contador de mudanças (flagCounter) e permite limpar os dados
 * da venda após a conclusão do processo.
 * 
 * @typedef {Object} VendaStore
 * @property {string} nomeLoja - Nome da loja (fixo como "Loja A").
 * @property {string|null} nomeProduto - Nome do produto a ser vendido.
 * @property {number|null} quantidade - Quantidade de unidades do produto.
 * @property {Date|null} data - Data da venda.
 * @property {number|null} precoTotal - Preço total da venda.
 * @property {Object|null} produtoPosVenda - Detalhes do produto após a venda.
 * @property {number} flagCounter - Contador utilizado para marcar alterações no estado da venda.
 * @property {Function} setNomeProduto - Função para definir o nome do produto.
 * @property {Function} setQuantidade - Função para definir a quantidade de produto a ser vendida.
 * @property {Function} setData - Função para definir a data da venda.
 * @property {Function} setPrecoTotal - Função para definir o preço total da venda.
 * @property {Function} setProdutoPosVenda - Função para definir o produto após a venda.
 * @property {Function} setFlagCounter - Função para incrementar o contador de alterações.
 * @property {Function} setClearVendaStore - Função para limpar todos os dados da venda.
 */

/**
 * Criação de um store Zustand para gerenciar o estado da venda.
 * 
 * @returns {VendaStore} O estado e as funções para manipulação de dados relacionados à venda.
 */
const useVendaStore = create((set, get) => ({
    nomeLoja: "Loja A",
    nomeProduto: null,
    quantidade: null,
    data: null,
    precoTotal: null,
    produtoPosVenda: null,
    flagCounter: 0,
    
    /**
     * Atualiza o nome do produto a ser vendido.
     * 
     * @param {string} nomeProduto - Nome do produto a ser definido.
     */
    setNomeProduto: (nomeProduto) => set({nomeProduto: nomeProduto}),
    
    /**
     * Atualiza a quantidade de produto a ser vendido.
     * 
     * @param {number} quantidade - Quantidade de unidades do produto.
     */
    setQuantidade: (quantidade) => set({ quantidade: quantidade}),
    
    /**
     * Atualiza a data da venda.
     * 
     * @param {Date} data - Data da venda.
     */
    setData: (data) => set({data: data}),
    
    /**
     * Atualiza o preço total da venda.
     * 
     * @param {number} precoTotal - Preço total da venda.
     */
    setPrecoTotal: (precoTotal) => set({precoTotal: precoTotal}),
    
    /**
     * Atualiza os detalhes do produto após a venda.
     * 
     * @param {Object} produtoPosVenda - Detalhes do produto após a venda.
     */
    setProdutoPosVenda: (produtoPosVenda) => set({produtoPosVenda : produtoPosVenda}),
    
    /**
     * Incrementa o contador de alterações no estado.
     */
    setFlagCounter: () => set({ flagCounter: get().flagCounter + 1 }),
    
    /**
     * Limpa todos os dados relacionados à venda no store.
     */
    setClearVendaStore: () => set({
        nomeProduto: null,
        quantidade: null,
        data: null,
        precoTotal: null,
        produtoPosVenda: null
    })
}));

export default useVendaStore;
