import CollapsibleTable from "./Tabelas/CollapsibleTable";
import useTransferenciasStore from "../state/TransferenciaStore";
import React, { useEffect } from "react";

const columns = [
  { id: "lojaSaida", label: "Loja Saida", minWidth: 170 },
  { id: "lojaEntrada", label: "Loja Entrada", minWidth: 170 },
  { id: "nomeProduto", label: "Produto", minWidth: 100 },
  { id: "data", label: "Data", minWidth: 100 },
];

function Transferencia() {
  const { transferencias, fetchTransferencias } = useTransferenciasStore();
  useEffect(() => {
    fetchTransferencias();
  }, [fetchTransferencias]);
  return (
    <div>
      <CollapsibleTable columns={columns} rows={transferencias} />
    </div>
  );
}

export default Transferencia;
