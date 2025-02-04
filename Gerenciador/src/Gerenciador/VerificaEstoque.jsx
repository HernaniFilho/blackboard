import useProdutosStore from "../state/ProdutoStore";
import { useEffect } from "react";
/**
 * Hook personalizado para verificar o estoque de produtos e sugerir transferências entre lojas.
 *
 * @returns {Function} Função `verificaEstoque` que recebe uma lista de produtos com estoque baixo
 * e retorna um `Map` com sugestões de produtos de outras lojas com estoque suficiente.
 */
function useVerificaEstoque() {
  const { produtos, fetchProdutos } = useProdutosStore();

  // Busca a lista de produtos ao montar o componente
  useEffect(() => {
    fetchProdutos();
  }, [fetchProdutos]);

  /**
   * Verifica o estoque de produtos e sugere transferências.
   *
   * @param {Array<Object>} produtosBaixos - Lista de produtos com estoque baixo.
   * @param {string} produtosBaixos[].nomeProduto - Nome do produto.
   * @param {string} produtosBaixos[].nomeLoja - Nome da loja do produto com estoque baixo.
   * @param {number} produtosBaixos[].quantidade - Quantidade atual do produto.
   * @param {number} produtosBaixos[].estoqueMin - Estoque mínimo recomendado para o produto.
   *
   * @returns {Map<string, Object|null>} Mapa contendo o nome do produto como chave e a sugestão de produto de outra loja como valor,
   * ou `null` se não houver sugestão disponível.
   */
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
