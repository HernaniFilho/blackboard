import {create} from 'zustand'

const useVendaStore = create((set) =>({
    nomeLoja: "Loja 1",
    nomeProduto: null,
    quantidade: null,
    data: null,
    setNomeProduto: (nomeProduto) => set({nomeProduto: nomeProduto}),
    setQuantidade: (quantidade) => set({ quantidade: quantidade}),
    setData: (data) => set({data: data}) 
}));

export default useVendaStore;