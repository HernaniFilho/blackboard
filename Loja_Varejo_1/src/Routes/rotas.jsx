import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Home from "../Pages/home";

export const AppRouter = () => {
    return(
        <BrowserRouter>
                <Route component = { Home }  path="/" exact />
        </BrowserRouter>
    )
}