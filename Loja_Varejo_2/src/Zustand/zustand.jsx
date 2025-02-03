import {create} from 'zustand'

const useVendaStore = create((set,get) =>({
    nomeLoja: "Loja A",
    nomeProduto: null,
    quantidade: null,
    data: null,
    precoTotal: null,
    produtoPosVenda: null,
    flagCounter: 0,
    setNomeProduto: (nomeProduto) => set({nomeProduto: nomeProduto}),
    setQuantidade: (quantidade) => set({ quantidade: quantidade}),
    setData: (data) => set({data: data}),
    setPrecoTotal: (precoTotal) => set({precoTotal: precoTotal}),
    setProdutoPosVenda: (produtoPosVenda) => set({produtoPosVenda : produtoPosVenda}),
    setFlagCounter: () => set({ flagCounter: get().flagCounter + 1 }),
    setClearVendaStore: () => set({
        nomeProduto: null,
        quantidade: null,
        data: null,
        precoTotal: null,
        produtoPosVenda: null
      })
}));

export default useVendaStore;