import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton } from '@mui/material';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="static" 
        sx={{ 
          backgroundColor: 'red', 
          boxShadow: 3, 
          borderRadius: '10px', 
          margin: '0 16 16 px', // Espaçamento das bordas da tela
        }}
      >
        <Toolbar sx={{ padding: '0 16px' }}>
          {/* Título com ajuste de fonte */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', fontSize: '1.25rem' }}>
            Loja B, A melhor loja para comprar coisas que a Loja B vende
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
