import { create } from "zustand";
import { httpGet, httpPost } from "../../app";
import { baseUrl } from "../../baseurl";

const useComprasStore = create((set, get) => ({
  compras: [],
  loading: false,
  error: null,

  fetchCompras: async () => {
    set({ loading: true, error: null });
    try {
      const data = await httpGet(`${baseUrl}/api/compras`, {
        headers: { nomeloja: "LojaC2" },
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
