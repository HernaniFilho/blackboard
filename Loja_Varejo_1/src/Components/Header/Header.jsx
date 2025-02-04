import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

/**
 * Componente de barra de navegação superior (AppBar) para a Loja A.
 * Exibe o nome da loja e uma descrição curta.
 * 
 * @componente
 * @exemplo
 * return <ButtonAppBar />;
 */
export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Loja A, A melhor loja para comprar coisas que a Loja A vende 
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
