import { Box, Button, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import DrawingCanvas from './DrawingCanvas'
import ImageCanvas from './ImageCanvas'
import Draggable from 'react-draggable'
import { useAppContext } from '../context/appContext'
import html2canvas from 'html2canvas'
 
const MockupPreview = () => {
    const{selectedMockup,template,setTemplate,values,setValues,mockup,setMockup}= useAppContext() 
   
    const divRef = useRef(null); 
    
    // START OF FUNCTIONS ---------------------

// Handle form changes
  const handleChange=(e)=>{
    console.log(e.target.value)
   setValues({...values,[e.target.name]:e.target.value})
  }
 
  

// Download image 
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

  // END OF FUNCTIONS ---------------------
    
  return (<>
    <Box display="flex" flexDirection="column" justifyContent="center" padding="40px" sx={{minWidth:"320px" ,background:"purple" }} >
    <Box display="flex" justifyContent="center">
    <Typography sx={{marginBottom:"20px",zIndex:"1000"}}>Mockup preview </Typography>
    </Box>

    {/*PHONE PREVIEW*/}
    
    <Box   margin="auto" width="250px" height="500px" position="relative" sx={{display:"flex" ,justifyContent:"center" ,alignItems:"center", background:"none"}}  ref={divRef}>
      
    {/* DRAWING + STICKER CANVASES ZINDEX= 200*/}
    <Box sx={{zIndex:"200",position:'absolute' }}>

        {/* DRAWING CANVAS*/}
        <DrawingCanvas width={250} height={500} >      
        </DrawingCanvas>  

        
        {/* STICKER */}
        <Draggable bounds="parent" defaultPosition={{x:250/2-25,y:-500/2 -50}} >
            <Box sx={{zIndex:"1000000",position:"absolute"}}>
                <img  style={{width:"50px"}} src="images/frame.png" />
            </Box>
        </Draggable>  
        
    </Box>

    {/*IMAGE CANVAS ZINDEX= 50*/}
    <ImageCanvas/>
    

    
    {/*PHONE FRAME   ZINDEX= 100 */}   
    <Box   component="img"  
    sx={{ zIndex:"100", pointerEvents:"none", width:"100%",height:"100%",position:"absolute" , top:"0", left:"0", borderRadius:"20px", borderColor:"red"}}
    src="images/frame.png" >      
    </Box> 

    {/*SELECTED TEMPLATE ZINDEX= 90*/}
    <Box component="img"  
    sx={{  zIndex:"90", pointerEvents:"none", width:"100%",height:"100%",position:"absolute" , top:"0", left:"0", borderRadius:"20px", borderColor:"red"}}
    src={template} >      
    </Box>     


    {/*DP ZINDEX= 110 */}
    <Box sx={{zIndex:"110",position:'absolute' ,top:"110px",left:"20px" }}>
      <img style={{objectFit:"cover", width:"30px",height:"30px",borderRadius:"50%", }}src={mockup?mockup?.imageUrl:`images/car1.png`}></img>
    </Box>    


    {/*IG STORY ELEMENTS */}  
    {template==="images/story.png"  ?  <Box   
    sx={{ zIndex:"95", pointerEvents:"none",position:"absolute" , top:"11.5%", left:"21.5%", borderRadius:"20px", borderColor:"red"}}
     >      
     <Typography  sx={{color:"white",fontSize:"8px"}}>{values.brandName} 14h</Typography>
    </Box>     : null }

    {template==="images/story.png"  ?<Box   
    sx={{ zIndex:"95", background:"grey" , pointerEvents:"none",position:"absolute" , bottom:"4%" , borderRadius:"20px",paddingLeft:"10px",paddingRight:"10px" ,paddingTop:"4px",paddingBottom:"4px" ,borderColor:"red"}}
     >      
     <Typography  sx={{color:"white",fontSize:"10px"}}>{values.cta}</Typography>
    </Box>     : null }

    
    {/*IG FEED ELEMENTS */}    
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
    </Box>     : null } 
    
    
    
  
    

   
    </Box>


    {/*EXPORT BUTTON*/}
    <Button variant="contained" sx={{  zIndex:"1000", marginTop:"20px", width:"100px",padding:"10px"}}  onClick={downloadImage}>Export</Button>

    </Box>



</>
  )
}

export default MockupPreview
