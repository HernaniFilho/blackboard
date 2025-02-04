import { useEffect } from "react";
import useProdutosStore from "../state/ProdutoStore";
import useTransferenciasStore from "../state/TransferenciaStore";
/**
 * Hook personalizado para registrar transferências de produtos entre lojas.
 *
 * Este hook gerencia a lógica de cálculo da quantidade de produtos a ser transferida,
 * registra a transferência e atualiza os estoques das lojas envolvidas.
 *
 * @returns {Function} Função `registraTransferencia` para realizar a transferência de produtos.
 */
function useRegistraTransferencia() {
  const { addTransferencia } = useTransferenciasStore();
  const { updateProduto } = useProdutosStore();

  /**
   * Registra uma transferência de produtos entre lojas.
   *
   * @param {Object} recebido - O produto que será recebido pela loja de destino.
   * @param {Object} transferido - O produto que será transferido da loja de origem.
   * @returns {Object} O objeto de transferência registrado.
   */
  const registraTransferencia = (recebido, transferido) => {
    const quantidadeTransferida = Math.round(
      (transferido.quantidade - transferido.estoqueMin) * 0.3
    );
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
