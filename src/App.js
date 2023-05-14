import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import ImageCropDialog from './components/ImageCropDialog';
import html2canvas from 'html2canvas';
import { Box, Button, Input, Stack, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
 import Canvas from './components/DrawingCanvas';
import   { useOnDraw } from './components/Hooks';
import Draggable from 'react-draggable'; // The default
import axios from 'axios';
import { useAppContext } from './context/appContext';
import { BACKEND_URL } from './constants';
import ImageCanvas from './components/ImageCanvas';
import MockupDetails from './components/MockupDetails';
import MockupPreview from './components/MockupPreview';
 
 // initial Image 
const initData = 
  {
    id:1,
    imageUrl:"images/car2.png",
    croppedImageUrl:null
  } 


function App() {
  const{selectedMockup,template,setTemplate,values,setValues,mockup,setMockup}= useAppContext() 

  
 

// Retrieve selected mockup from database

  useEffect(()=>{
    console.log("userffect triggered")
    async function getMockup(){      
      const res = await axios.post(`${BACKEND_URL}/mockup/edit`,{                       
          mockupId:selectedMockup}).then((res)=>{
              setMockup(res.data)
              setValues({...values,brandName:res.data.userName})
              console.log(res.data)          
         })
        }
        getMockup()
  },[selectedMockup]  )


  return (<>
  
  <Box width="100vw" height="100vh" overflow="auto"   display="flex" >
    
    <Box width="80%"   height="100%" margin="auto" display="flex" flexDirection="row"  justifyContent="space-between" sx={{border:2 ,borderColor:"black"}} >
   
    <MockupDetails/>
    <MockupPreview/>
    </Box>
     
  </Box>
    </>
  );
}

export default App;
const canvasStyle = {
  border: "1px solid black",
  background:"transparent",
   
}
