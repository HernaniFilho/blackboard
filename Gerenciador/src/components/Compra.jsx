import CollapsibleTable from "./Tabelas/CollapsibleTable";
import useComprasStore from "../state/CompraStore";
import React, { useEffect } from "react";

const columns = [
  { id: "nomeFornecedor", label: "Nome do Fornecedor", minWidth: 170 },
  { id: "nomeLoja", label: "Nome da Loja", minWidth: 170 },
  { id: "nomeProduto", label: "Produto", minWidth: 100 },
  { id: "data", label: "Data", minWidth: 100 },
];

function Compra() {
  const { compras, loading, error, fetchCompras } = useComprasStore();
  useEffect(() => {
    fetchCompras();
  }, [fetchCompras]);

  return (
    <div>
      <CollapsibleTable columns={columns} rows={compras} />
    </div>
  );
}

export default Compra;
