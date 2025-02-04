import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Home from "../Pages/home";

/**
 * Componente responsável por gerenciar as rotas da aplicação.
 * Utiliza o `BrowserRouter` para controlar as rotas e o `Route` para renderizar a página `Home` na rota principal.
 * 
 * @component
 * @example
 * return (
 *   <AppRouter />
 * )
 */
export const AppRouter = () => {
    return(
        <BrowserRouter>
            {/* Define a rota para a página inicial (Home) */}
            <Route component={Home} path="/" exact />
        </BrowserRouter>
    );
};
