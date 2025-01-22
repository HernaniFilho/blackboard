import CollapsibleTable from "./Tabelas/CollapsibleTable";

const columns = [
  { id: "nomeLoja", label: "Nome da Loja", minWidth: 220 },
  { id: "produto", label: "Produto", minWidth: 100 },
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

function Transferencia() {
  return (
    <div>
      <CollapsibleTable columns={columns} rows={rows} />
    </div>
  );
}

export default Transferencia;
