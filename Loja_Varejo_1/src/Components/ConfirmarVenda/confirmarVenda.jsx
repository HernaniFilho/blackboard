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

/**
 * Componente de diálogo estilizado com preenchimento personalizado para conteúdo e ações.
 * 
 * @componente
 * @exemplo
 * return <BootstrapDialog {...props} />;
 */
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

/**
 * Busca a lista de produtos na API.
 * 
 * @async
 * @returns {Promise<void>} Uma promessa indicando a conclusão da operação de busca.
 */
async function fetchProdutos() {
  try {
    const response = await httpGet(
      'http://localhost:3000/api/produtos',
      {
        headers: 
          {
            nomeloja: "Loja A"
          }
      }
    );
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
  }
};

/**
 * Atualiza as informações de um produto na base de dados.
 * 
 * @async
 * @param {Object} p - Os dados atualizados do produto.
 * @param {string} id - O ID do produto a ser atualizado.
 * @returns {Promise<void>} Uma promessa indicando a conclusão da operação de atualização.
 */
async function putProduto(p, id) {
  try {
    const response = await httpPut(
      `http://localhost:3000/api/produtos/${id}`,
      p,
      {
        headers: 
          {
            nomeloja: "Loja A"
          }
      }
    );
    await fetchProdutos();
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
  }
};

/**
 * Busca os dados de vendas na API.
 * 
 * @async
 * @returns {Promise<void>} Uma promessa indicando a conclusão da operação de busca.
 */
async function fetchVendas() {
  try {
    const response = await httpGet(
      'http://localhost:3000/api/vendas',
      {
        headers: 
          {
            nomeloja: "Loja A"
          }
      }
    ); 
  } catch (error) {
    console.error("Erro ao buscar vendas:", error);
  }
};

/**
 * Envia os dados de uma venda para a API.
 * 
 * @async
 * @param {Object} produtoVenda - Os dados da venda a serem enviados.
 * @returns {Promise<void>} Uma promessa indicando a conclusão da operação de envio.
 */
async function postVenda(produtoVenda) {
  try {
    const response = await httpPost(
      'http://localhost:3000/api/vendas/', produtoVenda,
      {
        headers: 
          {
            nomeloja: "Loja A"
          }
      });
    await fetchVendas();
  } catch (error) {
    console.error("Erro ao buscar vendas:", error);
  }
};

/**
 * Componente de diálogo de confirmação de venda.
 * 
 * Este componente exibe um diálogo onde o usuário pode confirmar os detalhes da venda antes de finalizar a transação.
 * 
 * @componente
 * @param {Object} props - As propriedades do componente.
 * @param {boolean} props.open - Flag que indica se o diálogo está aberto.
 * @param {Function} props.handleClose - Função para fechar o diálogo.
 * @exemplo
 * return <ConfirmarVenda open={open} handleClose={handleClose} />;
 */
export default function ConfirmarVenda({ open, handleClose }) {
  const nomeProduto = useVendaStore((state) => state.nomeProduto);
  const quantidade = useVendaStore((state) => state.quantidade);
  const precoTotal = useVendaStore((state) => state.precoTotal);
  const setDataVenda = useVendaStore((state) => state.setData);
  const clearStore = useVendaStore((state) => state.setClearVendaStore)

  /**
   * Lida com a confirmação de uma venda, atualizando o estoque do produto e criando um registro de venda na base de dados.
   * 
   * @async
   * @returns {Promise<void>} Uma promessa indicando a conclusão da confirmação da venda.
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
      nomeLoja: "Loja A"
    };

    const produtoPostVenda = {
      nomeLoja: "Loja A",
      nomeProduto: nomeProduto,
      quantidade: quantidade,
      data: dataAtual,
      precoTotal: precoTotal      
    };

    /**
     * Pós-processa a venda após a confirmação, atualizando o estoque do produto, postando a venda e atualizando os dados.
     * 
     * @async
     * @param {Object} produtoVendido - Os detalhes do produto após a venda.
     * @param {string} idProduto - O ID do produto.
     * @param {Object} produtoPostVenda - Os dados da venda a ser postada.
     * @returns {Promise<void>} Uma promessa indicando a conclusão do pós-processamento da venda.
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
