import { create } from "zustand";
import { httpGet, httpPost, httpPut, httpDelete } from "../../app";
import { baseUrl } from "../../baseurl";

const useProdutosStore = create((set, get) => ({
  produtos: [],
  loading: false,
  error: null,

  fetchProdutos: async () => {
    set({ loading: true, error: null });
    try {
      const data = await httpGet(`${baseUrl}/api/produtos`, {
        headers: { nomeloja: "z" },
      });

      set((state) => ({
        ...state,
        produtos: data,
        loading: false,
      }));
    } catch (error) {
      set((state) => ({ ...state, error, loading: false }));
    }
  },

  addProduto: async (produto) => {
    set({ loading: true, error: null });
    try {
      const newProduto = await httpPost(`${baseUrl}/api/produtos`, produto, {
        headers: { nomeloja: "gen" },
      });
      set((state) => ({
        produtos: [...state.produtos, newProduto],
        loading: false,
      }));
      get().fetchProdutos();
    } catch (error) {
      set({ error, loading: false });
    }
  },

  updateProduto: async (updatedData, id) => {
    set({ loading: true, error: null });
    try {
      const { __v, _id, ...dataToSend } = updatedData;
      const updatedProduto = await httpPut(
        `${baseUrl}/api/produtos/${id}`,
        dataToSend,
        { headers: { nomeloja: "gen" } }
      );
      set((state) => ({
        produtos: state.produtos.map((produto) =>
          produto.id === id ? updatedProduto : produto
        ),
        loading: false,
      }));
      get().fetchProdutos();
    } catch (error) {
      set({ error, loading: false });
    }
  },

  deleteProduto: async (id) => {
    set({ loading: true, error: null });
    try {
      await httpDelete(`${baseUrl}/api/produtos/${id}`, {
        headers: { nomeloja: "gen" },
      });
      set((state) => ({
        produtos: state.produtos.filter((produto) => produto.id !== id),
        loading: false,
      }));
      get().fetchProdutos();
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));

export default useProdutosStore;
