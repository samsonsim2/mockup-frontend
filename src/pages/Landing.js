import React, { useEffect, useRef } from 'react'
import Dashboard from './Dashboard'
import NavBar from '../components/sharedComponents/Navbar'
import { Box, Button, Typography } from '@mui/material'
import { useAuth0 } from '@auth0/auth0-react'
import { useAppContext } from '../context/appContext'
import { useTheme } from '@emotion/react'
import { useMobileView } from '../components/utils';
 
 
import gsap from 'gsap'
const Landing = () => {

   

  const elementRefs = useRef([]);

  useEffect(() => {
    const elements = elementRefs.current;

    gsap.from(elements, {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: 'power2.out',
      stagger: 0.2, // Time delay between each element's animation
    });
  }, []);

  
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
    {isMobile? null:<img  ref={el => (elementRefs.current[0] = el)} style={{width:"20%",marginRight:"5%"}} src="images/HeroGif.gif"></img>}

    <Box sx={{display:'flex',flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
    <Typography ref={el => (elementRefs.current[1] = el)} sx={{textAlign:"center" , marginBottom:0}} fontSize={isMobile?`4rem`:`7rem`}>Mockup</Typography>
    <Typography ref={el => (elementRefs.current[2] = el)}sx={{textAlign:"center"}}> Create beautiful mockups effortlessly with mockup</Typography>
    <Button  ref={el => (elementRefs.current[3] = el)} sx={{marginTop:"40px"}} variant="contained"
    onClick={()=> {const user = loginWithRedirect( {
      authorizationParams: {
       redirect_uri: "https://mockup-frontend-theta.vercel.app/dashboard",
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
