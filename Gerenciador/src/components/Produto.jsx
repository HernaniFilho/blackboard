/**
 * Componente React para gerenciamento de produtos.
 * Este componente exibe uma tabela de produtos e permite adicionar novos produtos através de um modal.
 * Utiliza validação de formulários com React Hook Form e Yup.
 * @component
 */

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

/**
 * Estilo do modal de adição de produtos.
 * @constant {Object}
 */
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

/**
 * Definição das colunas da tabela de produtos.
 * @constant {Array<Object>}
 */
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

/**
 * Esquema de validação do formulário de produtos com Yup.
 * @constant {yup.ObjectSchema}
 */
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
    .min(0, "A quantidade deve ser maior que zero")
    .max(500, "A quantidade não pode exceder 500")
    .integer("A quantidade deve ser um número inteiro")
    .required("A quantidade é obrigatória"),
  estoqueMin: yup
    .number()
    .typeError("O estoque mínimo deve ser um número")
    .positive("O estoque mínimo deve ser positivo")
    .integer("O estoque mínimo deve ser um número inteiro")
    .required("O estoque mínimo é obrigatório"),
});

/**
 * Componente principal para exibição e adição de produtos.
 * @component
 */
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

  /**
   * Abre o modal de adição de produto.
   */
  const handleOpen = () => setOpen(true);

  /**
   * Fecha o modal e reseta o formulário.
   */
  const handleClose = () => {
    reset();
    setOpen(false);
  };

  /**
   * Manipula o envio do formulário de adição de produto.
   * @param {Object} data - Dados do formulário.
   */
  const onSubmit = (data) => {
    addProduto(data);
    handleClose();
  };

  /**
   * Busca os produtos ao carregar o componente.
   */
  useEffect(() => {
    fetchProdutos();
  }, []);

  /**
   * Configura o EventSource para receber notificações em tempo real.
   */
  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3000/api/notify");

    eventSource.addEventListener("change", async (event) => {
      try {
        const payload = JSON.parse(event.data);
        await fetchProdutos();
      } catch (err) {
        console.error("Erro ao processar evento SSE:", err);
      }
    });

    eventSource.onerror = (error) => {
      console.error("Erro SSE:", error);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <>
      {/* Tabela de produtos */}
      <StickyHeadTable columns={columns} rows={produtos} pageType="orders" />

      {/* Botão flutuante para abrir o modal de adição de produto */}
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

      {/* Modal de adição de produto */}
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
