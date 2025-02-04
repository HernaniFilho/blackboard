import { create } from "zustand";
import { httpGet } from "../../app";
import { baseUrl } from "../../baseurl";

/**
 * Store para gerenciar o estado das vendas.
 * Utiliza o Zustand para gerenciamento de estado.
 *
 * @typedef {Object} Venda
 * @property {string} id - ID da venda.
 * @property {string} produto - Nome do produto vendido.
 * @property {number} quantidade - Quantidade de unidades vendidas.
 * @property {number} total - Valor total da venda.
 * @property {string} data - Data da venda.
 */

const useVendasStore = create((set) => ({
  vendas: [],
  loading: false,
  error: null,

  /**
   * Função para buscar as vendas.
   * Faz uma requisição HTTP GET para obter a lista de vendas.
   * Atualiza o estado com os dados das vendas ou o erro caso ocorra.
   */
  fetchVendas: async () => {
    set({ loading: true, error: null });
    try {
      const data = await httpGet(`${baseUrl}/api/vendas`);
      set((state) => ({
        ...state,
        vendas: data,
        loading: false,
      }));
    } catch (error) {
      set((state) => ({ ...state, error, loading: false }));
    }
  },
}));

export default useVendasStore;
