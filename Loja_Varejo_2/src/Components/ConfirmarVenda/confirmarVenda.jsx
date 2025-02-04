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

// Componente estilizado que modifica o comportamento visual do Dialog, utilizando MUI.
// Modifica o padding de conteúdo e ações dentro do Dialog.
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

/**
 * Função assíncrona para buscar os produtos da loja.
 * Realiza uma requisição GET à API de produtos, passando o cabeçalho 'nomeloja' com valor 'Loja B'.
 * 
 * @async
 * @function fetchProdutos
 * @returns {Promise<void>} Retorna uma promise que resolve após a requisição.
 */
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

/**
 * Função assíncrona para atualizar um produto no estoque.
 * Realiza uma requisição PUT à API de produtos, atualizando a quantidade e outras informações do produto.
 * 
 * @async
 * @function putProduto
 * @param {Object} p - Objeto contendo os dados do produto atualizado.
 * @param {string} id - ID do produto a ser atualizado.
 * @returns {Promise<void>} Retorna uma promise que resolve após a atualização do produto.
 */
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

/**
 * Função assíncrona para buscar as vendas registradas.
 * Realiza uma requisição GET à API de vendas, passando o cabeçalho 'nomeloja' com valor 'Loja B'.
 * 
 * @async
 * @function fetchVendas
 * @returns {Promise<void>} Retorna uma promise que resolve após a requisição.
 */
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

/**
 * Função assíncrona para registrar uma nova venda.
 * Realiza uma requisição POST à API de vendas, enviando os dados da venda.
 * 
 * @async
 * @function postVenda
 * @param {Object} produtoVenda - Objeto contendo os dados da venda.
 * @returns {Promise<void>} Retorna uma promise que resolve após a criação da venda.
 */
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

/**
 * Componente `ConfirmarVenda` que exibe um modal para confirmar a venda de um produto.
 * Este componente recebe as informações do produto a ser vendido e permite ao usuário confirmar ou cancelar a venda.
 * 
 * @param {Object} props - Propriedades do componente.
 * @param {boolean} props.open - Estado para controlar a visibilidade do modal.
 * @param {function} props.handleClose - Função para fechar o modal.
 * @returns {JSX.Element} - O JSX do modal de confirmação de venda.
 */
export default function ConfirmarVenda({ open, handleClose}) {
  const nomeProduto = useVendaStore((state) => state.nomeProduto);
  const quantidade = useVendaStore((state) => state.quantidade);
  const precoTotal = useVendaStore((state) => state.precoTotal);
  const setDataVenda = useVendaStore((state) => state.setData);
  const clearStore = useVendaStore((state) => state.setClearVendaStore)

  /**
   * Função que é chamada quando o usuário confirma a venda.
   * Atualiza o estoque, registra a venda e limpa o estado da venda.
   * 
   * @async
   * @function handleConfirmar
   * @returns {Promise<void>} Retorna uma promise que resolve após a confirmação da venda.
   */
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

    /**
     * Função auxiliar chamada após a confirmação da venda. 
     * Atualiza o estoque, registra a venda e realiza outras operações necessárias.
     * 
     * @async
     * @function posConfirmarVenda
     * @param {Object} produtoVendido - Dados do produto que foi vendido.
     * @param {string} idProduto - ID do produto a ser atualizado.
     * @param {Object} produtoPostVenda - Dados da venda a ser registrada.
     * @returns {Promise<void>} Retorna uma promise que resolve após todas as operações de pós-venda.
     */
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

  // Chama a função para buscar os produtos quando o componente é montado.
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
