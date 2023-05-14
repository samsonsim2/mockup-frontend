import { Box, Button } from '@mui/material';
import React, { useRef, useEffect, useState } from 'react';
import ImageCropDialog from './ImageCropDialog';
 
const initData = 
  {
    id:1,
    imageUrl:"images/car1.png",
    croppedImageUrl:null
  } 

function ImageCanvas() {
  
    const [cars,setCars] =useState(initData)
    const [selectedCar,setSelectedCar] = useState(null)    
  const divRef = useRef(null);
     
   
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    const image = new Image();
    image.src = cars.croppedImageUrl?cars.croppedImageUrl: cars.imageUrl;
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
    
    
    ctx.globalAlpha = 1;
    
    ctx.filter = "sepia(1)"

  }, [cars.croppedImageUrl]);

  const onCancel =()=>{
    setSelectedCar(null)
        
  }

  const  setCroppedImageFor =(id,crop,zoom,aspect,croppedImageUrl)=>{ 
     
    const newCar = {...cars, croppedImageUrl,crop,zoom,aspect}
    console.log(newCar)
    setCars(newCar)
    setSelectedCar(null)  
  }

  const resetImage = (id)=>{
    setCroppedImageFor(id)
  }
  

  return (<>

    <Box   margin="auto" width="250px" height="500px" position="relative" sx={{display:"flex" ,justifyContent:"center" ,alignItems:"center", background:"none"}}  ref={divRef}>
      {selectedCar? <ImageCropDialog 
      id={selectedCar.id} 
      imageUrl={selectedCar.imageUrl} 
      cropInit={selectedCar.crop}
      zoomInit={selectedCar.zoom}
      aspectInit={selectedCar.aspect}
      onCancel={onCancel}
      setCroppedImageFor={setCroppedImageFor}
      resetImage={resetImage}
      />:null}
      </Box>

  
    <canvas style ={{ zIndex:"50",position:"absolute" }} ref={canvasRef} width={250} height={500} />
    <Button>dsa</Button>
    <Button sx={{zIndex:"100000",position:"absolute"}}onClick={()=>setSelectedCar(cars)}>Crop</Button>
    </>
    
  );
}
export default ImageCanvas
