import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton } from '@mui/material';

/**
 * Componente `ButtonAppBar` que renderiza a barra de navegação da aplicação.
 * A barra de navegação exibe o nome da loja e possui uma estilização personalizada com MUI.
 * 
 * @returns {JSX.Element} - O JSX para a barra de navegação.
 */
export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="static" 
        sx={{ 
          backgroundColor: 'red', 
          boxShadow: 3, 
          borderRadius: '10px', 
          margin: '0 16 16 px',
        }}
      >
        <Toolbar sx={{ padding: '0 16px' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', fontSize: '1.25rem' }}>
            Loja B, A melhor loja para comprar coisas que a Loja B vende
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
