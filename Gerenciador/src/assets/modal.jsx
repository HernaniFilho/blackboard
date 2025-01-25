import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
  Button,
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
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

export default function ProductModal({
  open,
  handleClose,
  handleSave,
  productData,
  setProductData,
  pageType,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <h2 id="modal-title" style={{ textAlign: "center" }}>
          {pageType === "inventory"
            ? "Adicionar novo Produto"
            : "Adicionar novo Item"}
        </h2>

        {pageType === "inventory" && (
          <FormControl fullWidth sx={{ m: 1 }}>
            <TextField
              label="Nome do Fornecedor"
              variant="outlined"
              name="fornecedor"
              value={productData.nome || ""}
              onChange={handleChange}
            />
          </FormControl>
        )}

        <FormControl fullWidth sx={{ m: 1 }}>
          <TextField
            label="Nome do Produto"
            variant="outlined"
            name="nome"
            value={productData.nome || ""}
            onChange={handleChange}
          />
        </FormControl>

        <div style={{ display: "flex", gap: "16px", width: "100%" }}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Preço</InputLabel>
            <OutlinedInput
              startAdornment={
                <InputAdornment position="start">R$</InputAdornment>
              }
              label="Preco"
              name="preco"
              type="number"
              value={productData.preco || ""}
              onChange={handleChange}
            />
          </FormControl>
          {pageType === "orders" && (
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel id="select-store-label">Loja</InputLabel>
              <Select
                labelId="select-store-label"
                name="loja"
                value={productData.nomeLoja || ""}
                onChange={handleChange}
              >
                <MenuItem value="A">Loja A</MenuItem>
                <MenuItem value="B">Loja B</MenuItem>
              </Select>
            </FormControl>
          )}
        </div>

        {pageType !== "inventory" && (
          <div style={{ display: "flex", gap: "16px", width: "100%" }}>
            <TextField
              fullWidth
              label="Quantidade"
              type="number"
              name="quantidade"
              value={productData.quantidade || ""}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Estoque Mínimo"
              type="number"
              name="estoqueMin"
              value={productData.estoqueMin || ""}
              onChange={handleChange}
              variant="outlined"
            />
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "16px",
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
            onClick={handleSave}
          >
            Adicionar
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
