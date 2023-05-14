import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useAppContext } from '../context/appContext'
import { useState } from 'react'
 

 // Form data 
 const initDetails={
    cta:"Learn more",
    message:"lorem ipsum dolor",
    brandName:"",
    storiesCta:"Learn moree"
  
  }

const MockupDetails = () => {
    const{selectedMockup,template,setTemplate,values,setValues}= useAppContext() 
     
 

// START OF FUNCTIONS ---------------------

// Handle form changes
  const handleChange=(e)=>{
    console.log(e.target.value)
   setValues({...values,[e.target.name]:e.target.value})
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


{/*FORM */}
    <Stack direction="column" spacing="20px">
    <Typography>Ad Details</Typography>
    <TextField  id="outlined-basic" label="Brand username" variant="outlined" name="brandName" value={values.brandName} onChange={handleChange}/>
    {template==="images/feed.png" ?
    <TextField id="outlined-basic" label="Message" variant="outlined"  name="message" value={values.message} onChange={handleChange} 
    />   : null}
    <TextField id="outlined-basic" label="Call to action"  name="cta" value={values.cta} onChange={handleChange} variant="outlined" />
    </Stack>
  

</Box>
  )
}

export default MockupDetails
