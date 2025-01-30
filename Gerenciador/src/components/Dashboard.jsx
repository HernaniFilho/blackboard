import { useState, useEffect } from "react";
import useProdutosStore from "../state/ProdutoStore";
import useTransferenciasStore from "../state/TransferenciaStore";
import useComprasStore from "../state/CompraStore";
import useFornecedoresStore from "../state/FornecedoresStore";

function Dashboard() {
  const { produtos, fetchProdutos, addProduto } = useProdutosStore();
  const { fetchTransferencias, addTransferencia } = useTransferenciasStore();
  const { fornecedores, fetchFornecedores } = useFornecedoresStore();
  const { addCompra } = useComprasStore();

  useEffect(() => {
    fetchProdutos();

    for (const produto of produtos) {
      if (produto.quantidade <= produto.estoqueMin) {
        //verificar a outra loja
        // se não fazer compra
      }
    }
  }, []);
  return (
    <>
      <div></div>
    </>
  );
}

export default Dashboard;
