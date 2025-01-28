import { create } from "zustand";
import { httpGet, httpPost, httpPut, httpDelete } from "../../app";
import { baseUrl } from "../../baseurl";

const useFornecedoresStore = create((set) => ({
  fornecedores: [],
  loading: false,
  error: null,

  fetchFornecedores: async () => {
    set({ loading: true, error: null });
    try {
      const data = await httpGet(`${baseUrl}/api/fornecedores`, {
        headers: { nomeloja: "LojaC2" },
      });
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
    } catch (error) {
      console.log("Error: ", error);
      set({ error, loading: false });
    }
  },

  updateFornecedor: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      const updatedFornecedores = await httpPut(
        `${baseUrl}/api/fornecedores/${id}`,
        updatedData
      );
      set((state) => ({
        Fornecedores: state.Fornecedores.map((fornecedores) =>
          fornecedores.id === id ? updatedFornecedores : fornecedores
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error, loading: false });
    }
  },

  deleteFornecedores: async (id) => {
    set({ loading: true, error: null });
    try {
      await httpDelete(`${baseUrl}/api/Fornecedores`);
      set((state) => ({
        Fornecedores: state.Fornecedores.filter(
          (compra) => fornecedores.id !== id
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));

export default useFornecedoresStore;
