import { useState } from "react";

const columns = [
  { id: "nome", label: "Nome", minWidth: 170 },
  { id: "nomeLoja", label: "Nome Loja", minWidth: 100 },
  {
    id: "preco",
    label: "Preço",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("pt-BR"),
  },
  {
    id: "quantidade",
    label: "Quantidade",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("pt-BR"),
  },
  {
    id: "estoqueMin",
    label: "Estoque Mínimo",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function Produto() {
  return (
    <>
      <div></div>
    </>
  );
}

export default Produto;
