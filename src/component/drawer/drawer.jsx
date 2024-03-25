import React from 'react';
import { useSelector } from "react-redux";
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
import { Group } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';

export default function TemporaryDrawer({userName}) {
  let Role = useSelector((state) => state.UserRoleReducer.Role);
  const [open, setOpen] = React.useState(false);
  let isAdmin = Role == "admin";

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  

  let AdminListItem = () =>{
    return(
      <ListItem key="patients" disablePadding>
      <ListItemButton component={NavLink} to={'/patients'}>
        <ListItemIcon>
          <Group/>
        </ListItemIcon>
        <ListItemText primary="All Patients" />
      </ListItemButton>
    </ListItem> 
    )
  }

  let UserListItem = () =>{
    return (
      <ListItem key="userForm" disablePadding>
      <ListItemButton component={NavLink} to={'/userForm'}>
        <ListItemIcon>
          <FormatListBulletedIcon/>
        </ListItemIcon>
        <ListItemText primary="User Profile" />
      </ListItemButton>
    </ListItem> 
    )
  }

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
          {isAdmin ? <AdminListItem/> :<UserListItem/>}
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