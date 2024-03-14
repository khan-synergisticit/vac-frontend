import React from 'react';
import { NavLink } from "react-router-dom";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Avatar from '@mui/material/Avatar';

export default function TemporaryDrawer({isAdmin, userName}) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  print("IS ADMIN" + isAdmin)
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        { /*['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))*/ }
     
        <ListItem key="userForm" disablePadding>
            <ListItemButton component={NavLink} to={'/home'}>
               <Avatar alt={userName} src="../pages/donkey.jpg" />
              <ListItemText primary={userName} style={{display:'flex', justifyContent:'center'}} />
            </ListItemButton>
          </ListItem>
      
      </List>
      <Divider />
      <List>
          <ListItem key="userForm" disablePadding>
            <ListItemButton component={NavLink} to={'/userForm'}>
              <ListItemIcon>
                <FormatListBulletedIcon/>
              </ListItemIcon>
              <ListItemText primary="User Profile" />
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          > <MenuIcon /></IconButton>
      
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}