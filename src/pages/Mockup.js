import logo from '../logo.svg';
import '../App.css';
import { useEffect, useRef, useState } from 'react';
import ImageCropDialog from '../components/ImageCropDialog';
import html2canvas from 'html2canvas';
import { Box, Button, Input, Stack, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
 import Canvas from '../components/DrawingCanvas';
import   { useOnDraw } from '../components/Hooks';
import Draggable from 'react-draggable'; // The default
import axios from 'axios';
import { useAppContext } from '../context/appContext';
import { BACKEND_URL } from '../constants';
import ImageCanvas from '../components/ImageCanvas';
import MockupDetails from '../components/MockupDetails';
import MockupPreview from '../components/MockupPreview';
 import NavBar from '../components/sharedComponents/Navbar'
 
 // initial Image 
const initData = 
  {
    id:1,
    imageUrl:"images/car2.png",
    croppedImageUrl:null
  } 

 


function Mockup() {

  
  const{testArray,setTestArray,selectedMockup,template,setTemplate,values,setValues,mockup,setMockup,imagesArray,setImagesArray}= useAppContext() 


 

// Retrieve selected mockup from database

  useEffect(()=>{
    
    async function getMockup(){      
      const res = await axios.get(`${BACKEND_URL}/mockup/edit/${selectedMockup}` ).then((res)=>{
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
 
              const assets = axios.post(`${BACKEND_URL}/mockup/getAsset`,{                       
                mockupId:res.data.id}) .then((assets)=>{
                  console.log(assets)
                  setTestArray(assets.data)
                   
                })
              
              // setImagesArray({...imagesArray,assets})
              
                
         })
        }
        getMockup()

        
  },[selectedMockup]  )


  return (<>
      <NavBar/>
  
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
