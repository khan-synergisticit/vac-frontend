import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


export default function FooterComponent() {
  
  return (
    <Box sx={{ flexGrow: 1 , bottom: 0, position: 'fixed', width: '100%'}}>
      <AppBar position="static">
        <Toolbar>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}