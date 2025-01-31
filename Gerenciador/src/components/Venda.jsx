import CollapsibleTable from "./Tabelas/CollapsibleTable";
import useVendasStore from "../state/Venda";
import React, { useEffect } from "react";

const columns = [
  { id: "nomeLoja", label: "Nome da Loja", minWidth: 220 },
  { id: "nomeProduto", label: "Produto", minWidth: 100 },
  { id: "data", label: "Data", minWidth: 220 },
];

const rows = [
  {
    id: 1,
    nomeLoja: "Loja A",
    produto: [
      { nome: "Sapatilha", nomeLoja: "Loja B", preco: 23.99, quantidade: 5 },
    ],
    data: "19/05/2003",
  },
];

function Venda() {
  const { vendas, loading, error, fetchVendas } = useVendasStore();
  useEffect(() => {
    fetchVendas();
    console.log(vendas);
  }, [fetchVendas]);
  return (
    <div>
      <CollapsibleTable columns={columns} rows={vendas} />
    </div>
  );
}

export default Venda;
