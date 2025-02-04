/**
 * Aqui é utilizado o padrão de software Strategy, onde o ícone escolhido em menu
 * gera um número significando a escolha do strategy que irá ser renderizado na tela
 **/
import "./App.css";
import TemporaryDrawer from "./Menu";
import useStore from "./state/store";
import Fornecedores from "./components/Fornecedores";
import Produto from "./components/Produto";
import Venda from "./components/Venda";
import Compra from "./components/Compra";
import Transferencia from "./components/Transferencia";
import Dashboard from "./components/Dashboard";
import theme from "./assets/palette";

/**
 * Estratégias de renderização de componentes com base na escolha do usuário.
 * O componente renderizado depende do valor de `escolha` do estado global.
 *
 * @type {Object.<number, React.ComponentType>}
 */
const componentStrategies = {
  1: Produto,
  2: Fornecedores,
  3: Compra,
  4: Venda,
  5: Transferencia,
  default: Dashboard,
};

/**
 * Componente principal da aplicação.
 * Exibe o título da página e o componente correspondente à escolha do usuário.
 *
 * @returns {JSX.Element} O componente renderizado.
 */
function App() {
  // Obtém o valor de 'escolha' do estado global.
  const escolha = useStore((state) => state.escolha);

  /**
   * Função para renderizar o conteúdo principal com base na escolha do usuário.
   *
   * @returns {JSX.Element} O componente correspondente à escolha.
   */
  const renderMainContent = () => {
    const Component =
      componentStrategies[escolha] || componentStrategies.default;
    return <Component />;
  };

  return (
    <>
      <h1 style={{ color: theme.palette.custom.navy }}>
        {componentStrategies[escolha]?.name || "Dashboard"}
      </h1>

      <div className="top-left">
        <TemporaryDrawer />
      </div>
      <div>{renderMainContent()}</div>
    </>
  );
}

export default App;
