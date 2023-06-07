import { Avatar, Badge, Box, Button, Card, FormLabel, Input, Modal, TextField, Typography } from '@mui/material'
import React, { useEffect, useState,useRef } from 'react'
import {useForm} from "react-hook-form"
import { styled } from '@mui/material/styles';
import {useFormik} from "formik"
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup' 
import AddIcon from '@mui/icons-material/Add';
import { useAppContext } from '../../context/appContext';
import axios from "axios";
import { BACKEND_URL } from '../../constants';
import CloseIcon from '@mui/icons-material/Close';
import emailjs from '@emailjs/browser';
import { useAuth0 } from "@auth0/auth0-react"; 
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
  
const SharingForm = ({openSharingForm,setOpenSharingForm}) => {
  const { user,isAuthenticated,getAccessTokenSilently } = useAuth0();  


  const form = useRef();
  const sendEmail = () => {  
     
   
    console.log(form.current)
    emailjs.sendForm('service_4s3az7u', 'template_erfkwlb', form.current, 'YrjE6ZKki-zkzjyd0')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };
    const { setSelectedMockup,selectedMockup,userId } = useAppContext();   
    
    const schema = yup.object().shape({
        email:yup.string().email("Please enter a valid email").required("Email Required")
    })
    const onSubmit=async( e)=>{
       
        e.preventDefault()        
        const res= await axios.post(`${BACKEND_URL}/mockup/share`, {...values,mockupId:selectedMockup} ).then((res)=>{
                         setSelectedMockup(null)  
            setOpenSharingForm(false)
          })
        sendEmail()
    }

    const {values,errors,touched,handleChange,handleBlur,handleSubmit} = useFormik({
        initialValues:{
            email:"",
        },
        validationSchema:schema,
        onSubmit
    })
   
    console.log(errors)

    
     
  return (<>
     
 <Modal
        open={openSharingForm}
        
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{display:"flex"}}
      >

        <Box  display="flex" flexDirection="column"   sx={style}>
        <CloseIcon sx={{alignSelf:"flex-end",cursor:"pointer"}} onClick={()=>{ 
            setSelectedMockup(null)  
            setOpenSharingForm(false)}}></CloseIcon>
        
        <Typography variant="h5" textAlign="center" mb="20px">Share Mockup</Typography>

       
        
        <form ref={form}  style={{display:"flex", flexDirection:"column",justifyContent:"center"}} onSubmit={onSubmit} >
            <TextField  
            sx={{width:'100%',mb:"20px"}}
            error={errors.email?true:false}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            id="email" 
            name="email"
            label="Receipient email"
            variant="outlined"
            helperText={errors.email?errors.email:null} />

            <Button  sx={{margin:"auto", width:"100%"}} variant="contained" type="submit"
           >Share</Button>

           <TextField sx={{display:"none"}} name="sender" value={user?.name}></TextField>
            

            </form>
         
            
        </Box>
      </Modal>
    </>
  )
}

export default SharingForm
