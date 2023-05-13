import React, { useEffect } from 'react'
import { Box,Button,Grid, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
 
import axios from "axios";
import { BACKEND_URL } from '../constants';
import { useAppContext } from '../context/appContext';
 
const NavBar = () => {

  const { userId,setUserId } = useAppContext();

    const { loginWithRedirect, logout,user,isAuthenticated,getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
  

    useEffect(()=>{
        

        // After logging in, useEffect is called.
        // token is sent to back-end if the user is already created
        // else a new user is created 

        async function getToken(){
            if(isAuthenticated){
                const {email,given_name,family_name}=user
                console.log(email,given_name,family_name)
                const res = await axios.post(`${BACKEND_URL}/auth/register`, {                       
                    email:email,firstName:given_name,lastName:family_name }).then((res)=>{
                        console.log("hi")
                        console.log(res.data.id)
                        setUserId(res.data.id)
                       
                    })
              
            }
                 
        }   

        getToken()
        
       
       
    },[isAuthenticated,getAccessTokenSilently])
    const authenticate=async()=>{

        // if user is already logged in, button will log user out 

        if(isAuthenticated){
            logout({ logoutParams: { returnTo: window.location.origin } })
            setUserId("")
            console.log(isAuthenticated)

        // else button will log user in 

        }else{
            const user = loginWithRedirect( {
              authorizationParams: {
                redirect_uri: "http://localhost:3001/dashboard",
              }}
              )          
            
        }
        
    }
  return (
    <Box width="100%" height="40px" display="flex" justifyContent="center" alignItems="center">
    <Box width="80%" display="flex" justifyContent="space-between">
      <Typography variant="h3" >Mockup</Typography>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={() => authenticate ()}> {isAuthenticated?`Logout`:`Get started`} </Button>        
      </Stack>
      
    </Box>
  </Box>
  )
}

export default NavBar
