import CollapsibleTable from "./Tabelas/CollapsibleTable";
import useTransferenciasStore from "../state/TransferenciaStore";
import React, { useEffect } from "react";

const columns = [
  { id: "lojaSaida", label: "Loja Saida", minWidth: 170 },
  { id: "lojaEntrada", label: "Loja Entrada", minWidth: 170 },
  { id: "nomeProduto", label: "Produto", minWidth: 100 },
  { id: "data", label: "Data", minWidth: 100 },
];

const rows = [
  {
    id: 1,
    lojaSaida: "loja b",
    lojaEntrada: "loja a",
    nomeLoja: "B",
    produto: [
      { nome: "Sapatilha", nomeLoja: "Loja B", preco: 23.99, quantidade: 5 },
    ],
    data: "19/05/2003",
  },
];

function Transferencia() {
  const { transferencias, loading, error, fetchTransferencias } =
    useTransferenciasStore();
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
