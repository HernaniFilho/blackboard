import StickyHeadTable from "./Tabelas/Table";
import React, { useState } from "react";
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

const columns = [
  { id: "nome", label: "Nome do Fornecedor", minWidth: 80 },
  { id: "nomeProduto", label: "Produto", minWidth: 80 },
  {
    id: "preco",
    label: "Preço do Produto",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("pt-BR"),
  },
  {
    id: "quantidade",
    label: "Quantidade",
    minWidth: 80,
    align: "right",
    format: (value) => value.toLocaleString("pt-BR"),
  },
  {
    id: "estoqueMin",
    label: "Estoque Mínimo",
    minWidth: 80,
    align: "right",
    format: (value) => value.toFixed(0),
  },
];

const rows = [
  {
    id: 1,
    nome: "SapatosDemais",
    nomeProduto: "Sapatilha",
    preco: 119.95,
    quantidade: 190,
    estoqueMin: 70,
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
  quantidade: yup
    .number()
    .typeError("A quantidade deve ser um número")
    .positive("A quantidade deve ser maior que zero")
    .integer("A quantidade deve ser um número inteiro")
    .required("A quantidade é obrigatória"),
  estoqueMin: yup
    .number()
    .typeError("O estoque mínimo deve ser um número")
    .positive("O estoque mínimo deve ser positivo")
    .integer("O estoque mínimo deve ser um número inteiro")
    .required("O estoque mínimo é obrigatório"),
});

function Fornecedores() {
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
      quantidade: "",
      estoqueMin: "",
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = (data) => {
    console.log("Fornecedor adicionado:", data);
    handleClose();
  };

  return (
    <>
      <div>
        <StickyHeadTable columns={columns} rows={rows} pageType="inventory" />
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
              <Controller
                name="quantidade"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Quantidade"
                    type="number"
                    variant="outlined"
                    error={!!errors.quantidade}
                    helperText={errors.quantidade?.message}
                  />
                )}
              />
            </Box>
            <Box sx={{ display: "flex", gap: 3, width: "100%", mt: 2 }}>
              <Controller
                name="estoqueMin"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Estoque Mínimo"
                    type="number"
                    variant="outlined"
                    error={!!errors.estoqueMin}
                    helperText={errors.estoqueMin?.message}
                  />
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
