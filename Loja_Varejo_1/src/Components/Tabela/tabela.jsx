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

function createData(produto, estoque, qtd) {
  return { produto, estoque, qtd };
}

const rows = [
  createData('Product A', 159, 4.0),
  createData('Product B', 237, 4.3),
  createData('Product C', 262, 6.0),
  createData('Product D', 305, 4.3),
  createData('Product E', 356, 3.9),
  createData('Product F', 366, 5.7),
];

export default function TableProducts() {
  const [quantities, setQuantities] = React.useState({});
  const [openModal, setOpenModal] = React.useState(false); // Estado para controlar o modal
  const setNomeProduto = useVendaStore((state) => state.setNomeProduto);
  const setQuantidade = useVendaStore((state) => state.setQuantidade);
  
  const handleChangeQuantity = (produto, quantidade) => {
    setQuantities((prev) => ({
      ...prev,
      [produto]: quantidade,
    }));
  };

  const handleRegistrarVenda = (produto) => {
    const quantidade = quantities[produto] || 0;
    setNomeProduto(produto);
    setQuantidade(quantidade);
    const estadoAtual = useVendaStore.getState();
    setOpenModal(true);
    console.log(`Produto: ${produto}, Quantidade: ${quantidade}`);
    console.log("Estado atual do Zustand:", estadoAtual); 
    // Aqui você pode realizar outras ações, como enviar os dados para uma API
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Produtos</StyledTableCell>
              <StyledTableCell align="right">Estoque</StyledTableCell>
              <StyledTableCell align="right">Qtd para venda</StyledTableCell>
              <StyledTableCell align="right"> </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.produto}>
                <StyledTableCell component="th" scope="row">
                  {row.produto}
                </StyledTableCell>
                <StyledTableCell align="right">{row.estoque}</StyledTableCell>
                <StyledTableCell align="right">
                  <SelectQTD
                    onChangeQuantity={(quantidade) =>
                      handleChangeQuantity(row.produto, quantidade)
                    }
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={() => handleRegistrarVenda(row.produto)}
                  >
                    Registrar Venda
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Passa o estado openModal e o método handleCloseModal para o componente ConfirmarVenda */}
      <ConfirmarVenda open={openModal} handleClose={() => setOpenModal(false)} />
    </>
  );
}
