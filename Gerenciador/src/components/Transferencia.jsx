import CollapsibleTable from "./Tabelas/CollapsibleTable";
import useTransferenciasStore from "../state/TransferenciaStore";
import React, { useEffect } from "react";

/**
 * Definição das colunas da tabela de transferências.
 * @constant {Array<Object>}
 */
const columns = [
  { id: "lojaSaida", label: "Loja Saída", minWidth: 170 },
  { id: "lojaEntrada", label: "Loja Entrada", minWidth: 170 },
  { id: "nomeProduto", label: "Produto", minWidth: 100 },
  { id: "data", label: "Data", minWidth: 100 },
];

/**
 * Componente para exibição de transferências entre lojas.
 * Este componente exibe uma tabela de transferências, utilizando o componente `CollapsibleTable`.
 * @component
 */
function Transferencia() {
  const { transferencias, fetchTransferencias } = useTransferenciasStore();

  /**
   * Busca as transferências ao carregar o componente.
   */
  useEffect(() => {
    fetchTransferencias();
  }, [fetchTransferencias]);

  return (
    <div>
      {/* Tabela de transferências */}
      <CollapsibleTable columns={columns} rows={transferencias} />
    </div>
  );
}

export default Transferencia;
