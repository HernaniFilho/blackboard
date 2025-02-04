import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import theme from "../assets/palette";

/**
 * Um hook personalizado do React para exibir um diálogo de confirmação.
 * @returns {Object} Um objeto contendo a função `openConfirmationDialog` e o componente `ConfirmationDialog`.
 * @property {Function} openConfirmationDialog - Função para abrir o diálogo de confirmação.
 * @property {React.Component} ConfirmationDialog - O componente de diálogo que deve ser renderizado na interface.
 * @example
 * const { openConfirmationDialog, ConfirmationDialog } = useConfirmationDialog();
 * openConfirmationDialog(() => {
 *   console.log("Item deletado!");
 * });
 * return <ConfirmationDialog />;
 */
export function useConfirmationDialog() {
  const [openDialog, setOpenDialog] = useState(false);
  const [onConfirm, setOnConfirm] = useState(null);

  /**
   * Abre o diálogo de confirmação e define a função de callback a ser executada ao confirmar.
   * @param {Function} onConfirmCallback - Função de callback que será executada ao confirmar a ação.
   */
  const openConfirmationDialog = (onConfirmCallback) => {
    setOnConfirm(() => onConfirmCallback);
    setOpenDialog(true);
  };

  /**
   * Fecha o diálogo de confirmação e limpa a função de callback.
   */
  const handleClose = () => {
    setOpenDialog(false);
    setOnConfirm(null);
  };

  /**
   * Executa a função de callback (se existir) e fecha o diálogo.
   */
  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    handleClose();
  };

  /**
   * Componente de diálogo de confirmação que pode ser renderizado na interface.
   * @returns {React.Component} O componente de diálogo configurado.
   */
  const ConfirmationDialog = () => (
    <Dialog open={openDialog} onClose={handleClose}>
      <DialogTitle
        sx={{
          backgroundColor: theme.palette.custom.skyBlue,
        }}
      >
        Confirme a exclusão
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: theme.palette.custom.skyBlue,
        }}
      >
        Você tem certeza que quer deletar esse dado? Ele não poderá ser
        recuperado depois.
      </DialogContent>
      <DialogActions
        sx={{
          backgroundColor: theme.palette.custom.skyBlue,
        }}
      >
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          sx={{
            color: theme.palette.custom.red,
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );

  return {
    openConfirmationDialog,
    ConfirmationDialog,
  };
}
