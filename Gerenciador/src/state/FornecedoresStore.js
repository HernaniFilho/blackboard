import { create } from "zustand";
import { httpGet, httpPost, httpPut, httpDelete } from "../../app";
import { baseUrl } from "../../baseurl";

const useFornecedoresStore = create((set, get) => ({
  fornecedores: [],
  loading: false,
  error: null,

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
      console.log("Erro:" + error);
      set((state) => ({ ...state, error, loading: false }));
    }
  },

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
      console.log("Error: ", error);
      set({ error, loading: false });
    }
  },

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
