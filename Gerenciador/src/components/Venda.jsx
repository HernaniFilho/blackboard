import CollapsibleTable from "./Tabelas/CollapsibleTable";
import useVendasStore from "../state/Venda";
import React, { useEffect } from "react";

const columns = [
  { id: "nomeLoja", label: "Nome da Loja", minWidth: 220 },
  { id: "nomeProduto", label: "Produto", minWidth: 100 },
  { id: "data", label: "Data", minWidth: 220 },
];

function Venda() {
  const { vendas, fetchVendas } = useVendasStore();
  useEffect(() => {
    fetchVendas();
  }, [fetchVendas]);
  return (
    <div>
      <CollapsibleTable columns={columns} rows={vendas} />
    </div>
  );
}

export default Venda;
