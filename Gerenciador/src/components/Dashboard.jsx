import { useEffect, useState } from "react";
import useProdutosStore from "../state/ProdutoStore";
import useTransferenciasStore from "../state/TransferenciaStore";
import useComprasStore from "../state/CompraStore";
import useFornecedoresStore from "../state/FornecedoresStore";
import useVerificaEstoque from "../Gerenciador_Strategies/VerificaEstoque";
import useRegistraTransferencia from "../Gerenciador_Strategies/RegistraTransferencia";
import theme from "../assets/palette";
import { useConfirmationDialog } from "../assets/alertDialog";
import useSnackbar from "../assets/alert";
import {
  Modal,
  Box,
  TextField,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
  Button,
  Table,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  FormControl,
} from "@mui/material";
import useRegistraCompra from "../Gerenciador_Strategies/RegistraCompra";

const columns = [
  { id: "nomeProduto", label: "Nome", minWidth: 150 },
  { id: "nomeLoja", label: "Loja", minWidth: 50 },
  { id: "quantidade", label: "Quantidade", minWidth: 70, align: "right" },
  { id: "estoqueMin", label: "Estoque Mínimo", minWidth: 70, align: "right" },
  { id: "sugestao", label: "Sugestão", minWidth: 150 },
  { id: "acoes", label: "Ações", minWidth: 150, align: "center" },
];

function Dashboard() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { produtos, fetchProdutos } = useProdutosStore();
  const verificaEstoque = useVerificaEstoque();
  const registraTransferencia = useRegistraTransferencia();
  const registraCompra = useRegistraCompra();
  const [sugestoesMap, setSugestoesMap] = useState(new Map());
  const { showSnackbar, SnackbarComponent } = useSnackbar();
  const [baixo, setBaixo] = useState([]);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const gerarSugestao = () => {
    const produtosBaixos = produtos.filter(
      (produto) => produto.quantidade <= produto.estoqueMin
    );
    setBaixo(produtosBaixos);

    const newSugestoesMap = verificaEstoque(produtosBaixos);
    console.log(newSugestoesMap);
    setSugestoesMap(newSugestoesMap);
    showSnackbar("Estoque verificado", "success");
  };

  useEffect(() => {
    fetchProdutos();
  }, [fetchProdutos]);

  const handleTransferencia = async (produto) => {
    const sugestao = sugestoesMap.get(produto.nomeProduto);
    console.log("handleTransferencia:", produto);
    console.log("handleTransferencia:", sugestao);
    if (sugestao) {
      registraTransferencia(produto, sugestao);
      showSnackbar("Transferência registrada com sucesso!", "success");
    } else {
      showSnackbar(
        "Nenhuma sugestão disponível para transferência.",
        "warning"
      );
    }
    await delay(1000);
    gerarSugestao();
  };

  const handleCompra = async (produto) => {
    try {
      const comprado = await registraCompra(produto, produto.estoqueMin * 2);
      console.log(comprado);

      if (comprado) {
        showSnackbar("Compra registrada com sucesso!", "success");
      } else {
        showSnackbar("Fornecedor não encontrado para este produto", "error");
      }
    } catch (error) {
      console.error("Erro ao registrar a compra:", error);
      showSnackbar("Erro inesperado ao registrar a compra", "error");
    }
    await delay(1000);
    gerarSugestao();
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          padding: "16px",
        }}
      >
        <Button variant="contained" onClick={gerarSugestao}>
          Verificar Estoque Baixo
        </Button>
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {baixo
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((produto) => {
                  const sugestao = sugestoesMap
                    ? sugestoesMap.get(produto.nomeProduto)
                    : null;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={produto.nomeProduto}
                    >
                      <TableCell>{produto.nomeProduto}</TableCell>
                      <TableCell>{produto.nomeLoja}</TableCell>
                      <TableCell align="right">{produto.quantidade}</TableCell>
                      <TableCell align="right">{produto.estoqueMin}</TableCell>
                      <TableCell>
                        {sugestao
                          ? `Transferir de ${sugestao.nomeLoja} (${sugestao.quantidade} disponíveis)`
                          : "Sem sugestão"}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleTransferencia(produto)}
                          disabled={!sugestao}
                          sx={{ marginRight: 1 }}
                        >
                          Transferir
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleCompra(produto)}
                        >
                          Comprar
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={baixo.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <SnackbarComponent />
    </div>
  );
}

export default Dashboard;
