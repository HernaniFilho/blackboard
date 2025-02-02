import { useEffect } from "react";
import useProdutosStore from "../state/ProdutoStore";
import useTransferenciasStore from "../state/TransferenciaStore";

function useRegistraTransferencia() {
  const { addTransferencia } = useTransferenciasStore();
  const { updateProduto } = useProdutosStore();

  const registraTransferencia = (recebido, transferido) => {
    const quantidadeTransferida = Math.round(
      (transferido.quantidade - transferido.estoqueMin) * 0.3
    );
    console.log("Eai:", quantidadeTransferida);
    const transferencia = {
      lojaSaida: transferido.nomeLoja,
      lojaEntrada: recebido.nomeLoja,
      nomeProduto: recebido.nomeProduto,
      quantidade: quantidadeTransferida,
      data: new Date(),
    };

    addTransferencia(transferencia);
    recebido.quantidade += quantidadeTransferida;
    transferido.quantidade -= quantidadeTransferida;
    updateProduto(recebido, recebido._id);
    updateProduto(transferido, transferido._id);

    return transferencia;
  };

  return registraTransferencia;
}

export default useRegistraTransferencia;
