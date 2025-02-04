import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TablePagination from "@mui/material/TablePagination";

/**
 * Componente de linha expansível para a tabela.
 * @param {Object} props - As propriedades do componente.
 * @param {Object} props.row - Os dados da linha.
 * @param {Array} props.columns - As colunas da tabela.
 * @returns {React.Component} O componente de linha expansível.
 */
function Row({ row, columns }) {
  const [open, setOpen] = React.useState(false);

  /**
   * Formata um valor como moeda (BRL).
   * @param {number} value - O valor a ser formatado.
   * @returns {string} O valor formatado como moeda.
   */
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        {columns
          .filter((column) => !["produtos", "_id", "__v"].includes(column.id))
          .map((column) => (
            <TableCell key={column.id} align={column.align}>
              {column.id === "data"
                ? new Date(row[column.id]).toLocaleDateString()
                : row[column.id]}
            </TableCell>
          ))}
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Detalhes do Produto
              </Typography>
              <Table size="small" aria-label="products">
                <TableHead>
                  <TableRow>
                    <TableCell>Nome do Produto</TableCell>
                    <TableCell align="right">Quantidade</TableCell>
                    {row.precoTotal != null && (
                      <TableCell align="right">Preço Total</TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{row.nomeProduto}</TableCell>
                    <TableCell align="right">{row.quantidade}</TableCell>
                    {row.precoTotal != null && (
                      <TableCell align="right">
                        {formatCurrency(row.precoTotal)}
                      </TableCell>
                    )}
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

/**
 * Componente de tabela expansível com paginação.
 * @param {Object} props - As propriedades do componente.
 * @param {Array} props.columns - As colunas da tabela.
 * @param {Array} props.rows - As linhas da tabela.
 * @returns {React.Component} O componente de tabela expansível.
 */
export default function CollapsibleTable({ columns, rows }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  /**
   * Altera a página atual da tabela.
   * @param {Object} event - O evento de mudança de página.
   * @param {number} newPage - O número da nova página.
   */
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  /**
   * Altera o número de linhas exibidas por página.
   * @param {Object} event - O evento de mudança de linhas por página.
   */
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            {columns
              .filter(
                (column) => !["produtos", "_id", "__v"].includes(column.id)
              )
              .map((column) => (
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
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <Row key={row._id} row={row} columns={columns} />
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
