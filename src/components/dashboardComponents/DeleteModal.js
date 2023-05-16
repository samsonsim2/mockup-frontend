import { Avatar, Badge, Box, Button, Card, FormLabel, Input, Modal, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useAppContext } from '../../context/appContext';
import { BACKEND_URL } from '../../constants';
import CloseIcon from '@mui/icons-material/Close';
  
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
  
const DeleteModal = ({setOpenConfirmDelete,openConfirmDelete}) => {

    const {selectedMockup,setSelectedMockup,userMockups,setUserMockups} = useAppContext()

    
  
     
  return (<>
     
 <Modal
        open={openConfirmDelete}
        
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{display:"flex"}}
      >
     
        <Box  display="flex" flexDirection="column"   sx={style}>

        < CloseIcon sx={{alignSelf:"flex-end",cursor:"pointer"}} onClick={()=>{ 
            setSelectedMockup(null)  
            setOpenConfirmDelete(false)}}></CloseIcon>


        <Typography variant="h5" textAlign="center" mb="20px">Are you sure you want to delete?</Typography>
        
        <Button  sx={{margin:"auto", width:"100%",}} variant="contained" type="submit"
          onClick={async()=>{
           const res = await axios.delete(`${BACKEND_URL}/mockup/${selectedMockup}`).then((res)=>{             
           const newList = userMockups.filter((m)=>{
            return m.id != selectedMockup
             })            
            setUserMockups(newList)  
            setSelectedMockup(null)  
            setOpenConfirmDelete(false)        
          })}}  
        >Confirm</Button>
            
        </Box>
      </Modal>
    
      

  
    


    </>
  )
}

export default DeleteModal
