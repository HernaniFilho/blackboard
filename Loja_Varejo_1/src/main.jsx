import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/home.jsx';

/**
 * Configura e renderiza a aplicação no DOM.
 * 
 * Este arquivo é o ponto de entrada para a aplicação, configurando o roteamento
 * usando o `createBrowserRouter` e o `RouterProvider` para permitir navegação entre as páginas.
 * A aplicação é renderizada dentro de um `StrictMode`, que ajuda a identificar problemas potenciais.
 * 
 * @returns {JSX.Element} A renderização do aplicativo na árvore DOM.
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
