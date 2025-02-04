import { AppRouter } from './Routes/rotas';

/**
 * Componente principal da aplicação.
 * 
 * Este componente é o ponto de entrada para a aplicação e renderiza o roteador (AppRouter),
 * que gerencia as rotas e a navegação entre as páginas da aplicação.
 * 
 * @returns {JSX.Element} O componente App que contém o roteador de navegação.
 */
function App() {
  return (
    <AppRouter />
  );
}

export default App;
