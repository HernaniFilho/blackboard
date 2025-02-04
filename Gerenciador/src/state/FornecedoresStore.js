import { create } from "zustand";
import { httpGet, httpPost, httpPut, httpDelete } from "../../app";
import { baseUrl } from "../../baseurl";

/**
 * Store para gerenciar o estado dos fornecedores.
 * Utiliza o Zustand para gerenciamento de estado.
 *
 * @typedef {Object} Fornecedor
 * @property {string} id - ID do fornecedor.
 * @property {string} nome - Nome do fornecedor.
 * @property {string} contato - Informações de contato do fornecedor.
 */

const useFornecedoresStore = create((set, get) => ({
  fornecedores: [],
  loading: false,
  error: null,

  /**
   * Função para buscar os fornecedores.
   * Faz uma requisição HTTP GET para obter a lista de fornecedores.
   * Atualiza o estado com os dados dos fornecedores ou o erro caso ocorra.
   */
  fetchFornecedores: async () => {
    set({ loading: true, error: null });
    try {
      const data = await httpGet(`${baseUrl}/api/fornecedores`);
      set((state) => ({
        ...state,
        fornecedores: data,
        loading: false,
      }));
    } catch (error) {
      set((state) => ({ ...state, error, loading: false }));
    }
  },

  /**
   * Função para adicionar um novo fornecedor.
   * Faz uma requisição HTTP POST para adicionar um fornecedor.
   * Atualiza o estado com o novo fornecedor adicionado.
   *
   * @param {Fornecedor} Fornecedor - Objeto contendo os dados do fornecedor a ser adicionado.
   */
  addFornecedor: async (Fornecedor) => {
    set({ loading: true, error: null });

    try {
      console.log("Entrei");
      const newFornecedor = await httpPost(
        `${baseUrl}/api/fornecedores`,
        Fornecedor
      );
      console.log("Ola ", newFornecedor);
      set((state) => ({
        compras: [...state.fornecedores, newFornecedor],
        loading: false,
      }));
      get().fetchFornecedores();
    } catch (error) {
      set({ error, loading: false });
    }
  },

  /**
   * Função para atualizar os dados de um fornecedor existente.
   * Faz uma requisição HTTP PUT para atualizar o fornecedor.
   * Atualiza o estado após a modificação.
   *
   * @param {Object} updatedData - Dados atualizados do fornecedor.
   * @param {string} id - ID do fornecedor a ser atualizado.
   */
  updateFornecedor: async (updatedData, id) => {
    set({ loading: true, error: null });
    console.log(updatedData);
    try {
      const updatedFornecedores = await httpPut(
        `${baseUrl}/api/fornecedores/${id}`,
        updatedData
      );
      set(() => ({
        loading: false,
      }));
      get().fetchFornecedores();
    } catch (error) {
      set({ error, loading: false });
    }
  },

  /**
   * Função para deletar um fornecedor.
   * Faz uma requisição HTTP DELETE para remover um fornecedor.
   * Atualiza o estado após a remoção.
   *
   * @param {string} id - ID do fornecedor a ser deletado.
   */
  deleteFornecedor: async (id) => {
    set({ loading: true, error: null });
    try {
      await httpDelete(`${baseUrl}/api/fornecedores/${id}`);
      set((state) => ({
        loading: false,
      }));
      get().fetchFornecedores();
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));

export default useFornecedoresStore;
