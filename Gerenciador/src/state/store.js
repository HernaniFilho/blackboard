import { create } from "zustand";

/**
 * Store para gerenciar a escolha do usuário.
 * Utiliza o Zustand para gerenciamento de estado.
 *
 * @typedef {Object} StoreState
 * @property {number} escolha - Valor que representa a escolha do usuário.
 * @property {Function} setEscolha - Função para atualizar o valor de escolha.
 */

const useStore = create((set) => ({
  escolha: 0,

  /**
   * Função para atualizar a escolha do usuário.
   *
   * @param {number} mudaEscolha - Novo valor para a escolha do usuário.
   */
  setEscolha: (mudaEscolha) => set({ escolha: mudaEscolha }),
}));

export default useStore;
