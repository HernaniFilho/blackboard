import React from "react";

/**
 * Componente de Boundary para capturar e tratar erros em componentes filhos.
 * Caso um erro seja encontrado, exibe uma mensagem de erro personalizada.
 *
 * @component
 * @example
 * return (
 *   <ErrorBoundary>
 *     <SomeComponent />
 *   </ErrorBoundary>
 * )
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    // Estado que indica se ocorreu um erro
    this.state = { hasError: false };
  }

  /**
   * Método estático que é chamado quando ocorre um erro.
   * Ele atualiza o estado para indicar que houve um erro.
   *
   * @param {Error} error - O erro que ocorreu.
   * @returns {Object} Novo estado indicando que houve um erro.
   */
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  /**
   * Método para capturar erros adicionais, além de alterar o estado.
   *
   * @param {Error} error - O erro que ocorreu.
   * @param {Object} errorInfo - Informações adicionais sobre o erro.
   */
  componentDidCatch(error, errorInfo) {
    console.error("Error in component:", error, errorInfo);
  }

  /**
   * Renderiza o conteúdo do componente. Se houver um erro, exibe uma mensagem de erro.
   * Caso contrário, renderiza os filhos do componente.
   *
   * @returns {JSX.Element} O componente renderizado, ou uma mensagem de erro.
   */
  render() {
    if (this.state.hasError) {
      return <h2>Algo deu errado! 🚨</h2>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
