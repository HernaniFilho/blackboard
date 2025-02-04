import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SelectQTD from '../QTDButton/QTDButton';
import useVendaStore from '../../Zustand/zustand';
import ConfirmarVenda from '../ConfirmarVenda/confirmarVenda';
import { httpGet } from '../../../app';
import Snackbar from '@mui/material/Snackbar';

const StyledTableCell2 = styled(TableCell)(({ theme }) => ({
  '&.low-stock': {
    color: 'red'
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14, 
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


/**
 * Componente `TableProducts` que exibe uma tabela de produtos disponíveis para venda.
 * 
 * Este componente inclui informações sobre cada produto, como nome, estoque, preço e permite
 * que o usuário selecione a quantidade desejada para a venda. Ao selecionar a quantidade, o
 * botão de "Registrar Venda" fica disponível para confirmar a venda e registrar a transação.
 * 
 * @returns {JSX.Element} - A tabela de produtos com a funcionalidade de registrar vendas.
 */
export default function TableProducts() {

  const [quantities, setQuantities] = React.useState({}); // Armazena as quantidades selecionadas por produto.
  const [openModal, setOpenModal] = React.useState(false); // Estado para controlar a abertura do modal de confirmação.
  const setNomeProduto = useVendaStore((state) => state.setNomeProduto); // Atribui o nome do produto na loja.
  const setQuantidade = useVendaStore((state) => state.setQuantidade); // Atribui a quantidade de produtos.
  const setProdutoPosVenda = useVendaStore((state) => state.setProdutoPosVenda); // Armazena o produto a ser vendido.
  const setPrecoTotal = useVendaStore((state) => state.setPrecoTotal); // Armazena o preço total da venda.
  const clearStore = useVendaStore((state) => state.setClearVendaStore); // Limpa o estado do Zustand após a venda.
  const [snackbarOpen, setSnackbarOpen] = React.useState(false); // Controle do estado do Snackbar de erro.
  const [snackbarMessage, setSnackbarMessage] = React.useState(""); // Armazena a mensagem do Snackbar.
  const flagCounter = useVendaStore((state) => state.flagCounter); // Flag para controle de alterações de produto.

  /**
 * Efeito colateral que lida com a conexão SSE (Server-Sent Events) para receber notificações em tempo real.
 * O evento SSE é usado para monitorar mudanças no servidor e atualizar o estado local.
 * 
 * - Quando a conexão é estabelecida, uma mensagem de log é exibida.
 * - Ao receber uma mensagem (onmessage), o payload é analisado e o estado `flagCounter` é atualizado no store.
 * - Quando o evento `change` é recebido, a mesma lógica é executada para atualizar o `flagCounter`.
 * - Em caso de erro ao processar a mensagem, uma mensagem de erro é registrada no console.
 * 
 * @effect
 */
React.useEffect(() => {
  // Cria a conexão SSE somente quando o componente é montado.
  const eventSource = new EventSource('http://localhost:3000/api/notify');

  /**
   * Callback executado quando a conexão SSE é estabelecida com sucesso.
   * Exibe uma mensagem no console de log.
   *
   * @param {Event} e - O evento que contém informações sobre a conexão.
   */
  eventSource.onopen = (e) => {
    console.log("SSE connection established:", e);
  };

  /**
   * Callback executado quando uma mensagem é recebida do servidor via SSE.
   * A mensagem é analisada e o estado `flagCounter` do store é atualizado.
   *
   * @param {MessageEvent} event - O evento que contém os dados da mensagem recebida.
   */
  eventSource.onmessage = (event) => {
    console.log("onmessage event received:", event);
    try {
      const payload = JSON.parse(event.data);
      console.log("Parsed payload (onmessage):", payload);
      useVendaStore.getState().setFlagCounter();
      console.log("flagCounter after onmessage:", useVendaStore.getState().flagCounter);
    } catch (err) {
      console.error("Error parsing onmessage event.data:", err);
    }
  };

  /**
   * Callback executado quando um evento 'change' é recebido do servidor via SSE.
   * A lógica de atualização do estado `flagCounter` é a mesma que o evento onmessage.
   *
   * @param {MessageEvent} event - O evento que contém os dados da mensagem recebida.
   */
  eventSource.addEventListener('change', (event) => {
    console.log("Evento SSE 'change' received:", event);
    try {
      const payload = JSON.parse(event.data);
      console.log("Parsed payload in 'change':", payload);
      useVendaStore.getState().setFlagCounter();
      console.log("flagCounter after 'change':", useVendaStore.getState().flagCounter);
    } catch (err) {
      console.error("Error parsing event.data in 'change':", err);
    }
  });

  /**
   * Callback executado em caso de erro na conexão SSE.
   * Exibe uma mensagem de erro no console.
   *
   * @param {Event} error - O evento de erro que contém detalhes sobre a falha.
   */
  eventSource.onerror = (error) => {
    console.error('SSE error:', error);
  };

  // Fecha a conexão SSE quando o componente for desmontado.
  return () => {
    eventSource.close();
  };
}, []);

  const [produtos, setProdutos] = React.useState([]); // Armazena a lista de produtos.

  /**
   * Função para atualizar a quantidade selecionada para um produto específico.
   * 
   * @param {string} produtoId - O ID do produto.
   * @param {number} quantidade - A quantidade selecionada.
   */
  const handleChangeQuantity = (produtoId, quantidade) => {
    setQuantities((prev) => ({
      ...prev,
      [produtoId]: quantidade,
    }));
  };

  /**
   * Função chamada para registrar a venda de um produto. Se a quantidade não for selecionada,
   * exibe uma mensagem de erro usando o Snackbar.
   * 
   * @param {Object} produto - O produto a ser vendido.
   */
  const handleRegistrarVenda = (produto) => {
    const quantidade = quantities[produto._id] || 0;

    if (quantidade === 0 || quantidade === "") {
      setSnackbarMessage("Por favor, selecione a quantidade antes de registrar a venda.");
      setSnackbarOpen(true);
      return;
    }
    setNomeProduto(produto.nomeProduto);
    setQuantidade(quantidade);
    setPrecoTotal(produto.preco * quantidade);
    const produtoAtualizado = { ...produto };
    produtoAtualizado.quantidade -= quantidade;
    setProdutoPosVenda(produtoAtualizado);
    setOpenModal(true);
  };

  /**
   * Função que busca os produtos da API e atualiza o estado com a lista de produtos.
   */
  async function fetchProdutos() {
    try {
      const response = await httpGet(
        'http://localhost:3000/api/produtos',
        {
          headers:
            { 
              nomeLoja: 'Loja B' 
            }
        }
      ); 
      setProdutos(response); 
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setProdutos([]); 
    }
  }

  // Efeito para buscar os produtos e limpar os estados sempre que o `flagCounter` for alterado.
  React.useEffect(() => {
    if (openModal) {
      setOpenModal(false);
      setSnackbarMessage("Um produto sofreu alteração. Por favor, tente novamente.");
      setSnackbarOpen(true);
      clearStore();
    }
    setQuantities((prev) => {
      const updatedQuantities = { ...prev };
      produtos.forEach((produto) => {
        updatedQuantities[produto._id] = 0;
      });
      return updatedQuantities;
    });
    fetchProdutos();
  }, [flagCounter]);

  return (
    <>
      <TableContainer component={Paper} sx={{ margin: '0 16 16px', borderRadius: '10px' }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Produtos</StyledTableCell>
              <StyledTableCell align="right">Estoque / Estoque Min.</StyledTableCell>
              <StyledTableCell align="right">Preço unitário</StyledTableCell>
              <StyledTableCell align="right">Qtd para venda</StyledTableCell>
              <StyledTableCell align="right"> </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produtos.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell component="th" scope="row">
                  {row.nomeProduto}
                </StyledTableCell>
                <StyledTableCell2 align="right" className={row.quantidade < row.estoqueMin ? 'low-stock' : ''}>
                {row.quantidade} / {row.estoqueMin}
              </StyledTableCell2>
                <StyledTableCell align="right">
                  {row.preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <SelectQTD
                    value={quantities[row._id] || 0}
                    onChangeQuantity={(quantidade) => handleChangeQuantity(row._id, quantidade) }
                    maxQuantidade= {row.quantidade}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    sx={{ backgroundColor: 'red' }}
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={() => handleRegistrarVenda(row)}
                  >
                    Registrar Venda
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmarVenda open={openModal} handleClose={() => setOpenModal(false)}/>
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={3000}
      onClose={() => setSnackbarOpen(false)}
      message= {snackbarMessage}
    />
  </>
);
}
