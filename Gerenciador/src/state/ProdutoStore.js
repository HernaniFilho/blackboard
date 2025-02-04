import { create } from "zustand";
import { httpGet, httpPost, httpPut, httpDelete } from "../../app";
import { baseUrl } from "../../baseurl";

/**
 * Store para gerenciar o estado dos produtos.
 * Utiliza o Zustand para gerenciamento de estado.
 *
 * @typedef {Object} Produto
 * @property {string} id - ID do produto.
 * @property {string} nome - Nome do produto.
 * @property {number} preco - Preço do produto.
 * @property {string} descricao - Descrição do produto.
 */

const useProdutosStore = create((set, get) => ({
  produtos: [],
  loading: false,
  error: null,

  /**
   * Função para buscar os produtos.
   * Faz uma requisição HTTP GET para obter a lista de produtos.
   * Atualiza o estado com os dados dos produtos ou o erro caso ocorra.
   */
  fetchProdutos: async () => {
    set({ loading: true, error: null });
    try {
      const data = await httpGet(`${baseUrl}/api/produtos`, {
        headers: { nomeloja: "z" },
      });

      set((state) => ({
        ...state,
        produtos: data,
        loading: false,
      }));
    } catch (error) {
      set((state) => ({ ...state, error, loading: false }));
    }
  },

  /**
   * Função para adicionar um novo produto.
   * Faz uma requisição HTTP POST para adicionar um produto.
   * Atualiza o estado com o novo produto adicionado.
   *
   * @param {Produto} produto - Objeto contendo os dados do produto a ser adicionado.
   */
  addProduto: async (produto) => {
    set({ loading: true, error: null });
    try {
      const newProduto = await httpPost(`${baseUrl}/api/produtos`, produto, {
        headers: { nomeloja: "gen" },
      });
      set((state) => ({
        produtos: [...state.produtos, newProduto],
        loading: false,
      }));
      get().fetchProdutos();
    } catch (error) {
      set({ error, loading: false });
    }
  },

  /**
   * Função para atualizar os dados de um produto existente.
   * Faz uma requisição HTTP PUT para atualizar o produto.
   * Atualiza o estado após a modificação.
   *
   * @param {Object} updatedData - Dados atualizados do produto.
   * @param {string} id - ID do produto a ser atualizado.
   */
  updateProduto: async (updatedData, id) => {
    set({ loading: true, error: null });
    try {
      const { __v, _id, ...dataToSend } = updatedData;
      const updatedProduto = await httpPut(
        `${baseUrl}/api/produtos/${id}`,
        dataToSend,
        { headers: { nomeloja: "gen" } }
      );
      set((state) => ({
        produtos: state.produtos.map((produto) =>
          produto.id === id ? updatedProduto : produto
        ),
        loading: false,
      }));
      get().fetchProdutos();
    } catch (error) {
      set({ error, loading: false });
    }
  },

  /**
   * Função para deletar um produto.
   * Faz uma requisição HTTP DELETE para remover um produto.
   * Atualiza o estado após a remoção.
   *
   * @param {string} id - ID do produto a ser deletado.
   */
  deleteProduto: async (id) => {
    set({ loading: true, error: null });
    try {
      await httpDelete(`${baseUrl}/api/produtos/${id}`, {
        headers: { nomeloja: "gen" },
      });
      set((state) => ({
        produtos: state.produtos.filter((produto) => produto.id !== id),
        loading: false,
      }));
      get().fetchProdutos();
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));

export default useProdutosStore;
