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
  Select,
  MenuItem,
  Button,
  Fab,
} from "@mui/material";

const columns = [
  { id: "nome", label: "Nome do Fornecedor", minWidth: 220 },
  { id: "produto", label: "Produto", minWidth: 220 },
  {
    id: "preco",
    label: "Preço do Produto",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("pt-BR"),
  },
];

const rows = [
  {
    id: 1,
    nome: "SapatosDemais",
    produto: "Sapatilha",
    preco: 119.95,
  },
];

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

function Fornecedores() {
  const [loja, setLoja] = React.useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setLoja(event.target.value);
  };
  return (
    <>
      <div>
        <StickyHeadTable columns={columns} rows={rows}></StickyHeadTable>
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
        >
          <AddIcon onClick={handleOpen} />
        </Fab>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <h2 id="child-modal-title" style={{ textAlign: "center" }}>
            Adicionar novo Produto
          </h2>
          <FormControl fullWidth sx={{ m: 1 }}>
            <TextField
              id="outlined-basic"
              label="Nome do Fornecedor"
              variant="outlined"
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }}>
            <TextField
              id="outlined-basic"
              label="Nome do Produto"
              variant="outlined"
            />
          </FormControl>
          <div style={{ display: "flex", gap: "16px", width: "50%" }}>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount">Preço</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">R$</InputAdornment>
                }
                label="Preco"
              />
            </FormControl>
          </div>
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
              onClick={handleClose}
            >
              Adicionar
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default Fornecedores;
