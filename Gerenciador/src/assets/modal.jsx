import { useForm, Controller } from "react-hook-form";
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

// 📌 Schema de validação com Yup
const schema = yup.object().shape({
  productName: yup.string().required("Nome do produto é obrigatório"),
  supplierName: yup.string().required("Nome do fornecedor é obrigatório"),
  price: yup
    .number()
    .typeError("O preço deve ser um número")
    .positive("O preço deve ser maior que zero")
    .required("O preço é obrigatório"),
  quantity: yup
    .number()
    .typeError("A quantidade deve ser um número")
    .min(1, "A quantidade deve ser pelo menos 1")
    .required("A quantidade é obrigatória"),
  store: yup.string().required("A loja é obrigatória"),
});

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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
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
              defaultValue={productData.nome}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nome do Fornecedor"
                  variant="outlined"
                  error={!!errors.supplierName}
                  helperText={errors.supplierName?.message}
                />
              )}
            />
          </FormControl>
        )}

        {/* Nome do Produto */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Controller
            name="productName"
            control={control}
            defaultValue={productData.nomeProduto}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nome do Produto"
                variant="outlined"
                error={!!errors.productName}
                helperText={errors.productName?.message}
              />
            )}
          />
        </FormControl>

        {/* Preço */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel htmlFor="price">Preço</InputLabel>
          <Controller
            name="price"
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
                error={!!errors.price}
              />
            )}
          />
          <p style={{ color: "red", fontSize: "12px" }}>
            {errors.price?.message}
          </p>
        </FormControl>

        {/* Loja */}
        {pageType === "orders" && (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Loja</InputLabel>
            <Controller
              name="store"
              control={control}
              defaultValue={productData.nomeLoja}
              render={({ field }) => (
                <Select {...field} label="Loja" error={!!errors.store}>
                  <MenuItem value="A">Loja A</MenuItem>
                  <MenuItem value="B">Loja B</MenuItem>
                </Select>
              )}
            />
            <p style={{ color: "red", fontSize: "12px" }}>
              {errors.store?.message}
            </p>
          </FormControl>
        )}

        {/* Quantidade */}
        {pageType === "orders" && (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <Controller
              name="quantity"
              control={control}
              defaultValue={productData.quantidade}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Quantidade"
                  type="number"
                  variant="outlined"
                  error={!!errors.quantity}
                  helperText={errors.quantity?.message}
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
          <Button
            sx={{ color: theme.palette.custom.green }}
            onClick={handleSubmit(onSubmit)}
          >
            Adicionar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
