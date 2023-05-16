import React from 'react'
import Dashboard from './Dashboard'
import NavBar from '../components/sharedComponents/Navbar'
import { Box, Button, Typography } from '@mui/material'
import { useAuth0 } from '@auth0/auth0-react'
import { useAppContext } from '../context/appContext'
import { useTheme } from '@emotion/react'
import { useMobileView } from '../components/utils';

const Landing = () => {
  const isMobile = useMobileView()
  const {
    loginWithRedirect, 
    logout,
    user,
    isAuthenticated,
    getAccessTokenSilently } = useAuth0();   
    const {open,setOpen}= useAppContext()

  const { currentUserId,setCurrentUserId } = useAppContext();
  const theme = useTheme();
 
  return (<>
     
   <Box width="100vw" height="100vh" sx={{backgroundColor:"White",display:'flex',flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
    <Box display="flex" justifyContent="center" width="80%"  >
    {isMobile? null:<img style={{width:"20%",marginRight:"5%"}}src="images/hero.png"></img>}

    <Box sx={{display:'flex',flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
    <Typography sx={{textAlign:"center" , marginBottom:0}} fontSize={isMobile?`4rem`:`7rem`}>Mockup</Typography>
    <Typography sx={{textAlign:"center"}}> Create beautiful mockups effortlessly with mockup</Typography>
    <Button sx={{marginTop:"40px"}} variant="contained"
    onClick={()=> {const user = loginWithRedirect( {
      authorizationParams: {
       redirect_uri: "http://localhost:3001/dashboard",
       }})           
    }}
    > Get Started</Button>
    </Box>
    </Box>
    
   
    

   </Box>
    </>
  )
}

export default Landing
