/**
 * Dashboard para gerenciamento de estoque de produtos.
 * Permite verificar o estoque, sugerir transferências e registrar compras.
 */
import { useEffect, useState, useRef } from "react";
import useProdutosStore from "../state/ProdutoStore";
import useVerificaEstoque from "../Gerenciador/VerificaEstoque";
import useRegistraTransferencia from "../Gerenciador/RegistraTransferencia";
import useRegistraCompra from "../Gerenciador/RegistraCompra";
import theme from "../assets/palette";
import useSnackbar from "../assets/alert";
import {
  Button,
  Table,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { Typography } from "@mui/material";

const columns = [
  { id: "nomeProduto", label: "Nome", minWidth: 150 },
  { id: "nomeLoja", label: "Loja", minWidth: 50 },
  { id: "quantidade", label: "Quantidade", minWidth: 70, align: "right" },
  { id: "estoqueMin", label: "Estoque Mínimo", minWidth: 70, align: "right" },
  { id: "sugestao", label: "Sugestão", minWidth: 150 },
  { id: "acoes", label: "Ações", minWidth: 150, align: "center" },
];

/**
 * Componente principal do Dashboard.
 * @component
 */
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

  const [openCompraModal, setOpenCompraModal] = useState(false);
  const [openTransferModal, setOpenTransferModal] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [quantidadeTransferencia, setQuantidadeTransferencia] = useState(0);
  const [quantidadeCompra, setQuantidadeCompra] = useState(0);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const gerarSugestao = () => {
    const currentProdutos = useProdutosStore.getState().produtos;
    const produtosBaixos = currentProdutos.filter(
      (produto) => produto.quantidade <= produto.estoqueMin
    );
    setBaixo(produtosBaixos);
    const newSugestoesMap = verificaEstoque(produtosBaixos);
    setSugestoesMap(newSugestoesMap);
    showSnackbar("Estoque verificado", "success");
  };

  useEffect(() => {
    const initialize = async () => {
      await fetchProdutos();
      gerarSugestao();
    };
    initialize();
  }, []);

  const handleTransferencia = (produto) => {
    setProdutoSelecionado(produto);
    const sugestao = sugestoesMap.get(produto.nomeProduto);
    setQuantidadeTransferencia(
      sugestao
        ? Math.round((sugestao.quantidade - sugestao.estoqueMin) * 0.3)
        : 0
    );
    setOpenTransferModal(true);
  };

  const confirmarTransferencia = async () => {
    const sugestao = sugestoesMap.get(produtoSelecionado.nomeProduto);
    if (sugestao && quantidadeTransferencia > 0) {
      const quantidadeMaximaPermitida =
        sugestao.quantidade - sugestao.estoqueMin;

      if (quantidadeTransferencia <= quantidadeMaximaPermitida) {
        await registraTransferencia(produtoSelecionado, {
          ...sugestao,
          quantidadeTransferencia,
        });
        showSnackbar("Transferência registrada com sucesso!", "success");
        gerarSugestao();
      } else {
        showSnackbar(
          `Quantidade excede o limite máximo permitido de ${quantidadeMaximaPermitida} unidades.`,
          "warning"
        );
      }
    } else {
      showSnackbar(
        "Nenhuma sugestão disponível ou quantidade inválida.",
        "warning"
      );
    }
    setOpenTransferModal(false);
  };

  const handleCompra = (produto) => {
    setProdutoSelecionado(produto);
    setQuantidadeCompra(produto.estoqueMin * 2);
    setOpenCompraModal(true);
  };

  const confirmarCompra = async () => {
    try {
      const comprado = await registraCompra(
        produtoSelecionado,
        quantidadeCompra
      );
      if (comprado) {
        showSnackbar("Compra registrada com sucesso!", "success");
      } else {
        showSnackbar("Fornecedor não encontrado para este produto", "error");
      }
    } catch (error) {
      console.log(error);
      showSnackbar("Erro inesperado ao registrar a compra", "error");
    }
    setOpenCompraModal(false);
  };

  const gerarSugestaoRef = useRef(() => {});
  useEffect(() => {
    gerarSugestaoRef.current = gerarSugestao;
  }, [gerarSugestao]);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3000/api/notify");

    eventSource.addEventListener("change", async (event) => {
      try {
        const payload = JSON.parse(event.data);
        await fetchProdutos();
        gerarSugestaoRef.current();
      } catch (err) {
        console.error("Erro ao processar evento SSE:", err);
      }
    });

    eventSource.onerror = (error) => {
      console.error("Erro na conexão SSE:", error);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          padding: "16px",
        }}
      >
        <Button
          variant="contained"
          onClick={gerarSugestao}
          style={{
            color: theme.palette.custom.skyBlue,
            backgroundColor: theme.palette.custom.teal,
          }}
        >
          Verificar Estoque Baixo
        </Button>
      </div>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="Tabela de Estoque">
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
                  const sugestao = sugestoesMap.get(produto.nomeProduto);
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={produto._id}
                    >
                      <TableCell>{produto.nomeProduto}</TableCell>
                      <TableCell>{produto.nomeLoja}</TableCell>
                      <TableCell align="right">{produto.quantidade}</TableCell>
                      <TableCell align="right">{produto.estoqueMin}</TableCell>
                      <TableCell>
                        {sugestao
                          ? `Transferir de ${sugestao.nomeLoja} ${Math.round((sugestao.quantidade - sugestao.estoqueMin) * 0.3)} unidades`
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

      <Dialog open={openCompraModal} onClose={() => setOpenCompraModal(false)}>
        <DialogTitle>Definir Quantidade de Compra</DialogTitle>
        <DialogContent>
          {produtoSelecionado && (
            <Typography variant="subtitle1" gutterBottom>
              Quantidade Sugerida: {produtoSelecionado.estoqueMin * 2}
            </Typography>
          )}
          <TextField
            autoFocus
            margin="dense"
            label="Quantidade"
            type="number"
            fullWidth
            variant="outlined"
            value={quantidadeCompra}
            onChange={(e) => setQuantidadeCompra(Number(e.target.value))}
            inputProps={{ min: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCompraModal(false)}>Cancelar</Button>
          <Button variant="contained" onClick={confirmarCompra} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openTransferModal}
        onClose={() => setOpenTransferModal(false)}
      >
        <DialogTitle>Definir Quantidade de Transferência</DialogTitle>
        <DialogContent>
          {produtoSelecionado && (
            <Typography variant="subtitle1" gutterBottom>
              Quantidade Sugerida:{" "}
              {Math.round(
                (sugestoesMap.get(produtoSelecionado.nomeProduto)?.quantidade -
                  sugestoesMap.get(produtoSelecionado.nomeProduto)
                    ?.estoqueMin) *
                  0.3
              ) || 0}
            </Typography>
          )}
          <TextField
            autoFocus
            margin="dense"
            label="Quantidade"
            type="number"
            fullWidth
            variant="outlined"
            value={quantidadeTransferencia}
            onChange={(e) => setQuantidadeTransferencia(Number(e.target.value))}
            inputProps={{ min: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTransferModal(false)}>Cancelar</Button>
          <Button
            variant="contained"
            onClick={confirmarTransferencia}
            color="primary"
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      <SnackbarComponent />
    </div>
  );
}

export default Dashboard;
