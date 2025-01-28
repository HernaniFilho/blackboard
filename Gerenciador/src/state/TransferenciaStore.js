import { create } from "zustand";
import { httpGet, httpPost, httpPut, httpDelete } from "../../app";
import { baseUrl } from "../../baseurl";

const useTransferenciasStore = create((set) => ({
  transferencias: [],
  loading: false,
  error: null,

  fetchTransferencias: async () => {
    set({ loading: true, error: null });
    console.log("Entrei aqui");
    try {
      const data = await httpGet(`${baseUrl}/api/transferencias`);
      console.log("Ola", data);
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
}));

export default useTransferenciasStore;
