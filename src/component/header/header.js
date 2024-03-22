import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TemporaryDrawer from '../drawer/drawer.jsx';
import { useDispatch } from 'react-redux';
import { AddUserToStore } from '../../state/user/userAction.js';
import { Link, Navigate } from 'react-router-dom';

export default function HeaderComponent({ signOut, userName }) {
  
  let dispatch = useDispatch();

  let handleSignout = ()=>{
    let emptyUser =  {
      userID : "",
      userName: "",
      role: ""
    }
    dispatch(AddUserToStore(emptyUser));
    signOut();
    window.localStorage.clear();
    return(
      <Link to="/home"/>
    )
  }

  return (
    <Box sx={{ flexGrow: 1, top: 0, position: 'sticky', width: '100%' }}>
      <AppBar position="sticky">
        <Toolbar>
          <TemporaryDrawer userName={userName}/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {userName}
          </Typography>
          <Button  color="inherit" onClick={handleSignout}>Sign Out</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}