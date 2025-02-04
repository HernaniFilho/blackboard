import CollapsibleTable from "./Tabelas/CollapsibleTable";
import useComprasStore from "../state/CompraStore";
import React, { useEffect } from "react";

/**
 * Definição das colunas da tabela de compras.
 * É utilizado para a delimitação do nome e largura das colunas das tabelas
 * @type {Array<{id: string, label: string, minWidth: number}>}
 */
const columns = [
  { id: "nomeFornecedor", label: "Nome do Fornecedor", minWidth: 170 },
  { id: "nomeLoja", label: "Nome da Loja", minWidth: 170 },
  { id: "nomeProduto", label: "Produto", minWidth: 100 },
  { id: "data", label: "Data", minWidth: 100 },
];

/**
 * Componente responsável por exibir a lista de compras.
 * Ele busca os dados de compras ao ser montado e renderiza uma tabela colapsável.
 *
 * @returns {JSX.Element} Componente React para a visualização de compras.
 */
function Compra() {
  const { compras, fetchCompras } = useComprasStore();

  /**
   * Efeito para buscar as compras assim que o componente for montado.
   */
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
