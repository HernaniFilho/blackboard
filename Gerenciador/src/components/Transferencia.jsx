import CollapsibleTable from "./Tabelas/CollapsibleTable";

const columns = [
  { id: "lojaSaida", label: "Loja Saida", minWidth: 170 },
  { id: "lojaEntrada", label: "Loja Entrada", minWidth: 170 },
  { id: "produto", label: "Produto", minWidth: 100 },
  { id: "data", label: "Data", minWidth: 100 },
];

const rows = [
  {
    id: 1,
    lojaSaida: "loja b",
    lojaEntrada: "loja a",
    nomeLoja: "B",
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
