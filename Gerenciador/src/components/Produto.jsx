import React, { useEffect, useState } from "react";
import StickyHeadTable from "./Tabelas/Table";
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
  Select,
  MenuItem,
  Button,
  Fab,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useProdutosStore from "../state/ProdutoStore";

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
  pt: 3,
  px: 4,
  pb: 3,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const columns = [
  { id: "nomeProduto", label: "Nome", minWidth: 150 },
  { id: "nomeLoja", label: "Nome Loja", minWidth: 70 },
  {
    id: "preco",
    label: "Preço",
    minWidth: 80,
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

const schema = yup.object().shape({
  nomeProduto: yup.string().required("O nome do produto é obrigatório"),
  preco: yup
    .number()
    .typeError("O preço deve ser um número")
    .positive("O preço deve ser positivo")
    .required("O preço é obrigatório"),
  nomeLoja: yup.string().required("Selecione uma loja"),
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

function Produto() {
  const [open, setOpen] = useState(false);
  const { produtos, fetchProdutos, addProduto } = useProdutosStore();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nomeProduto: "",
      preco: "",
      nomeLoja: "",
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
    addProduto(data);
    console.log(produtos);
    console.log("Produto adicionado:", data);
    handleClose();
  };

  useEffect(() => {
    fetchProdutos();
    console.log("Produtos:", produtos);
  }, []);

  useEffect(() => {
    // Cria a conexão SSE somente quando o componente é montado.
    const eventSource = new EventSource("http://localhost:3000/api/notify");
    eventSource.onopen = (e) => {
      console.log("SSE connection established:", e);
    };

    eventSource.onmessage = (event) => {
      console.log("onmessage event received:", event);
      try {
        const payload = JSON.parse(event.data);
        console.log("Parsed payload (onmessage):", payload);
        fetchProdutos();
      } catch (err) {
        console.error("Error parsing onmessage event.data:", err);
      }
    };

    eventSource.addEventListener("change", (event) => {
      console.log("Evento SSE 'change' received:", event);
      try {
        const payload = JSON.parse(event.data);
        console.log("Parsed payload in 'change':", payload);
        fetchProdutos();
      } catch (err) {
        console.error("Error parsing event.data in 'change':", err);
      }
    });
    // Manipulador de erros
    eventSource.onerror = (error) => {
      console.error("SSE error:", error);
      // Opcional: reconectar ou tratar o erro conforme sua lógica
    };

    // Cleanup: fecha a conexão quando o componente for desmontado.
    return () => {
      eventSource.close();
      console.log("SSE connection closed");
    };
  }, []);

  return (
    <>
      <div>
        <StickyHeadTable columns={columns} rows={produtos} pageType="orders" />
      </div>
      <div style={{ padding: "16px" }}>
        <Fab
          sx={{
            color: theme.palette.custom.navy,
            "&:hover": {
              backgroundColor: theme.palette.custom.teal,
            },
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
        aria-describedby="child-modal-description"
      >
        <Box sx={style}>
          <h2
            id="child-modal-title"
            style={{ textAlign: "center", marginBottom: "16px" }}
          >
            Adicionar novo Produto
          </h2>
          <form
            style={{ width: "100%" }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
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
                    <InputLabel htmlFor="outlined-adornment-amount">
                      Preço
                    </InputLabel>
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
                name="nomeLoja"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Loja</InputLabel>
                    <Select {...field} error={!!errors.nomeLoja}>
                      <MenuItem value="Loja A">Loja A</MenuItem>
                      <MenuItem value="Loja B">Loja B</MenuItem>
                    </Select>
                    <span style={{ color: "red", fontSize: "12px" }}>
                      {errors.nomeLoja?.message}
                    </span>
                  </FormControl>
                )}
              />
            </Box>

            <Box sx={{ display: "flex", gap: 3, width: "100%", mt: 2 }}>
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

export default Produto;
