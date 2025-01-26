import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import theme from "../assets/palette";

export function useConfirmationDialog() {
  const [openDialog, setOpenDialog] = useState(false);
  const [onConfirm, setOnConfirm] = useState(null);

  const openConfirmationDialog = (onConfirmCallback) => {
    setOnConfirm(() => onConfirmCallback);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setOnConfirm(null);
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    handleClose();
  };

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
