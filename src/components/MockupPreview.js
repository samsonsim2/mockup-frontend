import { AppBar, Box, Button, ButtonGroup, Stack, Switch, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import DrawingCanvas from './DrawingCanvas'
import ImageCanvas from './ImageCanvas'
import Draggable from 'react-draggable'
import { useAppContext } from '../context/appContext'
import html2canvas from 'html2canvas'
import {useOnDraw} from './Hooks';
import axios from 'axios'
import { BACKEND_URL } from '../constants'
import CropIcon from '@mui/icons-material/Crop';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import DrawIcon from '@mui/icons-material/Draw';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import LocationOnIcon from '@mui/icons-material/LocationOn';
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";      

import { ColorPicker } from 'primereact/colorpicker';
              
 
const MockupPreview = () => {
const{profilePic,safeZone,addYoursSticker, setSelectedStock,stock, locationSticker,setIsDrawing,isDrawing,selectedMockup,template,setTemplate,values,setValues,mockup,setMockup}= useAppContext() 
const [color,setColor] = useState("#000000")

const divRef = useRef(null); 

const {
      setCanvasRef,
      onCanvasMouseDown,
      clearCanvas  ,   
      canvasRef    
  } = useOnDraw();

  

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    const image = new Image();
    
    
    
    ctx.globalAlpha = 1;
    
    ctx.filter = "sepia(0.8)"

  }, []);

 


function onDraw(ctx, point, prevPoint) {
    drawLine(prevPoint, point, ctx, '#000000', 5);
}

function drawLine(
    start,
    end,
    ctx,
    color,
    width
) {

    start = start ?? end;
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
    ctx.fill();
    

}

    
// START OF FUNCTIONS ---------------------

// Handle form changes
  const handleChange=(e)=>{
    console.log(e.target.value)
   setValues({...values,[e.target.name]:e.target.value})
  }
 
  

// Download image 
  const downloadImage = () => {
    
    console.log("test")
    html2canvas(divRef.current,{useCORS: true,
      allowTaint: true,backgroundColor:null})
    
      .then(canvas => {
        const link = document.createElement('a');
        link.download = 'my-div-image.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
  };

  // END OF FUNCTIONS ---------------------
    
  return (<>

 
    
    <Box display="flex" flexDirection="column" justifyContent="center" padding="40px" sx={{ minWidth:"320px" , transition:"0.2s",background: isDrawing?"#81c784":"#f5f5f5"  ,spacing:"0",borderTopRightRadius:"20px",borderBottomRightRadius:"20px"}} >
    
   
    <Box display="flex" flexDirection="column" justifyContent="center"  >
    <Typography   sx={{ mb:0, fontSize:"30px",zIndex:"1000",textAlign:"center"}}>Mockup preview </Typography>
    <Typography sx={{fontStyle:"italic", fontSize:"10px",marginBottom:"20px",zIndex:"1000",textAlign:"center"}}>{isDrawing?`*Drawing mode is on, turn off to move sticker`:null}</Typography>
    </Box>    
    
    <Box   margin="auto" width="250px" height="500px" position="relative" sx={{display:"flex" ,justifyContent:"center" ,alignItems:"center",   mb:"20px"}}  ref={divRef}>
      
    {/* DRAWING + STICKER CANVASES ZINDEX= 200*/}

    {/* STICKER */}
    
   <Box   width={250} height={500} position="absolute" zIndex={200} sx={{pointerEvents:"none"}}>
   
     </Box>
    

    <Box  width={250} height={500} sx={{zIndex:"200",position:'absolute' , top:"0", left:"0"}}>
    
     {/* Sticker*/} 
     {locationSticker && template==="images/story.png" ?<Draggable bounds="parent" defaultPosition={{x:250/2-25,y:500/2 -50}} >
                <Box sx={{ maxWidth:"150px",display:"flex", justifyContent:"center" ,flexDirection:"row",position:"absolute",backgroundColor:"white",paddingLeft:"10px",paddingRight:"10px", paddingTop:"5px",paddingBottom:"5px",borderRadius:"5px"}}>
                     <LocationOnIcon sx={{color:"purple"  }}/><Typography sx={{color:"blue" }}>{values.location}</Typography>
                </Box>
        </Draggable>:null}   

        {addYoursSticker&& template==="images/story.png" ?<Draggable bounds="parent" defaultPosition={{x:250/2-25,y:500/2 -50}} >
                <Box sx={{ position:"absolute",backgroundColor:"white",p:"5px",borderRadius:"5px"}}>
                    <Typography>{values.addYours}</Typography>
                </Box>
        </Draggable>:null}   
        
        {/* DRAWING CANVAS*/}
        <DrawingCanvas width={250} height={500} color={color} >      
        </DrawingCanvas>  

        
        
        
    </Box>

    {/*IMAGE CANVAS ZINDEX= 50*/}
    <ImageCanvas/>
    

    
    {/*PHONE FRAME   ZINDEX= 100 */}   
    <Box   component="img"  
    sx={{ position:"absolute", zIndex:"100", pointerEvents:"none", width:"250px",height:"500px" , borderRadius:"20px", borderColor:"red"}}
    src="images/frame.png" >      
    </Box> 

    {/*SELECTED TEMPLATE ZINDEX= 90*/}
    <Box component="img"  
    sx={{  zIndex:"90", pointerEvents:"none", width:"100%",height:"100%",position:"absolute" , top:"0", left:"0", Radius:"20px", borderColor:"red"}}
    src={template} >      
    </Box>     

     {/*Safe TEMPLATE ZINDEX= 90*/}

    {safeZone?  <Box component="img"  
    sx={{ transition:'0.2s', zIndex:"85", pointerEvents:"none", width:"100%",height:"100%",position:"absolute" , top:"0", left:"0", Radius:"20px", borderColor:"red"}}
    src="/images/safezone.png" >      
    </Box> : null 
    }    


  


    {/*IG STORY ELEMENTS */}  

    {template==="images/story.png"  ?  <Box   
    sx={{ zIndex:"95", pointerEvents:"none",position:"absolute" , top:"13.5%", left:"25.7%", borderRadius:"20px", borderColor:"red"}}
     >      
     <Typography  sx={{color:"white",fontSize:"8px",textTransform:"capitalize",fontWeight:"bold"}}>{values.brandName?   values.brandName: "Test" }&nbsp;&nbsp;&nbsp;
     <Typography sx={{color:"white",fontSize:"8px",textTransform:"capitalize",fontWeight:"narrow", display:"inline"}}>14h</Typography></Typography>
    </Box>     : null }
  
     
 {/*DP1 ZINDEX= 95 */}
    {template==="images/story.png"  ?
    <Box sx={{zIndex:"95",position:'absolute' ,top:"60px",left:"30px" }}>
      <img style={{objectFit:"cover", width:"25px",height:"25px",borderRadius:"50%", }}src={profilePic?profilePic:mockup?.imageUrl}></img>
    </Box>  : null }

    {template==="images/story.png"  ?<Box   border
    sx={{ zIndex:"95", background:"grey" , pointerEvents:"none",position:"absolute" , bottom:"4.5%" , borderRadius:"20px",paddingLeft:"10px",paddingRight:"10px" ,paddingTop:"4px",paddingBottom:"4px" ,borderColor:"red"}}
     >      
     <Typography  sx={{color:"white",fontSize:"10px"}}>{values.cta}</Typography>
    </Box>     : null }

    
    {/*IG FEED ELEMENTS */}    

    
    {/*DP1 ZINDEX= 110 */}
    {template==="images/feed.png"  ?
    <Box sx={{zIndex:"110",position:'absolute' ,top:"122px",left:"22px" }}>
      <img style={{objectFit:"cover", width:"25px",height:"25px",borderRadius:"50%", }}src={profilePic?profilePic:mockup?.imageUrl}></img>
    </Box>  : null }
       {/*DP2 ZINDEX= 110 */}
       {template==="images/feed.png"  ?
       <Box sx={{zIndex:"110",position:'absolute' ,top:"71px",left:"29px" }}>
      <img style={{objectFit:"cover", width:"30px",height:"30px",borderRadius:"50%", }}src={profilePic?profilePic:mockup?.imageUrl}></img>
    </Box>  : null }




    {template==="images/feed.png"  ?  <Box   
    sx={{ zIndex:"95", pointerEvents:"none",position:"absolute" , top:"24.5%", left:"20.7%", borderRadius:"20px", borderColor:"red"}}
     >      
     <Typography  sx={{color:"black",fontSize:"8px",textTransform:"capitalize",fontWeight:"bold"}}>{values.brandName?   values.brandName: "Test" }</Typography>
    </Box>     : null }
  

    {template==="images/feed.png"  ?<Box   
    sx={{ zIndex:"95", pointerEvents:"none",position:"absolute" , bottom:"27%", left:"10%", borderRadius:"20px", borderColor:"red"}}
     >      
     <Typography  sx={{color:"white",fontSize:"10px"}}>{values.cta}</Typography>
    </Box>     : null }

    {template==="images/feed.png"  ? <Box   
    sx={{ zIndex:"95", pointerEvents:"none",position:"absolute" , left:"-2.5px",bottom:"16%",  width:"250px"  ,paddingLeft:"30px",paddingRight:"30px"  ,borderColor:"red"}}
     >      
       <Box sx={{ display: "flex", alignItems:"left", gap: "2px" }}>
        <Typography variant="title" fontSize="8px"  noWrap>
          {values.brandName? values.brandName:"Test" }
        </Typography>
        <Typography variant="body 2" fontSize="8px" noWrap>
        {values.caption}
        </Typography>
      </Box>       
    </Box>     : null } 

        {/*IG STORY ELEMENTS */}  

        {template==="images/story.png"  ?  <Box   
    sx={{ zIndex:"95", pointerEvents:"none",position:"absolute" , top:"13.5%", left:"25.7%", borderRadius:"20px", borderColor:"red"}}
     >      
     <Typography  sx={{color:"white",fontSize:"8px",textTransform:"capitalize",fontWeight:"bold"}}>{values.brandName?   values.brandName: "Test" }&nbsp;&nbsp;&nbsp;
     <Typography sx={{color:"white",fontSize:"8px",textTransform:"capitalize",fontWeight:"narrow", display:"inline"}}>14h</Typography></Typography>
    </Box>     : null }
  
     

    {/*IG Reels ELEMENTS */}  

    {template==="images/reels.png"  ?<Box   border
    sx={{ zIndex:"95", pointerEvents:"none",position:"absolute" , bottom:"19.5%" ,left:"12%", borderRadius:"20px",paddingLeft:"10px",paddingRight:"10px" ,paddingTop:"4px",paddingBottom:"4px" ,borderColor:"red"}}
     >      
     <Typography  sx={{color:"white",fontSize:"10px",fontWeight:"bold"}}>{values.cta}</Typography>
    </Box>     : null }

    {/*DP1 ZINDEX= 110 */}
    {template==="images/reels.png"  ?
    <Box sx={{zIndex:"110",position:'absolute' ,bottom:"24%",left:"30px" }}>
      <img style={{objectFit:"cover", width:"25px",height:"25px",borderRadius:"50%", }}src={profilePic?profilePic:mockup?.imageUrl}></img>
    </Box>  : null }

    {template==="images/reels.png"  ?

    <Typography  sx={{zIndex:"110", position:"absolute",left:"60px",bottom:"26.5%",color:"white",fontSize:"10px",textTransform:"capitalize",fontWeight:"bold"}}>{values.brandName?   values.brandName: "Test" }&nbsp;&nbsp;&nbsp;
      </Typography> : null} 

      {template==="images/reels.png"  ? <Box   
    sx={{ zIndex:"95", pointerEvents:"none",position:"absolute" , left:"4px",bottom:"16%",  width:"250px"  ,paddingLeft:"30px",paddingRight:"30px"  ,borderColor:"red"}}
     >      
       <Box sx={{ display: "flex", alignItems:"left", gap: "2px" }}>
         
        <Typography variant="body 2" fontSize="8px" noWrap>
        {values.caption}
        </Typography>
      </Box>       
    </Box>     : null } 

     {/*IG Filter ELEMENTS */}  

     {template==="images/filter.png"  ?<Box   border
    sx={{ zIndex:"95", pointerEvents:"none",position:"absolute" , bottom:"9%" ,left:"50", borderRadius:"20px",paddingLeft:"10px",paddingRight:"10px" ,paddingTop:"4px",paddingBottom:"4px" ,borderColor:"red"}}
     >      
     <Typography  sx={{color:"white",fontSize:"9px",fontWeight:"bold"}}>Filter Name</Typography>
    </Box>     : null }

    {/*DP1 ZINDEX= 110 */}
    {template==="images/filter.png"  ?
    <Box sx={{zIndex:"110",position:'absolute' ,bottom:"82px",left:"52" }}>
      <img style={{objectFit:"cover", width:"40px",height:"40px",borderRadius:"50%", }}src={mockup?mockup?.imageUrl:`images/car1.png`}></img>
    </Box>  : null }
    

    
    
    
  
    

   
    </Box>

<Box  sx={{ width:"100%", stroke:"10" , display:"flex",justifyContent:"center"}}>
    <ButtonGroup   disableElevation  
  variant="contained"
  aria-label="Disabled elevation buttons"    >
    <Button  onClick={()=>setIsDrawing(!isDrawing)}>  
    <Stack direction="row" spacing={2}>
    <ColorPicker value={color}  onChange={(e)=>{setColor(e.value)}} /><DrawIcon sx={{alignSelf:"center"}}/> 
      </Stack> </Button>
    <Button   onClick={()=>clearCanvas(250,500)}><ClearAllIcon/></Button>
    <Button onClick={()=>setSelectedStock(stock)}><CropIcon/></Button>
    </ButtonGroup>  
    </Box>
    

    {/*EXPORT BUTTON*/}
    <Button variant="contained" sx={{  alignSelf:"center", zIndex:"200", marginTop:"20px", width:"100px",padding:"10px"}}  onClick={downloadImage}><FileDownloadIcon sx={{marginRight:"5px"}}/>Export</Button>
 
    </Box>



</>
  )
}

export default MockupPreview
