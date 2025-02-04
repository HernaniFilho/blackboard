/**
 * Componente Venda responsável por exibir uma tabela de vendas utilizando o CollapsibleTable.
 * Realiza a busca das vendas ao ser montado.
 *
 * @module Venda
 */

import CollapsibleTable from "./Tabelas/CollapsibleTable";
import useVendasStore from "../state/Venda";
import React, { useEffect } from "react";

/**
 * Definição das colunas da tabela de vendas.
 * @constant {Array<Object>} columns - Array de objetos que define o nome, o rótulo e a largura mínima de cada coluna.
 */
const columns = [
  { id: "nomeLoja", label: "Nome da Loja", minWidth: 220 },
  { id: "nomeProduto", label: "Produto", minWidth: 100 },
  { id: "data", label: "Data", minWidth: 220 },
];

/**
 * Componente funcional responsável por exibir a lista de vendas.
 * Utiliza o hook personalizado `useVendasStore` para buscar e armazenar as vendas.
 *
 * @function Venda
 * @returns {JSX.Element} O componente de tabela com as vendas.
 */
function Venda() {
  const { vendas, fetchVendas } = useVendasStore();

  useEffect(() => {
    fetchVendas(); // Busca as vendas quando o componente é montado
  }, [fetchVendas]);

  return (
    <div>
      <CollapsibleTable columns={columns} rows={vendas} />
    </div>
  );
}

export default Venda;
