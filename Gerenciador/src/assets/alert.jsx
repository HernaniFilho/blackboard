import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

/**
 * Um hook personalizado do React para exibir notificações usando o componente Snackbar.
 * @returns {Object} Um objeto contendo a função `showSnackbar` e o componente `SnackbarComponent`.
 * @property {Function} showSnackbar - Função para exibir o Snackbar com uma mensagem e severidade.
 * @property {React.Component} SnackbarComponent - O componente Snackbar que deve ser renderizado na interface.
 * @example
 * const { showSnackbar, SnackbarComponent } = useSnackbar();
 * showSnackbar("Mensagem de sucesso!", "success");
 * return <SnackbarComponent />;
 */
export default function useSnackbar() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");

  /**
   * Exibe o Snackbar com uma mensagem e severidade.
   * @param {string} message - A mensagem a ser exibida no Snackbar.
   * @param {string} severity - A severidade da mensagem (ex: "success", "error", "info", "warning").
   */
  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  /**
   * Fecha o Snackbar.
   * @param {Object} event - O evento de fechamento.
   * @param {string} reason - A razão do fechamento (ex: "clickaway").
   */
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  /**
   * Componente Snackbar que pode ser renderizado na interface.
   * @returns {React.Component} O componente Snackbar configurado.
   */
  const SnackbarComponent = () => (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={snackbarSeverity}
        sx={{ width: "100%" }}
      >
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );

  return {
    showSnackbar,
    SnackbarComponent,
  };
}
