import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import ImageCropDialog from './components/ImageCropDialog';
import html2canvas from 'html2canvas';
import { Box, Button, Input, Stack, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
 import Canvas from './components/Canvas';
import   { useOnDraw } from './components/Hooks';
import Draggable from 'react-draggable'; // The default
import axios from 'axios';
import { useAppContext } from './context/appContext';
import { BACKEND_URL } from './constants';
 
 
const initData = 
  {
    id:1,
    imageUrl:"images/blockboy.gif",
    croppedImageUrl:null
  } 





function App() {
  const{selectedMockup}= useAppContext()
  const [isDrawing,setIsDrawing] = useState(false)
  const [mockup,setMockup] = useState()

  

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


  const initDetails={
    cta:"Learn more",
    message:"lorem ipsum dolor",
    brandName:"",
    storiesCta:"Learn moree"
  
  }
//   const {
//     setCanvasRef,
//     onCanvasMouseDown,
    
//     clearCanvas         
// } = useOnDraw(onDraw);

// function onDraw(ctx, point, prevPoint) {
//     drawLine(prevPoint, point, ctx, '#000000', 5);
// }

// function drawLine(
//     start,
//     end,
//     ctx,
//     color,
//     width
// ) {

//     start = start ?? end;
//     ctx.beginPath();
//     ctx.lineWidth = width;
//     ctx.strokeStyle = color;
//     ctx.moveTo(start.x, start.y);
//     ctx.lineTo(end.x, end.y);
//     ctx.stroke();

//     ctx.fillStyle = color;
//     ctx.beginPath();
//     ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
//     ctx.fill();

// }

 

   
 

  const divRef = useRef(null);

  const [cars,setCars] =useState(initData)
  const [template,setTemplate]=useState("images/feed.png")
  const [selectedCar,setSelectedCar] = useState(null)
  

  const [values,setValues] = useState(initDetails)
  console.log(cars)
 
 

  const handleChange=(e)=>{
    console.log(e.target.value)
   setValues({...values,[e.target.name]:e.target.value})
  }

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

  const downloadImage = () => {
    console.log("test")
    html2canvas(divRef.current,{backgroundColor:null})
      .then(canvas => {
        const link = document.createElement('a');
        link.download = 'my-div-image.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
  };
  return (<>

  <Box width="100vw" height="100vh" overflow="auto"   display="flex" >
    <Box width="80%"   height="100%" margin="auto" display="flex" flexDirection="row"  justifyContent="space-between" sx={{border:2 ,borderColor:"black"}} >

    
    <Box  width="100%"   backgroundColor="white"  padding="20px" >
    <Stack direction="row" spacing="20px" marginBottom="20px">
      <Button variant="contained"  onClick={()=>setTemplate("images/feed.png")}>Feed</Button>
      <Button variant="contained" onClick={()=>setTemplate("images/story.png")}>Story</Button>
      <Button variant="contained">Reels</Button>
    </Stack>
    <Stack direction="column" spacing="20px">
    <Typography>Ad Details</Typography>
    <TextField  id="outlined-basic" label="Brand username" variant="outlined" name="brandName" value={values.brandName} onChange={handleChange}/>
    {template==="images/feed.png" ?
    <TextField id="outlined-basic" label="Message" variant="outlined"  name="message" value={values.message} onChange={handleChange} 
    />   : null}
    <TextField id="outlined-basic" label="Call to action"  name="cta" value={values.cta} onChange={handleChange} variant="outlined" />
    </Stack>
  

    </Box>

    <Box display="flex" flexDirection="column" justifyContent="center" padding="40px" sx={{minWidth:"320px" ,background:"#f5f5f5" }} >

    <Box display="flex" justifyContent="center">
    <Typography sx={{marginBottom:"20px"}}>Mockup preview </Typography>
    </Box>
 
    <Box sx={{position:'absolute', zIndex:"1000", right:"0"}}>
      <Stack direction="column">
     
      <Button onClick={()=>setSelectedCar(cars)}>Crop</Button>
      {/* <Button onClick={()=>clearCanvas(250,500)}>Clear</Button> */}
      </Stack>
  
    </Box>
    
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

    {/*PHONE FRAME*/}
    
    <Box sx={{zIndex:"1000",position:'absolute' }}>
      <Canvas width={250} height={500}>      
      </Canvas>  
      <Draggable bounds="parent" defaultPosition={{x:250/2-25,y:-500/2 -50}} >
  <Box sx={{zIndex:"1000000",position:"absolute"}}>
    <img  style={{width:"50px"}} src="images/frame.png" /></Box>
</Draggable>
    
        
    </Box>

    {/*DP*/}
    <Box sx={{zIndex:"1000",position:'absolute' ,top:"110px",left:"20px" }}>
      <img style={{objectFit:"cover", width:"30px",height:"30px",borderRadius:"50%", }}src={mockup?.imageUrl}></img>
    </Box>
  
  
    <Box   component="img"  
    sx={{ zIndex:"100", pointerEvents:"none", width:"100%",height:"100%",position:"absolute" , top:"0", left:"0", borderRadius:"20px", borderColor:"red"}}
    src="images/frame.png" >      
    </Box>   

    {template==="images/story.png"  ?  <Box   
    sx={{ zIndex:"95", pointerEvents:"none",position:"absolute" , top:"11.5%", left:"21.5%", borderRadius:"20px", borderColor:"red"}}
     >      
     <Typography  sx={{color:"white",fontSize:"8px"}}>{values.brandName} 14h</Typography>
    </Box>     : null }
  

    


    {template==="images/feed.png"  ?  <Box   
    sx={{ zIndex:"95", pointerEvents:"none",position:"absolute" , top:"23.5%", left:"21.5%", borderRadius:"20px", borderColor:"red"}}
     >      
     <Typography  sx={{color:"black",fontSize:"8px"}}>{values.brandName}</Typography>
    </Box>     : null }
  

    {template==="images/feed.png"  ?<Box   
    sx={{ zIndex:"95", pointerEvents:"none",position:"absolute" , bottom:"29.5%", left:"10%", borderRadius:"20px", borderColor:"red"}}
     >      
     <Typography  sx={{color:"white",fontSize:"10px"}}>{values.cta}</Typography>
    </Box>     : null }


    {template==="images/story.png"  ?<Box   
    sx={{ zIndex:"95", background:"grey" , pointerEvents:"none",position:"absolute" , bottom:"4%" , borderRadius:"20px",paddingLeft:"10px",paddingRight:"10px" ,paddingTop:"4px",paddingBottom:"4px" ,borderColor:"red"}}
     >      
     <Typography  sx={{color:"white",fontSize:"10px"}}>{values.cta}</Typography>
    </Box>     : null }


    {template==="images/feed.png"  ? <Box   
    sx={{ zIndex:"95", pointerEvents:"none",position:"absolute" , bottom:"18%",  width:"250px"  ,paddingLeft:"30px",paddingRight:"30px"  ,borderColor:"red"}}
     >      
       <Box sx={{ display: "flex", alignItems:"left", gap: "2px" }}>
        <Typography variant="title" fontSize="10px"  noWrap>
          {values.brandName}
        </Typography>
        <Typography variant="body 2" fontSize="10px" noWrap>
        {values.message}
        </Typography>
      </Box>
      
     {/* <Typography   sx={{color:"black",fontSize:"10px" }}>{values.brandName} {values.message} </Typography> */}
       
       
    </Box>     : null } 
    
    
    {/*SELECTED TEMPLATE */}
    <Box   component="img"  
    sx={{  zIndex:"90", pointerEvents:"none", width:"100%",height:"100%",position:"absolute" , top:"0", left:"0", borderRadius:"20px", borderColor:"red"}}
    src={template} >      
    </Box>     

  
    {/*SELECTED IMAGE*/}
 
     <Box   
    sx={{  zIndex:"50", pointerEvents:"auto",  width:"95%",height:"95%",position:"absolute",overflow:"hidden", display: "flex",justifyContent:"center", alignItems:"center"
    ,borderRadius:"20px", borderColor:"red"}}    
        
    >  
       <img style={{height:"100%"}} src={cars.croppedImageUrl?cars.croppedImageUrl: cars.imageUrl}></img>
    </Box>   
    </Box>

    <Box display="flex" justifyContent="center" sx={{zIndex:"1"}}>
    <Button variant="contained" sx={{  marginTop:"20px", width:"100px",padding:"10px"}}  onClick={downloadImage}>Export</Button>
    </Box>


    
   
     
      
    </Box>
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
