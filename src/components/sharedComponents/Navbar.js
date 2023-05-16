import React, { useEffect } from 'react'
import { AppBar, Box,Button,Grid, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react"; 
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import axios from "axios";
import { BACKEND_URL } from '../../constants';
import { useAppContext } from '../../context/appContext';
import { styled, useTheme } from '@mui/material/styles';
 
const NavBar = () => {
  const {
    loginWithRedirect, 
    logout,
    user,
    isAuthenticated,
    getAccessTokenSilently } = useAuth0();   
    const {open,setOpen}= useAppContext()

  const { currentUserId,setCurrentUserId } = useAppContext();
  const theme = useTheme();
 

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  return (
    
    <Box width="100%" height="40px" display="flex" justifyContent="center" alignItems="center">
     <Box width="90%" display="flex" justifyContent="space-between">
     <Stack direction="row" spacing={0.5}> 
     <IconButton
      color="inherit"
      aria-label="open drawer"
      onClick={handleDrawerOpen}
      edge="start"
      sx={{ mr: 2, ...(open && { display: 'none' }) }}
    >
      <MenuIcon />
    </IconButton>
    <Typography  alignSelf="center" variant="h6" noWrap component="div" >
      Mockup
    </Typography>
    </Stack>
   
    <Button variant="contained" onClick={() => {
      logout({ logoutParams: {returnTo: window.location.origin } })
      setCurrentUserId("")}}
    >  Logout  </Button>  
    </Box>
  </Box>
 

  )
}

export default NavBar
 