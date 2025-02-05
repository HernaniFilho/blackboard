import { useEffect } from "react";
import useProdutosStore from "../state/ProdutoStore";
import useComprasStore from "../state/CompraStore";
import useFornecedoresStore from "../state/FornecedoresStore";
/**
 * Hook personalizado para registrar compras, atualizar o estoque de produtos
 * e associar a compra ao fornecedor correspondente.
 *
 * @returns {Function} registraCompra - Função para registrar uma nova compra.
 */
function useRegistraCompra() {
  const { addCompras } = useComprasStore();
  const { fornecedores, fetchFornecedores } = useFornecedoresStore();
  const { updateProduto } = useProdutosStore();

  /**
   * Registra uma nova compra, atualiza o estoque do produto e armazena a compra.
   *
   * @async
   * @param {Object} produto - O produto que está sendo comprado.
   * @param {string} produto.nomeProduto - Nome do produto.
   * @param {string} produto.nomeLoja - Nome da loja associada ao produto.
   * @param {number} produto.quantidade - Quantidade atual do produto em estoque.
   * @param {string} produto._id - ID do produto para atualização.
   * @param {number} quantidade - Quantidade do produto a ser comprada.
   * @returns {Object|null} Retorna o objeto da compra registrada ou null se o fornecedor não for encontrado.
   */
  const registraCompra = async (produto, quantidade) => {
    await fetchFornecedores();

    // Otimização: cria um Map para busca rápida
    const fornecedoresMap = new Map(
      fornecedores.map((fornecedor) => [fornecedor.nomeProduto, fornecedor])
    );

    const fornecedor = fornecedoresMap.get(produto.nomeProduto);

    if (fornecedor) {
      const compra = {
        nomeFornecedor: fornecedor.nomeFornecedor,
        nomeLoja: produto.nomeLoja,
        nomeProduto: produto.nomeProduto,
        quantidade,
        precoTotal: fornecedor.preco * quantidade,
        data: new Date(),
      };

      addCompras(compra);

      const produtoAtualizado = {
        ...produto,
        quantidade: produto.quantidade + quantidade,
      };
      updateProduto(produtoAtualizado, produto._id);

      return compra;
    } else {
      return null;
    }
  };

  return registraCompra;
}

export default useRegistraCompra;
