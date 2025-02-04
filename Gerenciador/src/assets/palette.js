import { createTheme } from "@mui/material/styles";

/**
 * Cria um tema personalizado para a aplicação usando Material-UI.
 * O tema define uma paleta de cores customizadas que podem ser usadas em toda a aplicação.
 * @returns {Object} Um tema do Material-UI com cores personalizadas.
 * @example
 * // Uso em um componente
 * import theme from './theme';
 * import { ThemeProvider } from '@mui/material/styles';
 *
 * function App() {
 *   return (
 *     <ThemeProvider theme={theme}>
 *       <SeuComponente />
 *     </ThemeProvider>
 *   );
 * }
 */
const theme = createTheme({
  palette: {
    custom: {
      white: "#FFFFFF", // Branco
      beige: "#F5EFEB", // Bege
      skyBlue: "#C8D9E6", // Azul claro
      teal: "#567C8D", // Azul petróleo
      navy: "#2F4156", // Azul marinho
      green: "#8bc34a", // Verde
      red: "#ff1744", // Vermelho
    },
  },
});

export default theme;
