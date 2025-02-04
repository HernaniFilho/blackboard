/**
 * Hook de estado para gerenciar as compras usando Zustand.
 * Fornece funções para buscar e adicionar compras, além de estados de carregamento e erro.
 */
import { create } from "zustand";
import { httpGet, httpPost } from "../../app";
import { baseUrl } from "../../baseurl";

/**
 * Hook de estado para compras.
 *
 * @returns {Object} O estado e as funções para interação com o estado de compras.
 */
const useComprasStore = create((set, get) => ({
  /**
   * Lista de compras.
   * @type {Array<Object>}
   */
  compras: [],

  /**
   * Indica se uma operação está em andamento.
   * @type {boolean}
   */
  loading: false,

  /**
   * Armazena erros ocorridos durante as operações.
   * @type {Error|null}
   */
  error: null,

  /**
   * Busca as compras do servidor.
   * Atualiza o estado com a lista de compras ou um erro, se ocorrer.
   * @async
   * @returns {Promise<void>}
   */
  fetchCompras: async () => {
    set({ loading: true, error: null });
    try {
      const data = await httpGet(`${baseUrl}/api/compras`, {
        headers: { nomeloja: "gen" },
      });
      set((state) => ({
        ...state,
        compras: data,
        loading: false,
      }));
    } catch (error) {
      set((state) => ({ ...state, error, loading: false }));
    }
  },

  /**
   * Adiciona uma nova compra no servidor e atualiza o estado.
   * Também faz uma nova requisição para buscar as compras atualizadas.
   * @async
   * @param {Object} compra - O objeto de compra a ser adicionado.
   * @returns {Promise<void>}
   */
  addCompras: async (compra) => {
    set({ loading: true, error: null });
    try {
      const newCompra = await httpPost(`${baseUrl}/api/compras`, compra);
      set((state) => ({
        compras: [...state.compras, newCompra],
        loading: false,
      }));
      get().fetchCompras();
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));

export default useComprasStore;
