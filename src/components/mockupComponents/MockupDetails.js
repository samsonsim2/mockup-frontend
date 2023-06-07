import { Avatar, Badge, Box, Button, FormLabel, Input, Slider, Stack, Switch, TextField, Typography } from '@mui/material'
import { useAppContext } from '../../context/appContext';
import { useEffect, useState } from 'react'
import axios from "axios";
import { BACKEND_URL } from '../../constants';
import { storage } from '../../firebase';
import { generateImageName } from '../utils';
import { uploadBytes, getDownloadURL, ref as sRef } from "firebase/storage";
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DeleteIcon from '@mui/icons-material/Delete';
import DeletableBox from './DeletableBox';
 
//stockImages 

 // Form data 
 const initDetails={
    cta:"Learn more",
    caption:"lorem ipsum dolor",
    brandName:"",
    storiesCta:"Learn moree"
  
  }
 

const MockupDetails = () => {

  const navigate=useNavigate()

  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  }));
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius:'20px',
    p: 2,
    
     
  };


    const{
      //Picture inputs
       profileInput,
       setProfileInput,
       profilePic,
       setProfilePic,
       iconPic,
       setIconPic,
       iconInput,
       setIconInput,
       
      selectedMockup,
      setSelectedMockup,
      setSafeZone,
      safeZone,
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
    assetArray,
    setAssetArray,
  setImagesArray}= useAppContext() 

    const [fileInput,setFileInput] = useState("")  
    const[tempUpload,setTempUpload]= useState([])  
    
//CLEAR ALL STATE WHEN PAGE FIRST LOADS
useEffect(()=>{
  setSafeZone(false)
  setLocationSticker(false)
  setAddYoursSticker(false)
  setProfilePic("")
  setProfileInput("")
  setIconPic("")
  setIconInput("")
  setTempUpload([])
  
},[])

// START OF FUNCTIONS ---------------------
 
// Handle form changes
  const handleChange=(e)=>{
    console.log(e.target.value)
   setValues({...values,[e.target.name]:e.target.value})
  }

 
const save= async (event) => {
  event.preventDefault()
  const UpdateProfile =()=>{
    const fileName = generateImageName(profileInput?.name);        
    const storageRef = sRef(storage, `images/${fileName}`);  
    
    uploadBytes(storageRef, profileInput)
    .then((snapshot) => {
      console.log("testssdas")
      return getDownloadURL(snapshot.ref);
      
      
    })    .then((url) => {       
      setProfileInput(url)
      async function createAsset(){      
        const res = await axios.patch(`${BACKEND_URL}/mockup/edit/${selectedMockup}`,{                       
           userName:values.brandName,imageUrl: url}).then((res)=>{                         
            console.log(res.data)          
           })
          }
     createAsset()
   
    }) }


    const UpdateIcon =()=>{
      const fileName = generateImageName(iconInput?.name);        
      const storageRef = sRef(storage, `images/${fileName}`);  
      
      uploadBytes(storageRef, iconInput)
      .then((snapshot) => {
         
        return getDownloadURL(snapshot.ref);
        
        
      })    .then((url) => {       
        setProfileInput(url)
        async function createAsset(){      
          const res = await axios.patch(`${BACKEND_URL}/mockup/filter`,{                       
             mockupId:selectedMockup,filterName:values.filterName,iconUrl: url}).then((res)=>{                         
              console.log(res.data)          
             })
            }
       createAsset()
     
      }) }
  

  async function UpdateBrandName(){      
      const res = await axios.patch(`${BACKEND_URL}/mockup/edit/${selectedMockup}`,{                       
         userName:values.brandName,imageUrl: values.profileUrl}).then((res)=>{                         
          console.log(res.data)          
         })
        }
  
 

    //Update profile Photo  ( have to split into 2 because update profile has undefined inputs when empty)
    if(profileInput){
      UpdateProfile()      
    }else{
   //Update just the Brand Name
    UpdateBrandName()         
    }


  //Update Assets
  // const uploadFile =()=>{
  //   const fileName = generateImageName(fileInput?.name);    
  //   const storageRef = sRef(storage, `images/${fileName}`);
  //    uploadBytes(storageRef, fileInput)
  //   .then((snapshot) => {
  //     return getDownloadURL(snapshot.ref);
  //   })
  //   .then((url) => {
       
  //     setFileInput("")
  //     async function createAsset(){      
  //       const res = await axios.post(`${BACKEND_URL}/mockup/asset`,{                       
  //           mockupId:values.mockupId,imageUrl:url}).then((res)=>{   
                       
  //           console.log(res.data)          
  //          })
  //         }
  //    createAsset()
   
  //   }) 
  // }

  // if(fileInput){
     
  //   uploadFile()
  // }
    
   // Update Feed
    const feed = await axios.patch(`${BACKEND_URL}/mockup/feed`,{                       
      mockupId:values.mockupId,caption:values.caption,cta:values.cta}).then((res)=>{
      console.log(res.data)          
     })
  //Update Story 
  const story = await axios.patch(`${BACKEND_URL}/mockup/story`,{                       
    mockupId:values.mockupId,location:values.location,tag:values.addYours,cta:values.storiesCta}).then((res)=>{
    console.log(res.data)          
   })
   

   //Update Filter 

 if(iconInput){
  UpdateIcon()  

 }else{
  const filter = await axios.patch(`${BACKEND_URL}/mockup/filter`,{                       
    mockupId:values.mockupId,filterName:values.filterName,iconUrl:values.iconUrl}).then((res)=>{
    console.log(res.data)          
   })
  
 }
  
    
 
} 

const handleProfilePicInput = (event) => {
  event.preventDefault()
  setProfileInput(event.target.files[0])   
  setProfilePic(URL.createObjectURL(event.target.files[0]));  
};

const handleIconPicInput = (event) => {
  event.preventDefault()
  setIconInput(event.target.files[0])   
  setIconPic(URL.createObjectURL(event.target.files[0]));  
};

// Creates temporary display for the new screen image added 
const handleImageInput =   async (event) => {
  event.preventDefault()
  setFileInput(event.target.files[0])  
  const tempUrl = URL.createObjectURL(event.target.files[0]) 
 
  setTempUpload([...tempUpload,tempUrl])

  
};

// Uploads new screen image to database 
useEffect(()=>{
  const uploadFile =()=>{
    const fileName = generateImageName(fileInput?.name);    
    const storageRef = sRef(storage, `images/${fileName}`);
     uploadBytes(storageRef, fileInput)
    .then((snapshot) => {
      return getDownloadURL(snapshot.ref);
    })
    .then((url) => {
       
      setFileInput("")
      async function createAsset(){      
        const res = await axios.post(`${BACKEND_URL}/mockup/asset`,{                       
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

 

return (
<Box  width="100%"   backgroundColor="white"  padding="20px"  sx={{borderTopLeftRadius:"20px",borderBottomLeftRadius:"20px"}}>

{/*Template selection */}
    <Stack direction="row" spacing="20px" marginBottom="20px">
      <Typography sx={{alignSelf:"center",fontWeight:"bold"}}>Formats:</Typography>
      <Button variant="contained"  onClick={()=>{setTemplate("images/feed.png");setSafeZone(false);setLocationSticker(false); setAddYoursSticker(false)}}>Feed</Button>
      <Button variant="contained" onClick={()=>setTemplate("images/story.png")}>Story</Button>
      <Button variant="contained" onClick={()=>{setTemplate("images/reels.png");setLocationSticker(false); setAddYoursSticker(false)}}>Reels</Button>
      <Button variant="contained" onClick={()=>{setTemplate("images/filter.png");setLocationSticker(false); setAddYoursSticker(false)}}>Filter</Button>
      {template==="images/feed.png" ? null 
      : <Typography sx={{alignSelf:"center"}}>SafeZone: <Switch onChange={()=>setSafeZone(!safeZone)}/></Typography>   }
    </Stack>


  { /* UPDATE PROFILE PIC */}
  <Typography sx={{fontWeight:"bold"}}>Profile Picture:</Typography>
  <Badge 
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={          
          <SmallAvatar alt="Remy Sharp"  >

            <FormLabel htmlFor="profile-upload"  sx={{cursor: 'pointer', backgroundColor:"black",width:"100%",display:"flex",justifyContent:"center"  }}>
                  <AddIcon sx={{  width:"80%", margin:"auto", color:"white"}}/>
            </FormLabel>
             <Input 
                type="file"
                id="profile-upload"
                accept="image/jpg, image/png"
                onChange={handleProfilePicInput}     
                sx={{display:"none"}} 
                >               

            </Input>
          </SmallAvatar>
        }
      >
       
        <Avatar  sx={{ width:"50px",height:"50px"}}src={profilePic  ? profilePic  : values.profileUrl}/>
        </Badge>

{/*Stock Image*/}
<Typography sx={{fontWeight:"bold",mt:"20px"}}>Stock assets:</Typography>

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


 </Stack>


{/*Uploaded Image*/}
 <Typography sx={{fontWeight:"bold",mt:"20px"}}>My assets:</Typography>
<Stack direction="row" spacing={1}>

  
{assetArray.map((image,index)=>{
    return  <DeletableBox image={image.imageUrl} id={image.id} index={index} key={index} array={assetArray} setArray={setAssetArray} />
    
   

})}

{tempUpload.map((image,index)=>{
  return <DeletableBox image={image} index={index} key={index} array={tempUpload} setArray={setTempUpload}/>
 })}
</Stack>
 
 

 <Input  sx={{display:"block",mt:"10px"}}
                type="file"
                id="file-upload"
                accept="image/jpg, image/png"
                onChange={handleImageInput}     
                
                >               

  </Input>





    
{/*Sliders*/}
<Typography sx={{fontWeight:"bold",mt:"20px"}}>Adjustments:</Typography>
 <Typography>Brightness</Typography>
 <Slider  min={0} max={2} step={0.1}  value={filterValues?.brightness}  onChange={(e)=>setFilterValues({...filterValues,brightness:e.target.value})}/>

 <Typography>Saturation</Typography>
 <Slider  min={0} max={2} step={0.1}  value={filterValues?.saturation}  onChange={(e)=>setFilterValues({...filterValues,saturation:e.target.value})}/>
 
 <Typography>Contrast</Typography>
 <Slider  min={0} max={2} step={0.1}  value={filterValues?.contrast}  onChange={(e)=>setFilterValues({...filterValues,contrast:e.target.value})}/>

<Button variant="contained"  sx={{display:"block",marginBottom:"20px"}} onClick={(e)=>setFilterValues({
    brightness:1,
    saturation:1,
    contrast:1
  })}>Reset</Button>  
{/*Details*/}

{/*Filter icon*/}
{template==="images/filter.png" ? 
<Box>
<Typography sx={{fontWeight:"bold", mb:"10px"}}>Filter Icon:</Typography>
      <Badge 
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right'  }}
        badgeContent={          
          <SmallAvatar alt="Remy Sharp"  >

            <FormLabel htmlFor="icon-upload"  sx={{cursor: 'pointer', backgroundColor:"black",width:"100%",display:"flex",justifyContent:"center"  }}>
                  <AddIcon sx={{  width:"80%", margin:"auto", color:"white"}}/>
            </FormLabel>
             <Input 
                type="file"
                id="icon-upload"
                accept="image/jpg, image/png"
                onChange={handleIconPicInput}     
                sx={{display:"none"}} 
                >               

            </Input>
          </SmallAvatar>
        }
      >
       
        <Avatar  sx={{ width:"50px",height:"50px"}}src={iconPic  ? iconPic  : values.iconUrl}/>
        </Badge>
  </Box>    :null}


    <Stack direction="column" spacing="20px">
    <Typography sx={{fontWeight:"bold",mt:"20px"}}>Details:</Typography>
    <TextField  id="outlined-basic" label="Brand username" variant="outlined" name="brandName" value={values.brandName} onChange={handleChange}/>
    {/*FEED*/}
      
   
     
    {template==="images/feed.png" ?
    <TextField id="outlined-basic" label="Caption" variant="outlined"  name="caption" value={values.caption} onChange={handleChange} 
    />   : null}
    {template==="images/feed.png" ?
    <TextField id="outlined-basic" label="Call to action"  name="cta" value={values.cta} onChange={handleChange} variant="outlined" />  
    : null}



    {/*REELS*/}
    {  template==="images/reels.png" ?
    <TextField id="outlined-basic" label="Caption(Reels)" variant="outlined"  name="reelsCaption" value={values.reelsCaption} onChange={handleChange} 
    />  :null}

    {template==="images/reels.png" ?
    <TextField id="outlined-basic" label="Cta(Reels)" variant="outlined"  name="reelsCta" value={values.reelsCta} onChange={handleChange} 
    />  :null}

    {/*FILTERS*/}
    
    {template==="images/filter.png" ?
    <TextField id="outlined-basic" label="Filter Name" variant="outlined"  name="filterName" value={values.filterName} onChange={handleChange} 
    />   : null}
    
    </Stack>
{/*Sticker*/}

{template==="images/story.png" ?
    <TextField sx={{mt:"20px"}}id="outlined-basic" label="Call to action"  name="storiesCta" value={values.storiesCta} onChange={handleChange} variant="outlined" />  
    : null}
{template==="images/story.png"  ?<Box>
<Stack direction="row" display="flex" alignItems="center">
<Typography>Location Sticker</Typography>
<Switch   onChange={()=>setLocationSticker(!locationSticker)}/>

</Stack>

{locationSticker ?<TextField  name="location" value={values.location} onChange={handleChange}></TextField>:null}

<Stack direction="row" display="flex" alignItems="center">

<Typography>Add Yours Sticker</Typography>
<Switch   onChange={()=>setAddYoursSticker(!addYoursSticker)}/>
</Stack>
{addYoursSticker?<TextField name="addYours" value={values.addYours} onChange={handleChange}></TextField>:null}
</Box> : null}
<Stack direction="row" spacing={1} sx={{mt:"20px"}}>
<Button variant="contained" onClick={()=>{navigate("/dashboard")}}><ArrowBackIosIcon/> Back</Button>
<Button variant="contained" onClick={save}>Save</Button>

</Stack>



  

</Box>
  )
}

export default MockupDetails
