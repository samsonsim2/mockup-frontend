import React, { useEffect, useState } from 'react'
import Cropper from 'react-easy-crop'
import getCroppedImg from '../cropImage'
import { Box, Button, Slider, Stack } from '@mui/material'
import { useAppContext } from '../context/appContext'
 
 

const ImageCropDialog = ({id,imageUrl,zoomInit,cropInit,aspectInit,onCancel,setCroppedImageFor,resetImage}) => {
   
    
  const {cropReset,setCropReset} =useAppContext()
    const aspectRatios =[
        {value:9/16, text:"4/3"}
    ]
    
    if (zoomInit === undefined ){
        zoomInit = 1
    }
    console.log(zoomInit)
    if (cropInit === undefined){
        cropInit = {x:0, y:0}
    }
    if (aspectInit ===  undefined){
        aspectInit = aspectRatios[0]
    }
    

     
     
    const [zoom,setZoom] = useState(zoomInit)
    const [crop,setCrop] = useState(cropInit)
    const [ aspect,setAspect] = useState(aspectInit)
    const [ croppedAreaPixels,setCroppedAreaPixels] = useState(null)
    
   
  
    const onZoomChange =(zoom)=>{
        setZoom(zoom)
    }

   

    const onResetImage =()=>{
        resetImage(id)
    }       

    const onCropChange =(crop)=>{
        setCrop(crop)       
    }

    const onCropComplete=(croppedArea, croppedAreaPixels)=>{
        setCroppedAreaPixels(croppedAreaPixels)        
    }

    const onCrop = async()=>{
        const croppedImageUrl = await getCroppedImg(imageUrl,croppedAreaPixels)
        setCroppedImageFor (crop,zoom,aspect,croppedImageUrl)
    }

    const resetZoom=()=>{
        if(cropReset===true){
            setZoom(1)
            setCropReset(false)

        }
        
    }

    useEffect(()=>{
       resetZoom()
    },[cropReset])
  
    return (

    <div>
      <Box width="100vh" height="100%"  sx={{zIndex:"1000" }}>
      <Box position="fixed"   top="0" left="0" right="0" bottom="80px"  sx={{backgroundColor:"black" ,zIndex:"1000"}}
  
  >
        <Cropper image={imageUrl} aspect={aspect.value} zoom={zoom} crop={crop} onCropChange={onCropChange}
        onZoomChange={onZoomChange}
        onCropComplete={onCropComplete}/>
      </Box>
      

        <Box  position="fixed" bottom= "0px"  left="0px" display="flex" justifyContent="center" width="100%"  height="80px" pointerEvents="auto"
            sx={{backgroundColor:"black",zIndex:"1000"}}
 >
        <Box margin="auto" width="80%"   display="flex" flexDirection="column" sx={{border:2,borderColor:"black"}}>
             <Slider  min={1} max={3} step={0.1}  value={zoom} onChange={(e)=>{onZoomChange(e.target.value)}} />
             
        <Stack direction="row"  spacing="20px" display="flex" justifyContent="center" >
            <Button variant="contained" onClick={onCancel}>cancel</Button>
            <Button variant="contained" onClick={onResetImage}>reset</Button>
            <Button variant="contained"  onClick={onCrop}>crop</Button>
        </Stack>
        </Box>

         
      </Box>
      </Box>
    </div>
  )
}

export default ImageCropDialog
