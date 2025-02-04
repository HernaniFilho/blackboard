import React from "react";
import ButtonAppBar from "../Components/Header/Header";
import TableProducts from "../Components/Tabela/tabela";

/**
 * Componente principal da página de Home. Exibe o cabeçalho com o título da página e a tabela de produtos.
 * A página permite ao usuário escolher um produto e a quantidade para registrar uma venda.
 * 
 * @component
 * @example
 * return (
 *   <Home />
 * )
 */
export default function Home() {
  return (
    <div>
      {/* Cabeçalho da aplicação */}
      <ButtonAppBar />
      
      {/* Títulos explicativos */}
      <h1> Registro de Vendas</h1>
      <h3> Escolha o produto e sua quantidade e registre sua venda</h3>
      
      {/* Tabela de produtos para o registro de vendas */}
      <TableProducts />
    </div>
  );
}
