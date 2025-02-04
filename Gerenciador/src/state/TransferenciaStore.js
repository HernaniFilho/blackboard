import { create } from "zustand";
import { httpGet, httpPost, httpPut, httpDelete } from "../../app";
import { baseUrl } from "../../baseurl";

/**
 * Store para gerenciar o estado das transferências.
 * Utiliza o Zustand para gerenciamento de estado.
 *
 * @typedef {Object} Transferencia
 * @property {string} id - ID da transferência.
 * @property {string} origem - Local de origem da transferência.
 * @property {string} destino - Local de destino da transferência.
 * @property {number} valor - Valor da transferência.
 * @property {string} data - Data da transferência.
 */

const useTransferenciasStore = create((set, get) => ({
  transferencias: [],
  loading: false,
  error: null,

  /**
   * Função para buscar as transferências.
   * Faz uma requisição HTTP GET para obter a lista de transferências.
   * Atualiza o estado com os dados das transferências ou o erro caso ocorra.
   */
  fetchTransferencias: async () => {
    set({ loading: true, error: null });
    try {
      const data = await httpGet(`${baseUrl}/api/transferencias`);
      set((state) => ({
        ...state,
        transferencias: data,
        loading: false,
      }));
    } catch (error) {
      set((state) => ({ ...state, error, loading: false }));
    }
  },

  /**
   * Função para adicionar uma nova transferência.
   * Faz uma requisição HTTP POST para adicionar uma transferência.
   * Atualiza o estado com a nova transferência adicionada.
   *
   * @param {Transferencia} Transferencia - Objeto contendo os dados da transferência a ser adicionada.
   */
  addTransferencia: async (Transferencia) => {
    set({ loading: true, error: null });
    try {
      const newTransferencia = await httpPost(
        `${baseUrl}/api/transferencias`,
        Transferencia
      );
      set((state) => ({
        transferencias: [...state.transferencias, newTransferencia],
        loading: false,
      }));
      get().fetchTransferencias();
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));

export default useTransferenciasStore;
