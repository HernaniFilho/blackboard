import "./App.css";
import TemporaryDrawer from "./Menu";
import useStore from "./state/store";
import Fornecedores from "./components/Fornecedores";
import Produto from "./components/Produto";
import Venda from "./components/Venda";
import Compra from "./components/Compra";
import Transferencia from "./components/Transferencia";
import Dashboard from "./components/Dashboard";

const componentStrategies = {
  1: Produto,
  2: Fornecedores,
  3: Compra,
  4: Venda,
  5: Transferencia,
  default: Dashboard,
};

function App() {
  const escolha = useStore((state) => state.escolha);

  const renderMainContent = () => {
    const Component =
      componentStrategies[escolha] || componentStrategies.default;
    return <Component />;
  };

  return (
    <>
      <h1>{componentStrategies[escolha]?.name || "Dashboard"}</h1>

      <div className="top-left">
        <TemporaryDrawer />
      </div>
      <div>{renderMainContent()}</div>
    </>
  );
}

export default App;
