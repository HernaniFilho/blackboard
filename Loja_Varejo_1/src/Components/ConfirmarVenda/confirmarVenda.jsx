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
import { useNavigate } from "react-router-dom";

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
    console.log("To em fetchProdutos 1");
    const response = await httpGet(
      //colocar baseurl
      'http://localhost:3000/api/produtos',
      {
        headers: 
          {
            nomeloja: "Loja A"
          }
      }
    ); // URL do seu backend
    console.log("To em fetchProdutos 2");
    //setProdutos(response); // Atualiza o estado com os dados retornados
    console.log("Response fetchProdutos:", response); // Exibe os dados no console
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    //setProdutos([]); 
  }
};

async function putProduto(p, id) {
  try {
    console.log("To em putProduto 1");
    const response = await httpPut(
      //colocar baseurl
      `http://localhost:3000/api/produtos/${id}`,
      p,
      {
        headers: 
          {
            nomeloja: "Loja A"
          }
      }
    ); // URL do seu backend
    console.log("To em putProduto 2");
    console.log("Response putProduto:", response); // Exibe os dados no console
    await fetchProdutos();
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
  }
};



//Popula a cache
async function fetchVendas() {
  try {
    console.log("To em fetchVendas 1");
    const response = await httpGet(
      //colocar baseurl
      'http://localhost:3000/api/vendas',
      {
        headers: 
          {
            nomeloja: "Loja A"
          }
      }
    ); // URL do seu backend
    console.log("To em fetchVendas 2");
    console.log("Response fetchVendas:", response); // Exibe os dados no console
  } catch (error) {
    console.error("Erro ao buscar vendas:", error);
  }
};

async function postVenda(produtoVenda) {
  try {
    console.log("To em postVenda 1");
    console.log("produtoVenda: ", produtoVenda);

    const response = await httpPost(
      //colocar baseurl
      'http://localhost:3000/api/vendas/', produtoVenda,
      {
        headers: 
          {
            nomeloja: "Loja A"
          }
      }); // URL do seu backend
    console.log("To em postVenda 2");
    console.log("Response postVenda:", response);
    await fetchVendas();
  } catch (error) {
    console.error("Erro ao buscar vendas:", error);
  }
};


export default function ConfirmarVenda({ open, handleClose }) {
  const nomeProduto = useVendaStore((state) => state.nomeProduto);
  const quantidade = useVendaStore((state) => state.quantidade);
  const precoTotal = useVendaStore((state) => state.precoTotal);
  const setDataVenda = useVendaStore((state) => state.setData);
  const navigate = useNavigate();
  const timer = () => {
    setTimeout(() => {
      navigate("/");  // Redireciona após o tempo definido
      window.scrollTo({
        top: 0,
        behavior: 'auto' // Isso adiciona uma rolagem suave
    });
    }, 2000);
  };

  async function handleConfirmar() {
    // Obtendo a data e salvando no Zustand
    const dataAtual = new Date();
    setDataVenda(dataAtual); // Salva a data atual no Zustand
    const estadoAtual = useVendaStore.getState();
    console.log(estadoAtual);

    console.log("Teste:", estadoAtual.produtoPosVenda._id);
    const idProduto = estadoAtual.produtoPosVenda._id;

    const produtoVendido = { 
      nomeProduto: estadoAtual.produtoPosVenda.nomeProduto,
      preco: estadoAtual.produtoPosVenda.preco,
      quantidade: estadoAtual.produtoPosVenda.quantidade,
      estoqueMin: estadoAtual.produtoPosVenda.estoqueMin,
      nomeLoja: "Loja A"
    };

    const produtoPostVenda = {
      nomeLoja: "Loja A",
      nomeProduto: nomeProduto,
      quantidade: quantidade,



      data: dataAtual, //OBSERVAÇÃO: VALIDAR "dataAtual"



      precoTotal: precoTotal      
    }
    console.log("produtoPostVenda: ", produtoPostVenda);

    async function posConfirmarVenda(produtoVendido, idProduto, produtoPostVenda) {
      await fetchProdutos();
      await putProduto(produtoVendido, idProduto);
      await fetchVendas();
      await postVenda(produtoPostVenda);
    }

    await posConfirmarVenda(produtoVendido, idProduto, produtoPostVenda);

    
    timer();
    window.location.reload();//Tentar mudar 
    handleClose(); // Fecha o modal após salvar a data
    
  };

  React.useEffect(() => { //parametro -> Flag 
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
