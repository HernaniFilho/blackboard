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
import { httpPost, httpGet, httpPut } from '../../../app';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


async function fetchProdutos() {
  try {
    const response = await httpGet(
      'http://localhost:3000/api/produtos',
      {
        headers: 
          {
            nomeloja: "Loja B"
          }
      }
    );
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
  }
};

async function putProduto(p, id) {
  try {
    const response = await httpPut(
      `http://localhost:3000/api/produtos/${id}`,
      p,
      {
        headers: 
          {
            nomeloja: "Loja B"
          }
      }
    );
    await fetchProdutos();
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
  }
};

async function fetchVendas() {
  try {
    const response = await httpGet(
      'http://localhost:3000/api/vendas',
      {
        headers: 
          {
            nomeloja: "Loja B"
          }
      }
    );
  } catch (error) {
    console.error("Erro ao buscar vendas:", error);
  }
};

async function postVenda(produtoVenda) {
  try {
    const response = await httpPost(
      'http://localhost:3000/api/vendas/', produtoVenda,
      {
        headers: 
          {
            nomeloja: "Loja B"
          }
      });
    await fetchVendas();
  } catch (error) {
    console.error("Erro ao buscar vendas:", error);
  }
};

export default function ConfirmarVenda({ open, handleClose}) {
  const nomeProduto = useVendaStore((state) => state.nomeProduto);
  const quantidade = useVendaStore((state) => state.quantidade);
  const precoTotal = useVendaStore((state) => state.precoTotal);
  const setDataVenda = useVendaStore((state) => state.setData);
  const clearStore = useVendaStore((state) => state.setClearVendaStore)

  async function handleConfirmar() {
    const dataAtual = new Date();
    setDataVenda(dataAtual);
    const estadoAtual = useVendaStore.getState();
    const idProduto = estadoAtual.produtoPosVenda._id;
    const produtoVendido = { 
      nomeProduto: estadoAtual.produtoPosVenda.nomeProduto,
      preco: estadoAtual.produtoPosVenda.preco,
      quantidade: estadoAtual.produtoPosVenda.quantidade,
      estoqueMin: estadoAtual.produtoPosVenda.estoqueMin,
      nomeLoja: "Loja B"
    };

    const produtoPostVenda = {
      nomeLoja: "Loja B",
      nomeProduto: nomeProduto,
      quantidade: quantidade,
      data: dataAtual,
      precoTotal: precoTotal      
    };

    async function posConfirmarVenda(produtoVendido, idProduto, produtoPostVenda) {
      await fetchProdutos();
      await putProduto(produtoVendido, idProduto);
      await fetchVendas();
      await postVenda(produtoPostVenda);
    };

    await posConfirmarVenda(produtoVendido, idProduto, produtoPostVenda);

    clearStore();
    window.location.reload();
    handleClose();
  };

  React.useEffect(() => {
    fetchProdutos();
    }, []);

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
        {precoTotal != null && (<Typography gutterBottom sx={{ mb: 2, fontWeight: 'bold' }}>
          Total: {precoTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
        </Typography>)}
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