import { create } from "zustand";
import { httpGet, httpPost, httpPut, httpDelete } from "../../app";
import { baseUrl } from "../../baseurl";

const useTransferenciasStore = create((set, get) => ({
  transferencias: [],
  loading: false,
  error: null,

  fetchTransferencias: async () => {
    set({ loading: true, error: null });
    console.log("Entrei aqui");
    try {
      const data = await httpGet(`${baseUrl}/api/transferencias`);
      set((state) => ({
        ...state,
        transferencias: data,
        loading: false,
      }));
    } catch (error) {
      console.log(error);
      set((state) => ({ ...state, error, loading: false }));
    }
  },

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
