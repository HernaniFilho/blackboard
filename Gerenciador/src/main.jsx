import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

/**
 * Ponto de entrada principal para a aplicação React.
 * O componente `App` é renderizado dentro do elemento com id 'root'.
 * A renderização é feita em modo estrito (Strict Mode) para detectar problemas comuns no desenvolvimento.
 *
 * @function
 * @returns {JSX.Element} O componente raiz da aplicação.
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
