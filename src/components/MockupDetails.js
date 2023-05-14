import { Box, Button, Slider, Stack, Switch, TextField, Typography } from '@mui/material'
import { useAppContext } from '../context/appContext'
import { useState } from 'react'
 
//stockImages 

 // Form data 
 const initDetails={
    cta:"Learn more",
    message:"lorem ipsum dolor",
    brandName:"",
    storiesCta:"Learn moree"
  
  }

const MockupDetails = () => {
    const{cropReset,setCropReset,setAddYoursSticker,addYoursSticker, locationSticker,setLocationSticker,resetImage,stock,setStock,setSelectedStock,selectedStock,stockImages,selectedMockup,template,setTemplate,values,setValues,setFilterValues,filterValues}= useAppContext() 
     
 


// START OF FUNCTIONS ---------------------

// Handle form changes
  const handleChange=(e)=>{
    console.log(e.target.value)
   setValues({...values,[e.target.name]:e.target.value})
  }

  const reset =(e)=>{
    

  }
// END OF FUNCTIONS ---------------------
  return (
<Box  width="100%"   backgroundColor="red"  padding="20px" >

{/*Template selection */}
    <Stack direction="row" spacing="20px" marginBottom="20px">
      <Button variant="contained"  onClick={()=>setTemplate("images/feed.png")}>Feed</Button>
      <Button variant="contained" onClick={()=>setTemplate("images/story.png")}>Story</Button>
      <Button variant="contained">Reels</Button>
    </Stack>

{/*Stock Image*/}

<Stack direction="row" spacing={1}>
{stockImages.map((image,index)=>{
    return <Box key={index} component="img"  src={image} sx={{width:"40px", height:"40px",objectFit:"cover",borderRadius:"10px",cursor:"pointer"}}
    onClick={ ()=>{
    
   
     setStock({...stock,imageUrl:stockImages[index],croppedImageUrl:null})
     setCropReset(!cropReset)
    
    }} >
        
    </Box>

})}
 </Stack>
 
 
    
{/*Sliders*/}
 <Typography>Brightness</Typography>
 <Slider  min={0} max={2} step={0.1}  value={filterValues?.brightness}  onChange={(e)=>setFilterValues({...filterValues,brightness:e.target.value})}/>

 <Typography>Saturation</Typography>
 <Slider  min={0} max={2} step={0.1}  value={filterValues?.saturation}  onChange={(e)=>setFilterValues({...filterValues,saturation:e.target.value})}/>
 
 <Typography>Contrast</Typography>
 <Slider  min={0} max={2} step={0.1}  value={filterValues?.contrast}  onChange={(e)=>setFilterValues({...filterValues,contrast:e.target.value})}/>

<Button variant="contained"  onClick={(e)=>setFilterValues({
    brightness:1,
    saturation:1,
    contrast:1
  })}>Reset</Button>  
{/*FORM */}
    <Stack direction="column" spacing="20px">
    <Typography>Ad Details</Typography>
    <TextField  id="outlined-basic" label="Brand username" variant="outlined" name="brandName" value={values.brandName} onChange={handleChange}/>
    {template==="images/feed.png" ?
    <TextField id="outlined-basic" label="Message" variant="outlined"  name="message" value={values.message} onChange={handleChange} 
    />   : null}
    <TextField id="outlined-basic" label="Call to action"  name="cta" value={values.cta} onChange={handleChange} variant="outlined" />
    </Stack>
{/*Sticker*/}
<Stack direction="row" display="flex" alignItems="center">
<Switch   onChange={()=>setLocationSticker(!locationSticker)}/>
<Typography>Location Sticker</Typography>
</Stack>
{locationSticker?<TextField  name="location" value={values.location} onChange={handleChange}></TextField>:null}

<Stack direction="row" display="flex" alignItems="center">
<Switch   onChange={()=>setAddYoursSticker(!addYoursSticker)}/>
<Typography>Add Yours Sticker</Typography>
</Stack>
{addYoursSticker?<TextField name="addYours" value={values.addYours} onChange={handleChange}></TextField>:null}

  

</Box>
  )
}

export default MockupDetails
