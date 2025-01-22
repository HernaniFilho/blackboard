import CollapsibleTable from "./Tabelas/CollapsibleTable";

const columns = [
  { id: "nome", label: "Nome do Fornecedor", minWidth: 170 },
  { id: "nomeLoja", label: "Nome da Loja", minWidth: 170 },
  { id: "produto", label: "Produto", minWidth: 100 },
  { id: "data", label: "Data", minWidth: 100 },
];

const rows = [
  {
    id: 1,
    nome: "SapatosDemais",
    nomeLoja: "B",
    produto: [
      { nome: "Sapatilha", nomeLoja: "Loja B", preco: 23.99, quantidade: 5 },
    ],
    data: "19/05/2003",
  },
];

function Compra() {
  return (
    <div>
      <CollapsibleTable columns={columns} rows={rows} />
    </div>
  );
}

export default Compra;
