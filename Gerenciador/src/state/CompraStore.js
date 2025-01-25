import { create } from "zustand";
import axios from "axios";


const useComprasStore = create((set) => ({
  compras: [],
  loading: false,
  error: null,

  fetchCompras: async () => {
    set({ loading: true, error: null });

    try {
      const response = await axios.get("");
      set({ compras: response.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));

export default useComprasStore;
