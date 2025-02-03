import StickyHeadTable from "./Tabelas/Table";
import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import theme from "../assets/palette";
import FormControl from "@mui/material/FormControl";
import {
  Modal,
  Box,
  TextField,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Button,
  Fab,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useFornecedoresStore from "../state/FornecedoresStore";
import ErrorBoundary from "../ErrorBoundary";

const columns = [
  { id: "nomeFornecedor", label: "Nome do Fornecedor", minWidth: 80 },
  { id: "nomeProduto", label: "Produto", minWidth: 80 },
  {
    id: "preco",
    label: "Preço do Produto",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("pt-BR"),
  },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: "600px",
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

// Definição do esquema de validação com Yup
const schema = yup.object().shape({
  nomeFornecedor: yup.string().required("O nome do fornecedor é obrigatório"),
  nomeProduto: yup.string().required("O nome do produto é obrigatório"),
  preco: yup
    .number()
    .typeError("O preço deve ser um número")
    .positive("O preço deve ser positivo")
    .required("O preço é obrigatório"),
});

function Fornecedores() {
  const { fornecedores, fetchFornecedores, addFornecedor } =
    useFornecedoresStore();

  const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nomeFornecedor: "",
      nomeProduto: "",
      preco: "",
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = (data) => {
    addFornecedor(data);
    handleClose();
  };

  useEffect(() => {
    fetchFornecedores();
  }, []);

  return (
    <>
      <div>
        <ErrorBoundary>
          <StickyHeadTable
            columns={columns}
            rows={fornecedores}
            pageType="inventory"
          />
        </ErrorBoundary>
      </div>
      <div style={{ padding: "16px" }}>
        <Fab
          sx={{
            color: theme.palette.custom.navy,
            "&:hover": { backgroundColor: theme.palette.custom.teal },
          }}
          aria-label="add"
          onClick={handleOpen}
        >
          <AddIcon />
        </Fab>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
      >
        <Box sx={style}>
          <h2
            id="child-modal-title"
            style={{ textAlign: "center", marginBottom: "16px" }}
          >
            Adicionar novo Fornecedor
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ width: "100%" }}
            noValidate
          >
            <Controller
              name="nomeFornecedor"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Nome do Fornecedor"
                  variant="outlined"
                  error={!!errors.nomeFornecedor}
                  helperText={errors.nomeFornecedor?.message}
                  sx={{ mt: 2 }}
                />
              )}
            />
            <Controller
              name="nomeProduto"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Nome do Produto"
                  variant="outlined"
                  error={!!errors.nomeProduto}
                  helperText={errors.nomeProduto?.message}
                  sx={{ mt: 2 }}
                />
              )}
            />
            <Box sx={{ display: "flex", gap: 3, width: "100%", mt: 2 }}>
              <Controller
                name="preco"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Preço</InputLabel>
                    <OutlinedInput
                      {...field}
                      startAdornment={
                        <InputAdornment position="start">R$</InputAdornment>
                      }
                      label="Preço"
                      error={!!errors.preco}
                    />
                    <span style={{ color: "red", fontSize: "12px" }}>
                      {errors.preco?.message}
                    </span>
                  </FormControl>
                )}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                mt: 3,
              }}
            >
              <Button
                sx={{ color: theme.palette.custom.navy }}
                onClick={handleClose}
              >
                Fechar
              </Button>
              <Button sx={{ color: theme.palette.custom.green }} type="submit">
                Adicionar
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default Fornecedores;
