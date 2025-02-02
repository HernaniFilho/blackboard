import { useEffect } from "react";
import useProdutosStore from "../state/ProdutoStore";
import useComprasStore from "../state/CompraStore";
import useFornecedoresStore from "../state/FornecedoresStore";

function useRegistraCompra() {
  const { addCompras } = useComprasStore();
  const { fornecedores, fetchFornecedores } = useFornecedoresStore();
  const { updateProduto } = useProdutosStore();

  const registraCompra = async (produto, quantidade) => {
    // Garantir que os fornecedores estejam atualizados
    await fetchFornecedores();

    const fornecedor = fornecedores.find(
      (fornecedor) => fornecedor.nomeProduto === produto.nomeProduto
    );

    if (fornecedor) {
      const compra = {
        nomeFornecedor: fornecedor.nomeFornecedor,
        nomeLoja: produto.nomeLoja,
        nomeProduto: produto.nomeProduto,
        quantidade: quantidade,
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
      console.warn(
        "Fornecedor não encontrado para o produto:",
        produto.nomeProduto
      );
      return null;
    }
  };

  return registraCompra;
}

export default useRegistraCompra;
