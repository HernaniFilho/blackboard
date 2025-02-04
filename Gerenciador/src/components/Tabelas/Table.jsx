import { useState } from "react";
import theme from "../../assets/palette";
import { useConfirmationDialog } from "../../assets/alertDialog";
import useSnackbar from "../../assets/alert";
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
import EditProductModal from "../../assets/modal";
import useProdutosStore from "../../state/ProdutoStore";
import useFornecedoresStore from "../../state/FornecedoresStore";

/**
 * Componente de tabela com cabeçalho fixo e funcionalidades de paginação, edição e exclusão.
 * @param {Object} props - Props do componente.
 * @param {Array} props.columns - Colunas da tabela.
 * @param {Array} props.rows - Linhas de dados da tabela.
 * @param {string} props.pageType - Tipo de página ('orders' ou 'inventory').
 * @returns {JSX.Element} Componente React para renderizar a tabela.
 */
export default function StickyHeadTable({ columns, rows, pageType }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { showSnackbar, SnackbarComponent } = useSnackbar();
  const { openConfirmationDialog, ConfirmationDialog } =
    useConfirmationDialog();
  const [openEdit, setOpenEdit] = useState(false);
  const [productData, setProductData] = useState({});
  const { deleteProduto, updateProduto } = useProdutosStore();
  const { deleteFornecedor, updateFornecedor } = useFornecedoresStore();

  /**
   * Manipula a exclusão de um item.
   * @param {string} id - ID do item a ser deletado.
   */
  const handleDelete = (id) => {
    openConfirmationDialog(() => {
      if (pageType === "orders") {
        deleteProduto(id);
        showSnackbar("Esse produto foi deletado", "warning");
      } else {
        deleteFornecedor(id);
        showSnackbar("Esse fornecedor foi deletado", "warning");
      }
    });
  };

  /**
   * Manipula a mudança de página na paginação da tabela.
   * @param {Event} event - Evento de mudança de página.
   * @param {number} newPage - Nova página selecionada.
   */
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  /**
   * Manipula a mudança de quantidade de linhas por página.
   * @param {Event} event - Evento de mudança de quantidade de linhas por página.
   */
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  /**
   * Abre o modal de edição com os dados do produto/fornecedor selecionado.
   * @param {Object} row - Dados da linha selecionada.
   */
  const handleOpenEdit = (row) => {
    setProductData(row);
    setOpenEdit(true);
  };

  /**
   * Fecha o modal de edição.
   */
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  /**
   * Salva as alterações feitas no modal de edição.
   * @param {Object} productData - Dados atualizados do produto/fornecedor.
   */
  const handleSaveEdit = (productData) => {
    if (pageType === "orders") {
      updateProduto(productData.data, productData.id);
      showSnackbar("Esse produto foi alterado", "info");
    } else if (pageType === "inventory") {
      updateFornecedor(productData.data, productData.id);
      showSnackbar("Esse fornecedor foi alterado", "info");
    }

    setOpenEdit(false);
  };

  return (
    <>
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
                <TableCell align="center" style={{ minWidth: 150 }}>
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        sx={{
                          color: theme.palette.custom.beige,
                          backgroundColor: theme.palette.custom.green,
                        }}
                        onClick={() => handleOpenEdit(row)}
                        style={{ marginRight: "8px" }}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          color: theme.palette.custom.beige,
                          backgroundColor: theme.palette.custom.red,
                        }}
                        onClick={() => handleDelete(row._id)}
                      >
                        Excluir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <ConfirmationDialog />
      <SnackbarComponent />

      <EditProductModal
        open={openEdit}
        handleClose={handleCloseEdit}
        productData={productData}
        setProductData={setProductData}
        onSubmit={handleSaveEdit}
        pageType={pageType}
      />
    </>
  );
}
