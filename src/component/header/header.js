import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TemporaryDrawer from '../drawer/drawer.jsx';

export default function HeaderComponent({ signOut, userName, isAdmin }) {
  return (
    <Box sx={{ flexGrow: 1, top: 0, position: 'sticky', width: '100%' }}>
      <AppBar position="sticky">
        <Toolbar>
          <TemporaryDrawer isAdmin={isAdmin}/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {userName}
          </Typography>
          <Button  color="inherit" onClick={signOut}>Sign Out</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}