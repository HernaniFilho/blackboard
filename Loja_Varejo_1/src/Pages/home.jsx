import React from "react";
import ButtonAppBar from "../Components/Header/Header";
import TableProducts from "../Components/Tabela/tabela";

export default function Home(){
    return(
        <div>
            <ButtonAppBar />
            <h1> Registro de Vendas</h1>
            <h3> Escolha o produto e sua quantidade e registre sua venda</h3>
            <TableProducts />
        </div>
    );
}