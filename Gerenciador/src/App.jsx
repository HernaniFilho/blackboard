import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TemporaryDrawer from "./Menu";
import useStore from "./state/store";
import Fornecedores from "./components/Fornecedores";
import Produto from "./components/Produto";
import Venda from "./components/Venda";
import Compra from "./components/Compra";
import Transferencia from "./components/Transferencia";
import Dashboard from "./components/Dashboard";

function App() {
  const [count, setCount] = useState(0);
  const escolha = useStore((state) => state.escolha);

  const renderMainContent = () => {
    switch (escolha) {
      case 1:
        return (
          <div>
            <Fornecedores></Fornecedores>
          </div>
        );
      case 2:
        return (
          <div>
            <Produto></Produto>
          </div>
        );
      case 3:
        return (
          <div>
            <Compra></Compra>
          </div>
        );
      case 4:
        return (
          <div>
            <Venda></Venda>
          </div>
        );
      case 5:
        return (
          <div>
            <Transferencia></Transferencia>
          </div>
        );
      default:
        return (
          <div>
            <Dashboard></Dashboard>
          </div>
        );
    }
  };
  return (
    <>
      <div className="top-left">
        <TemporaryDrawer />
      </div>
      <div>{renderMainContent()}</div>
    </>
  );
}

export default App;
