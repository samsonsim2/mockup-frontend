import { Box, Button, Input, Slider, Stack, Switch, TextField, Typography } from '@mui/material'
import { useAppContext } from '../context/appContext'
import { useEffect, useState } from 'react'
import axios from "axios";
import { BACKEND_URL } from '../constants';
import { storage } from '../firebase';
import { generateImageName } from './utils';
import { uploadBytes, getDownloadURL, ref as sRef } from "firebase/storage";
 
//stockImages 

 // Form data 
 const initDetails={
    cta:"Learn more",
    message:"lorem ipsum dolor",
    brandName:"",
    storiesCta:"Learn moree"
  
  }

const MockupDetails = () => {
    const{
      cropReset,
      setCropReset,
      setAddYoursSticker,
      addYoursSticker, 
      locationSticker,
      setLocationSticker,     
      stock,
      setStock,    
      stockImages,     
      template,
      setTemplate,
      values,
      setValues,
      setFilterValues,
      filterValues,
    imagesArray,
    testArray,
  setImagesArray}= useAppContext() 

    const [fileInput,setFileInput] = useState("")
   
 


// START OF FUNCTIONS ---------------------
useEffect(()=>{
    
 
},[]  )
// Handle form changes
  const handleChange=(e)=>{
    console.log(e.target.value)
   setValues({...values,[e.target.name]:e.target.value})
  }

//   const onUpload=async( e)=>{
//     e.preventDefault()

//     const fileName = generateImageName(fileInput.name);

//     const storageRef = sRef(storage, `images/${fileName}`);

//     //Reset the preview link
//     uploadBytes(storageRef, fileInput)
//     .then((snapshot) => {
//       return getDownloadURL(snapshot.ref);
//     })
//     .then((url) => {
//        console.log(url)
//        const res=  axios.post(`${BACKEND_URL}/mockup/create`, {...values,createdBy:userId,imageUrl:url} ).then((res)=>{
           
//         console.log(res.data)
       
       
//     })
//     })
  
//     console.log({...values,createdBy:userId} )
  
// }

const save= async (event) => {
  event.preventDefault()
  const uploadFile =()=>{
    const fileName = generateImageName(fileInput?.name);
    
    
    const storageRef = sRef(storage, `images/${fileName}`);
  
    //Reset the preview link
    uploadBytes(storageRef, fileInput)
    .then((snapshot) => {
      return getDownloadURL(snapshot.ref);
    })
    .then((url) => {
       
      setFileInput("")
      async function createAsset(){      
        const res = await axios.post(`${BACKEND_URL}/mockup/createAsset`,{                       
            mockupId:values.mockupId,imageUrl:url}).then((res)=>{   
                       
            console.log(res.data)          
           })
          }
     createAsset()
   
    }) 
  }

  uploadFile()
} 

const handleImageInput =   async (event) => {
  event.preventDefault()
  console.log("handle image input")
  console.log(event.target.files[0].name)
   setFileInput(event.target.files[0])
   
  // console.log(e.target.value)
  const tempUrl = URL.createObjectURL(event.target.files[0])
  // console.log(tempUrl)
  setImagesArray([...imagesArray,tempUrl])

  // const uploadFile =()=>{
  //   const fileName = generateImageName(fileInput?.name);
    
    
  //   const storageRef = sRef(storage, `images/${fileName}`);
  
  //   //Reset the preview link
  //   uploadBytes(storageRef, fileInput)
  //   .then((snapshot) => {
  //     return getDownloadURL(snapshot.ref);
  //   })
  //   .then((url) => {
       
  //     setFileInput("")
  //     async function createAsset(){      
  //       const res = await axios.post(`${BACKEND_URL}/mockup/createAsset`,{                       
  //           mockupId:values.mockupId,imageUrl:url}).then((res)=>{   
                       
  //           console.log(res.data)          
  //          })
  //         }
  //    createAsset()
   
  //   }) 
  // }

  // uploadFile()
 

  
};

useEffect(()=>{
  const uploadFile =()=>{
    const fileName = generateImageName(fileInput?.name);
    
    
    const storageRef = sRef(storage, `images/${fileName}`);
  
    //Reset the preview link
    uploadBytes(storageRef, fileInput)
    .then((snapshot) => {
      return getDownloadURL(snapshot.ref);
    })
    .then((url) => {
       
      setFileInput("")
      async function createAsset(){      
        const res = await axios.post(`${BACKEND_URL}/mockup/createAsset`,{                       
            mockupId:values.mockupId,imageUrl:url}).then((res)=>{   
                       
            console.log(res.data)          
           })
          }
     createAsset()
   
    }) 
  }

  if(fileInput){
    uploadFile()

  }

  

},[fileInput])

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
{imagesArray.map((image,index)=>{
    return <Box key={index} component="img"  src={image} sx={{width:"40px", height:"40px",objectFit:"cover",borderRadius:"10px",cursor:"pointer"}}
    onClick={ ()=>{
      console.log(stockImages[index])
    
   
     setStock({imageUrl:imagesArray[index],croppedImageUrl:null})
     setCropReset(!cropReset)
     console.log(image)
    
    }} >
        
    </Box>
   

})}

{testArray.map((image,index)=>{
    return <Box key={index} component="img"  src={image.imageUrl} sx={{width:"40px", height:"40px",objectFit:"cover",borderRadius:"10px",cursor:"pointer"}}
    onClick={ ()=>{     
   
     setStock({imageUrl:image.imageUrl,croppedImageUrl:null})
     setCropReset(!cropReset)
     console.log(image)
    
    }}
     
     
     >
        
    </Box>
   

})}
 </Stack>

 <Input 
                type="file"
                id="file-upload"
                accept="image/jpg, image/png"
                onChange={handleImageInput}     
                
                >               

  </Input>
    
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
<Button onClick={save}>Save</Button>
  

</Box>
  )
}

export default MockupDetails
