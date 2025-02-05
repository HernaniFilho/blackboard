import { useEffect, useState, useRef } from "react";
import useProdutosStore from "../state/ProdutoStore";
import useVerificaEstoque from "../Gerenciador/VerificaEstoque";
import useRegistraTransferencia from "../Gerenciador/RegistraTransferencia";
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
} from "@mui/material";
import useRegistraCompra from "../Gerenciador/RegistraCompra";

/**
 * @type {Array<{id: string, label: string, minWidth: number, align: "right" | "center" | "left" | undefined}>}
 */

const columns = [
  { id: "nomeProduto", label: "Nome", minWidth: 150 },
  { id: "nomeLoja", label: "Loja", minWidth: 50 },
  { id: "quantidade", label: "Quantidade", minWidth: 70, align: "right" },
  { id: "estoqueMin", label: "Estoque Mínimo", minWidth: 70, align: "right" },
  { id: "sugestao", label: "Sugestão", minWidth: 150 },
  { id: "acoes", label: "Ações", minWidth: 150, align: "center" },
];

/**
 * Componente responsável por exibir o dashboard de gerenciamento de estoque.
 * Ele permite verificar o estoque de produtos, sugerir transferências e registrar compras.
 *
 * @returns {JSX.Element} O componente do dashboard.
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

  /**
   * Função para simular um atraso na execução.
   * @param {number} ms - O tempo em milissegundos para o atraso.
   * @returns {Promise<void>} Uma promessa que resolve após o atraso.
   */
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  /**
   * Atualiza a página da tabela.
   * @param {React.MouseEvent<HTMLButtonElement>} event - Evento de clique.
   * @param {number} newPage - Nova página selecionada.
   */
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  /**
   * Atualiza o número de linhas exibidas por página na tabela.
   * @param {React.ChangeEvent<HTMLInputElement>} event - Evento de mudança do seletor.
   */
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  /**
   * Gera sugestões de transferência de estoque com base nos produtos abaixo do estoque mínimo.
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

  const gerarSugestaoRef = useRef(() => {});
  useEffect(() => {
    gerarSugestaoRef.current = gerarSugestao;
  }, [gerarSugestao]);

  /**
   * Configura a conexão com o servidor para receber notificações em tempo real (SSE).
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

  /**
   * Registra a transferência de estoque para o produto selecionado.
   * @param {Object} produto - O produto para o qual a transferência será registrada.
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
   * Registra uma nova compra para o produto selecionado.
   * @param {Object} produto - O produto para o qual a compra será registrada.
   */
  const handleCompra = async (produto) => {
    try {
      const comprado = await registraCompra(produto, produto.estoqueMin * 2);
      if (comprado) {
        showSnackbar("Compra registrada com sucesso!", "success");
      } else {
        showSnackbar("Fornecedor não encontrado para este produto", "error");
      }
    } catch (error) {
      showSnackbar("Erro inesperado ao registrar a compra", "error");
    }
    await delay(500);
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

      <SnackbarComponent />
    </div>
  );
}

export default Dashboard;
