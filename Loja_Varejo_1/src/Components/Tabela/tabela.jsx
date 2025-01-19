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
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(produto, estoque, qtd,) {
  return { produto, estoque, qtd};
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
  return (
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
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.produto}
              </StyledTableCell>
              <StyledTableCell align="right">{row.estoque}</StyledTableCell>
              <StyledTableCell align="right"><SelectQTD /></StyledTableCell>
              <StyledTableCell align="right"><Button variant="contained" endIcon={<SendIcon />}>Registrar Venda</Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
