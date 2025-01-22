import CollapsibleTable from "./Tabelas/CollapsibleTable";

const columns = [
  { id: "nome", label: "Nome do Fornecedor", minWidth: 220 },
  { id: "produto", label: "Produto", minWidth: 220 },
  {
    id: "preco",
    label: "Preço do Pedido",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("pt-BR"),
  },
];

const rows = [
  {
    id: 1,
    nome: "SapatosDemais",
    produto: [
      { nome: "Sapatilha", nomeLoja: "Loja B", preco: 23.99, quantidade: 5 },
    ],
    preco: 119.95,
  },
];

function Fornecedores() {
  return (
    <div>
      <CollapsibleTable columns={columns} rows={rows} />
    </div>
  );
}

export default Fornecedores;
