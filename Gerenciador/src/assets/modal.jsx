import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
  FormControl,
} from "@mui/material";
import theme from "../assets/palette";

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
  p: 4,
};

/**
 * Gera um schema de validação Yup com base no tipo de página.
 * @param {string} pageType - O tipo de página ("orders" ou "inventory").
 * @returns {Object} Um schema Yup para validação de formulário.
 */
const getSchema = (pageType) => {
  const baseSchema = {
    nomeProduto: yup.string(),
    preco: yup
      .number()
      .typeError("O preço deve ser um número")
      .positive("O preço deve ser maior que zero")
      .required("O preço é obrigatório"),
  };

  if (pageType === "orders") {
    return yup.object().shape({
      ...baseSchema,
      nomeLoja: yup.string().required("A loja é obrigatória"),
      quantidade: yup
        .number()
        .typeError("A quantidade deve ser um número")
        .min(0, "A quantidade deve ser positiva")
        .required("A quantidade é obrigatória"),
      estoqueMin: yup
        .number()
        .typeError("A quantidade deve ser um número")
        .min(1, "A quantidade deve ser pelo menos 1")
        .required("A quantidade é obrigatória"),
    });
  } else if (pageType === "inventory") {
    return yup.object().shape({
      ...baseSchema,
      nomeFornecedor: yup.string().required("Nome do fornecedor é obrigatório"),
    });
  }

  return yup.object().shape(baseSchema);
};

/**
 * Componente de modal para adicionar ou editar produtos ou fornecedores.
 * @param {Object} props - As propriedades do componente.
 * @param {boolean} props.open - Controla se o modal está aberto ou fechado.
 * @param {Function} props.handleClose - Função para fechar o modal.
 * @param {Function} props.onSubmit - Função chamada ao submeter o formulário.
 * @param {Object} props.productData - Dados do produto ou fornecedor a serem editados.
 * @param {Function} props.setProductData - Função para atualizar os dados do produto ou fornecedor.
 * @param {string} props.pageType - O tipo de página ("orders" ou "inventory").
 * @returns {React.Component} O componente de modal.
 */
export default function ProductModal({
  open,
  handleClose,
  onSubmit,
  productData,
  setProductData,
  pageType,
}) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(getSchema(pageType)),
  });

  /**
   * Preenche os campos do formulário com os dados do produto ou fornecedor.
   */
  useEffect(() => {
    if (productData) {
      if (pageType === "orders") {
        setValue("nomeProduto", productData.nomeProduto || "");
        setValue("preco", productData.preco || "");
        setValue("nomeLoja", productData.nomeLoja || "");
        setValue("quantidade", productData.quantidade || "");
        setValue("estoqueMin", productData.estoqueMin || "");
      } else if (pageType === "inventory") {
        setValue("nomeFornecedor", productData.nomeFornecedor || "");
        setValue("nomeProduto", productData.nomeProduto || "");
        setValue("preco", productData.preco || "");
      }
    }
  }, [productData, setValue, pageType]);

  /**
   * Função chamada ao submeter o formulário.
   * @param {Object} data - Os dados do formulário.
   */
  const handleFormSubmit = (data) => {
    onSubmit({ data, id: productData._id });
    handleClose();
  };

  /**
   * Exibe os erros do formulário no console.
   */
  useEffect(() => {
    console.log("Form errors:", errors);
  }, [errors]);

  /**
   * Reseta o formulário quando o tipo de página muda.
   */
  useEffect(() => {
    reset();
  }, [pageType, reset]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <h2 style={{ textAlign: "center" }}>
            {pageType !== "inventory"
              ? "Adicionar novo Produto"
              : "Adicionar novo Fornecedor"}
          </h2>

          {/* Nome do Fornecedor */}
          {pageType === "inventory" && (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Controller
                name="nomeFornecedor"
                control={control}
                defaultValue={productData.nomeFornecedor}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Nome do Fornecedor"
                    variant="outlined"
                    disabled
                    error={!!errors.nomeFornecedor}
                    helperText={errors.nomeFornecedor?.message}
                  />
                )}
              />
            </FormControl>
          )}

          {/* Nome do Produto */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <Controller
              name="nomeProduto"
              control={control}
              defaultValue={productData.nomeProduto}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nome do Produto"
                  variant="outlined"
                  disabled
                  error={!!errors.nomeProduto}
                  helperText={errors.nomeProduto?.message}
                />
              )}
            />
          </FormControl>

          {/* Preço */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel htmlFor="price">Preço</InputLabel>
            <Controller
              name="preco"
              control={control}
              defaultValue={productData.preco}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  id="price"
                  startAdornment={
                    <InputAdornment position="start">R$</InputAdornment>
                  }
                  label="Preço"
                  error={!!errors.preco}
                />
              )}
            />
            <p style={{ color: "red", fontSize: "12px" }}>
              {errors.preco?.message}
            </p>
          </FormControl>

          {/* Loja */}
          {pageType === "orders" && (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Loja</InputLabel>
              <Controller
                name="nomeLoja"
                control={control}
                defaultValue={productData.nomeLoja}
                render={({ field }) => (
                  <Select {...field} label="Loja" error={!!errors.nomeLoja}>
                    <MenuItem value="Loja A">Loja A</MenuItem>
                    <MenuItem value="Loja B">Loja B</MenuItem>
                    <MenuItem value="LojaC2">Loja C2</MenuItem>
                  </Select>
                )}
              />
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.nomeLoja?.message}
              </p>
            </FormControl>
          )}

          {/* Quantidade */}
          {pageType === "orders" && (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Controller
                name="quantidade"
                control={control}
                defaultValue={productData.quantidade}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Quantidade"
                    type="number"
                    variant="outlined"
                    error={!!errors.quantidade}
                    helperText={errors.quantidade?.message}
                  />
                )}
              />
            </FormControl>
          )}

          {/* Estoque Mínimo */}
          {pageType === "orders" && (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Controller
                name="estoqueMin"
                control={control}
                defaultValue={productData.estoqueMin}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Estoque Mínimo"
                    type="number"
                    variant="outlined"
                    error={!!errors.estoqueMin}
                    helperText={errors.estoqueMin?.message}
                  />
                )}
              />
            </FormControl>
          )}

          {/* Botões */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              mt: 2,
            }}
          >
            <Button
              sx={{ color: theme.palette.custom.navy }}
              onClick={handleClose}
            >
              Fechar
            </Button>
            <Button type="submit" sx={{ color: theme.palette.custom.green }}>
              Adicionar
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
