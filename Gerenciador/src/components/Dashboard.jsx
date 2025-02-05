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

  const [openModal, setOpenModal] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [quantidade, setQuantidade] = useState(0);

  /**
   * Função auxiliar para criar um atraso.
   * @param {number} ms - Tempo em milissegundos.
   * @returns {Promise<void>}
   */
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  /**
   * Manipula a mudança de página na tabela.
   * @param {object} event - Evento de mudança.
   * @param {number} newPage - Nova página selecionada.
   */
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  /**
   * Manipula a alteração da quantidade de linhas por página.
   * @param {object} event - Evento de alteração.
   */
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  /**
   * Gera sugestões de transferência de estoque para produtos com estoque baixo.
   * Chama a função VerificaEstoque que retorna um Map com os produtos abaixo
   *  e possíveis sugestões de transferência para poduto,
   * assim como a quantidade a ser transferida
   *
   */
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

  /**
   * Registra a transferência de produtos entre lojas.
   * @param {Object} produto - Produto a ser transferido.
   */
  const handleTransferencia = async (produto) => {
    const sugestao = sugestoesMap.get(produto.nomeProduto);
    if (sugestao) {
      registraTransferencia(produto, sugestao);
      showSnackbar("Transferência registrada com sucesso!", "success");
    } else {
      showSnackbar(
        "Nenhuma sugestão disponível para transferência.",
        "warning"
      );
    }
    await delay(500);
    gerarSugestao();
  };

  /**
   * Abre o modal para definir a quantidade de compra de um produto.
   * @param {Object} produto - Produto selecionado para compra.
   */
  const handleCompra = (produto) => {
    setProdutoSelecionado(produto);
    setQuantidade(produto.estoqueMin * 2); // Sugestão padrão
    setOpenModal(true);
  };

  /**
   * Confirma a compra do produto selecionado.
   */
  const confirmarCompra = async () => {
    try {
      const comprado = await registraCompra(produtoSelecionado, quantidade);
      if (comprado) {
        showSnackbar("Compra registrada com sucesso!", "success");
      } else {
        showSnackbar("Fornecedor não encontrado para este produto", "error");
      }
    } catch (error) {
      showSnackbar("Erro inesperado ao registrar a compra", "error");
    }
    setOpenModal(false);
    await delay(500);
    gerarSugestao();
  };

  /**
   * Garante que a variável utilizada por gerarSugestão é a mais atualizada
   */
  const gerarSugestaoRef = useRef(() => {});
  useEffect(() => {
    gerarSugestaoRef.current = gerarSugestao;
  }, [gerarSugestao]);

  /**
   * Configura a conexão com o servidor para receber notificações em tempo real (SSE).
   * É o método subscriber do padrão Observer
   */
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
                      key={produto.nomeProduto}
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

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Definir Quantidade de Compra</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Quantidade"
            type="number"
            fullWidth
            variant="outlined"
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
            inputProps={{ min: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancelar</Button>
          <Button variant="contained" onClick={confirmarCompra} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      <SnackbarComponent />
    </div>
  );
}

export default Dashboard;
