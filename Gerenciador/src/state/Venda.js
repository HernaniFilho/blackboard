import { create } from "zustand";
import { httpGet } from "../../app";
import { baseUrl } from "../../baseurl";

const useVendasStore = create((set) => ({
  vendas: [],
  loading: false,
  error: null,

  fetchVendas: async () => {
    set({ loading: true, error: null });
    console.log("Entrei aqui");
    try {
      const data = await httpGet(`${baseUrl}/api/vendas`);
      console.log("Ola", data);
      set((state) => ({
        ...state,
        vendas: data,
        loading: false,
      }));
    } catch (error) {
      console.log(error);
      set((state) => ({ ...state, error, loading: false }));
    }
  },
}));

export default useVendasStore;
