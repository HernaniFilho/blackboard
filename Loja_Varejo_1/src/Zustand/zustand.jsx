import {create} from 'zustand'

const useVendaStore = create((set) =>({
    nomeLoja: "Loja A",
    nomeProduto: null,
    quantidade: null,
    data: null,
    precoTotal: null,
    produtoPosVenda: null,
    setNomeProduto: (nomeProduto) => set({nomeProduto: nomeProduto}),
    setQuantidade: (quantidade) => set({ quantidade: quantidade}),
    setData: (data) => set({data: data}),
    setPrecoTotal: (precoTotal) => set({precoTotal: precoTotal}),
    setProdutoPosVenda: (produtoPosVenda) => set({produtoPosVenda : produtoPosVenda}) 
}));

export default useVendaStore;