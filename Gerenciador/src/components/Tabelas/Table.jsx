import { useState } from "react";
import theme from "../../assets/palette";
import { useConfirmationDialog } from "../../assets/alertDialog";
import useSnackbar from "../../assets/alert";
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
import EditProductModal from "../../assets/modal";
import useProdutosStore from "../../state/ProdutoStore";
import useFornecedoresStore from "../../state/FornecedoresStore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: "600px",
  height: "45%",
  bgcolor: theme.palette.custom.skyBlue,
  border: "2px solid #C8D9E6",
  borderRadius: "16px",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 2,
};

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

  const handleDelete = (id) => {
    console.log(id);
    openConfirmationDialog(() => {
      if (pageType === "orders") {
        deleteProduto(id);
      } else {
        deleteFornecedor(id);
      }
      showSnackbar("Esse dado foi deletado", "warning");
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenEdit = (row) => {
    console.log("Editing product:", row);
    setProductData(row);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleSaveEdit = (productData) => {
    console.log("Updated Data:", productData.id);
    if (pageType === "orders") {
      updateProduto(productData, productData.id);
      showSnackbar("Esse produto foi alterado", "info");
    } else if (pageType === "inventory") {
      updateFornecedor(productData, productData._id);
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
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
