import { useEffect } from "react";
import useProdutosStore from "../state/ProdutoStore";

function useVerificaEstoque() {
  const { produtos, fetchProdutos } = useProdutosStore();

  // Fetch produtos on mount
  useEffect(() => {
    fetchProdutos();
  }, [fetchProdutos]);

  const verificaEstoque = (produtosBaixos) => {
    const sugestoesMap = new Map();

    produtosBaixos.forEach((produtoBaixo) => {
      const sugestao = produtos.find(
        (produto) =>
          produto.nomeProduto === produtoBaixo.nomeProduto &&
          produto.nomeLoja !== produtoBaixo.nomeLoja &&
          produto.quantidade > produto.estoqueMin * 1.5
      );

      sugestoesMap.set(produtoBaixo.nomeProduto, sugestao || null);
    });

    return sugestoesMap;
  };

  return verificaEstoque;
}

export default useVerificaEstoque;
