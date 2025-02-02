import {create} from 'zustand'
//Não esta sendo utilizado
const useProdutoStore = create((set) =>({
    nome: "",
    preco: null,
    quantidade: null,
    estoqueMin: null,
    nomeLoja: "",
    setNome: (nome) => set({nome: nome}),
    setPreco: (preco) => set({preco: preco}),
    setQuantidade: (quantidade) => set({ quantidade: quantidade}),
    setData: (nomeLoja) => set({nomeLoja: nomeLoja})
}));

export default useProdutoStore;
//Não esta sendo utilizado