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
        headers: { nomeloja: "Loja A" },
      });

      set((state) => ({
        ...state,
        produtos: data,
        loading: false,
      }));
    } catch (error) {
      console.log("Erro:" + error);
      set((state) => ({ ...state, error, loading: false }));
    }
  },

  addProduto: async (produto) => {
    set({ loading: true, error: null });
    try {
      const newProduto = await httpPost(`${baseUrl}/api/produtos`, produto);
      set((state) => ({
        produtos: [...state.produtos, newProduto],
        loading: false,
      }));
      console.log(newProduto);
      get().fetchProdutos();
    } catch (error) {
      console.log("Error: ", error);
      set({ error, loading: false });
    }
  },

  updateProduto: async (updatedData, id) => {
    set({ loading: true, error: null });
    try {
      console.log("data", id);
      const { __v, _id, ...dataToSend } = updatedData;
      console.log("Data to send:", dataToSend.data);
      const updatedProduto = await httpPut(
        `${baseUrl}/api/produtos/${id}`,
        dataToSend.data
      );
      set((state) => ({
        produtos: state.produtos.map((produto) =>
          produto.id === id ? updatedProduto : produto
        ),
        loading: false,
      }));
      console.log("UpdatedProduto: ", updatedProduto);
      get().fetchProdutos();
    } catch (error) {
      console.log("Erro", error);
      set({ error, loading: false });
    }
  },

  deleteProduto: async (id) => {
    set({ loading: true, error: null });
    try {
      console.log(id);
      await httpDelete(`${baseUrl}/api/produtos/${id}`);
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
