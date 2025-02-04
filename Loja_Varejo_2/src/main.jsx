import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/home.jsx';

/**
 * Configuração e inicialização do roteamento no React utilizando o `react-router-dom`.
 * 
 * Esse código cria e configura as rotas para o aplicativo, onde a página principal é exibida
 * no caminho `/`. Utiliza a `createBrowserRouter` para definir as rotas e o `RouterProvider` 
 * para fornecer a funcionalidade de roteamento para o aplicativo.
 * 
 * O componente `StrictMode` é utilizado para identificar possíveis problemas de renderização e 
 * melhorias no desempenho durante o desenvolvimento.
 * 
 * @returns {JSX.Element} - A estrutura de roteamento que envolve o aplicativo.
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
