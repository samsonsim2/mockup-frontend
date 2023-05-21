import { Avatar, Badge, Box, Button, Card, FormLabel, Input, Modal, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import { uploadBytes, getDownloadURL, ref as sRef } from "firebase/storage";
 
import { styled } from '@mui/material/styles';
import {useFormik} from "formik"
import {yupResolver} from '@hookform/resolvers/yup'
 
import * as yup from 'yup' 
import AddIcon from '@mui/icons-material/Add';
import { useAppContext } from '../../context/appContext';
import axios from "axios";
import { BACKEND_URL } from '../../constants';
import { storage } from '../../firebase';
import { generateImageName } from '../utils';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router';
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
  
function MockupForm  (props) {

  const {openMockupForm,setOpenMockupForm} = props 

  const navigate = useNavigate()
    const { currentUserId,setSelectedMockup } = useAppContext();


  
    
 
    const [ fileInput,setFileInput] = useState("")
     

    const [profilePic,setProfilePic] = useState()

    
    const schema = yup.object().shape({
        userName:yup.string().min(4).max(30).required("Please enter a valid user name (max30 chars)")
    })
    const onSubmit=async( e)=>{
        e.preventDefault()

        // Preview Image 
        const fileName = generateImageName(fileInput?.name);    
        const storageRef = sRef(storage, `images/${fileName}`);
    
        //Reset the preview link
        uploadBytes(storageRef, fileInput)
        .then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        })
        .then((url) => {
           console.log(url)
           const res=  axios.post(`${BACKEND_URL}/mockup/create`, {...values,createdBy:currentUserId,imageUrl:url} ).then((res)=>{  
           setFileInput("")
           setSelectedMockup(res.data.id)
           navigate('/mockup')
          })
        })
      
   
      
    }

    const {values,errors,touched,handleChange,handleBlur,handleSubmit} = useFormik({
        initialValues:{
            userName:"",
            imageUrl:"testing123",
             
        },
        validationSchema:schema,
        onSubmit
    })
   
    console.log(errors)

    const handleProfilePicInput = (event) => {
        setFileInput(event.target.files[0])
        setProfilePic(URL.createObjectURL(event.target.files[0]));
      
      };

   

     
  return (<>
     
 <Modal
        open={openMockupForm}
        
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{display:"flex"}}
      >

        <Box  display="flex" flexDirection="column"   sx={style}>
        < CloseIcon sx={{alignSelf:"flex-end",cursor:"pointer"}} onClick={()=>{
          setOpenMockupForm(false)
          setFileInput("")
          setProfilePic("")
          values.userName = ""}
          }></CloseIcon>
         
        
        <Typography variant="h5" textAlign="center" mb="20px">Create Mockup</Typography>

        <Badge sx={{margin:"auto"}}
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
          <SmallAvatar alt="Remy Sharp"   >

            <FormLabel htmlFor="file-upload"  sx={{cursor: 'pointer', backgroundColor:"black",width:"100%",display:"flex",justifyContent:"center"  }}>
                  <AddIcon sx={{  width:"80%", margin:"auto", color:"white"}}/>
            </FormLabel>
             <Input 
                type="file"
                id="file-upload"
                accept="image/jpg, image/png"
                onChange={handleProfilePicInput}     
                sx={{display:"none"}} 
                >               

            </Input>
          </SmallAvatar>
        }
      >
       
        <Avatar  sx={{ width:"100px",height:"100px"}}src={profilePic ? profilePic : "/broken-image.jpg"}/>
        </Badge>
        <Typography textAlign="center" mb="20px">Add profile picture</Typography>
        
        <form style={{display:"flex", flexDirection:"column",justifyContent:"center"}} onSubmit={onSubmit} >
            <TextField  
            sx={{width:'100%',mb:"20px"}}
            error={errors.userName?true:false}
            value={values.userName}
            onChange={handleChange}
            onBlur={handleBlur}
            id="userName" 
            label="Profile name or brand name"
            variant="outlined"
            helperText={errors.userName?errors.userName:null} />

            <Button  sx={{margin:"auto", width:"100%"}} variant="contained" type="submit"  >Create</Button>
        </form>
         
            
        </Box>
      </Modal>
    


  
    


    </>
  )
}

export default MockupForm
