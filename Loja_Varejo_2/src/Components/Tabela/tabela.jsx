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

export default function TableProducts() {

  const [quantities, setQuantities] = React.useState({});
  const [openModal, setOpenModal] = React.useState(false); // Estado para controlar o modal
  const setNomeProduto = useVendaStore((state) => state.setNomeProduto);
  const setQuantidade = useVendaStore((state) => state.setQuantidade);
  const setProdutoPosVenda = useVendaStore((state) => state.setProdutoPosVenda);
  const setPrecoTotal = useVendaStore((state) => state.setPrecoTotal);
  const clearStore = useVendaStore((state) => state.setClearVendaStore);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const flagCounter = useVendaStore((state) => state.flagCounter);

  React.useEffect(() => {
    // Cria a conexão SSE somente quando o componente é montado.
    const eventSource = new EventSource('http://localhost:3000/api/notify');

    eventSource.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        useVendaStore.getState().setFlagCounter();
      } catch (err) {
        console.error("Error parsing onmessage event.data:", err);
      }
    };

    eventSource.addEventListener('change', (event) => {
      try {
        const payload = JSON.parse(event.data);
        useVendaStore.getState().setFlagCounter();
      } catch (err) {
        console.error("Error parsing event.data in 'change':", err);
      }
    });

    eventSource.onerror = (error) => {
      console.error('SSE error:', error);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const [produtos, setProdutos] = React.useState([]);
  
  const handleChangeQuantity = (produtoId, quantidade) => {
    setQuantities((prev) => ({
      ...prev,
      [produtoId]: quantidade,
    }));
  };

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