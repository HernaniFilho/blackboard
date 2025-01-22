import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import useVendaStore from '../../Zustand/zustand';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ConfirmarVenda({ open, handleClose }) {
  const nomeProduto = useVendaStore((state) => state.nomeProduto);
  const quantidade = useVendaStore((state) => state.quantidade);
  const setDataVenda = useVendaStore((state) => state.setData);

  const handleConfirmar = () => {
    // Obtendo a data e salvando no Zustand
    const dataAtual = new Date();
    setDataVenda(dataAtual); // Salva a data atual no Zustand
    const estadoAtual = useVendaStore.getState();
    console.log(estadoAtual);
    handleClose(); // Fecha o modal após salvar a data
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2, fontWeight: 'bold' }} id="customized-dialog-title">
        Confirmação de Venda
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Typography gutterBottom sx={{ textAlign: 'center', mb: 4, fontWeight: 'bold' }}>
          Resumo da venda
        </Typography>
        <Typography gutterBottom sx={{ mb: 2, fontWeight: 'bold' }}>
          Produto: {nomeProduto}
        </Typography>
        <Typography gutterBottom sx={{ mb: 2, fontWeight: 'bold' }}>
          Quantidade: {quantidade}
        </Typography>
        <Typography gutterBottom sx={{ mb: 2, fontWeight: 'bold' }}></Typography>
        <Typography gutterBottom sx={{ mt: 4, fontWeight: 'bold' }}>
          Deseja confirmar esta venda?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} sx={{ fontWeight: 'bold' }}>
          Cancelar
        </Button>
        <Button onClick={handleConfirmar} sx={{ fontWeight: 'bold' }}>
          Confirmar
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
