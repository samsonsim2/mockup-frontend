import { Box, Button } from '@mui/material';
import React, { useRef, useEffect, useState } from 'react';
import ImageCropDialog from './ImageCropDialog';
import { useAppContext } from '../../context/appContext';
 
 
function ImageCanvas() {

  const {imagesArray,onCancel,
    setCroppedImageFor,
    resetImage,stock,setStock,selectedStock,setSelectedStock,filterValues,stockImage,stockImages} = useAppContext()

  
    
  const divRef = useRef(null);
     
   
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    const image = new Image();
    image.src = stock.croppedImageUrl?stock.croppedImageUrl: stock.imageUrl;
    image.onload = () => {
        let loadedImageWidth = image.width;
        let loadedImageHeight = image.height;
        let scaleFactor = Math.max(250/ image.width, 500 / image.height);
        let newWidth = image.width * scaleFactor;
        let newHeight = image.height * scaleFactor;
        let x = (250 / 2) - (newWidth / 2);
        let y = (500 / 2) - (newHeight / 2);
        
        ctx.drawImage(image, x, y, newWidth, newHeight);
        
    };
    image.crossOrigin = "Anonymous";
    
    
    ctx.globalAlpha = 1;
    
    ctx.filter = `brightness(${filterValues.brightness}) saturate(${filterValues.saturation}) contrast(${filterValues.contrast})`
   

  }, [stock.croppedImageUrl,filterValues,stock,imagesArray]);


   

   

  return (<>

    <Box     width="250px" height="500px"   sx={{  postion:"absolute" ,background:"none",borderRadius:"20px"   }}  ref={divRef}>
      {selectedStock? <ImageCropDialog 
       
      imageUrl={selectedStock.imageUrl} 
      cropInit={selectedStock.crop}
      zoomInit={selectedStock.zoom}
      aspectInit={selectedStock.aspect}
      onCancel={onCancel}
      setCroppedImageFor={setCroppedImageFor}
      resetImage={resetImage}
      />:null}
      </Box>

  
    <canvas style ={{ zIndex:"50",position:"absolute",borderRadius:"60px" }} ref={canvasRef} width={240} height={490} />
    <Button>dsa</Button>
    {/* <Button sx={{zIndex:"100000",position:"absolute"}}onClick={()=>setSelectedStock(stock)}>Crop</Button> */}
    
    
    </>
    
  );
}
export default ImageCanvas
