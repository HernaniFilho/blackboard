import { useState } from "react";
import StickyHeadTable from "./Tabelas/Table";

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
    format: (value) => value.toFixed(0),
  },
];

const rows = [
  {
    id: 1,
    nome: "Product A",
    nomeLoja: "B",
    preco: 25.99,
    quantidade: 190,
    estoqueMin: 70,
  },
  {
    id: 2,
    nome: "Product B",
    nomeLoja: "B",
    preco: 25.99,
    quantidade: 190,
    estoqueMin: 70,
  },
  {
    id: 3,
    nome: "Product C",
    nomeLoja: "A",
    preco: 25.99,
    quantidade: 190,
    estoqueMin: 70,
  },
  {
    id: 4,
    nome: "Product C",
    nomeLoja: "A",
    preco: 25.99,
    quantidade: 190,
    estoqueMin: 70,
  },
  {
    id: 5,
    nome: "Product C",
    nomeLoja: "A",
    preco: 25.99,
    quantidade: 190,
    estoqueMin: 70,
  },
  {
    id: 6,
    nome: "Product C",
    nomeLoja: "A",
    preco: 25.99,
    quantidade: 190,
    estoqueMin: 70,
  },
];

function Produto() {
  return (
    <>
      <div>
        <StickyHeadTable columns={columns} rows={rows}></StickyHeadTable>
      </div>
    </>
  );
}

export default Produto;
