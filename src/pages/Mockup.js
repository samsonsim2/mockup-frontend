import logo from '../logo.svg';
import '../App.css';
import { useEffect, useRef, useState } from 'react';
 
import html2canvas from 'html2canvas';
import { Box, Button, Input, Stack, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
 import Canvas from '../components/mockupComponents/DrawingCanvas';
import   { useOnDraw } from '../components//mockupComponents/Hooks';
import Draggable from 'react-draggable'; // The default
import axios from 'axios';
import { useAppContext } from '../context/appContext';
import { BACKEND_URL } from '../constants';
import ImageCanvas from '../components//mockupComponents/ImageCanvas';
import MockupDetails from '../components/mockupComponents/MockupDetails';
import MockupPreview from '../components/mockupComponents/MockupPreview';
 import NavBar from '../components/sharedComponents/Navbar'
 import MuiAppBar from '@mui/material/AppBar';
 import { styled, useTheme } from '@mui/material/styles';
import ImageCropDialog from '../components/mockupComponents/ImageCropDialog';
 const drawerWidth = 240;
 const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
 // initial Image 
const initData = 
  {
    id:1,
    imageUrl:"images/car2.png",
    croppedImageUrl:null
  } 

 


function Mockup() {

  
  const{accessToken,testArray,setAssetArray,selectedMockup,template,setTemplate,values,setValues,mockup,setMockup,imagesArray,setImagesArray}= useAppContext() 


 

// Retrieve selected mockup from database

  useEffect(()=>{
    

    async function getMockup(){      
      const res = await axios.get(`${BACKEND_URL}/mockup/edit/${selectedMockup}`  , {headers: {
        Authorization: `Bearer ${accessToken}`,
      }}).then((res)=>{
              setMockup(res.data)
               console.log(res.data)
              setValues({...values,
                cta:res.data?.Feeds[0]?.cta,
                reelsCta:res.data?.Reels[0]?.cta,
                reelsCaption:res.data?.Reels[0]?.caption,
                location:res.data?.Stories[0]?.location,
                addYours:res.data?.Stories[0]?.tag,
                storiesCta:res.data?.Stories[0]?.cta,
                caption:res.data.Feeds[0]?.caption,
                filterName:res.data.Filters[0]?.filterName,
                iconUrl:res.data.Filters[0]?.iconUrl,
                brandName:res.data.userName,
                mockupId:res.data.id,
                profileUrl:res.data.imageUrl})
 
              const assets = axios.get(`${BACKEND_URL}/mockup/asset/${selectedMockup}`, {headers: {
                Authorization: `Bearer ${accessToken}`,
              }}) .then((assets)=>{
                  console.log(assets)
                  setAssetArray(assets.data)
                   
                })
              
              // setImagesArray({...imagesArray,assets})
              
                
         })
        }
        getMockup()

        
  },[selectedMockup]  )


  return (<>
   
  <AppBar>
    <NavBar/>
  </AppBar>
  
      
  
  <Box width="100%" height="100%"   display="flex" sx={{  background: `#E7EBF0`,p:"80px"}} >

    <Box width="80%"   borderRadius="20px" height="fit-content" margin="  auto" display="flex" flexDirection="row"  justifyContent="space-between"   boxShadow= '1'   >
   
    <MockupDetails/>
    <MockupPreview/>
    </Box>
     
  </Box>
    </>
  );
}

export default Mockup;
const canvasStyle = {
  border: "1px solid black",
  background:"transparent",
   
}
