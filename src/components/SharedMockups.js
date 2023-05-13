import { Button, Card, Grid } from '@mui/material'
 
import SharingForm from './SharingForm'
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/appContext' 
import { useNavigate } from "react-router-dom";
const SharedMockups = () => {
    const navigate = useNavigate();
    const {userMockups,setUserMockups,selectedMockup,setSelectedMockup}=useAppContext()

    const [showSharing,setShowSharing] = useState(false)
   

    console.log(userMockups)
  return (
    <div>
  
    <Grid>
     {userMockups? userMockups.map((mockup)=> {return   <Card>
        {mockup.Mockup?.userName}
        
       <Button variant="contained" onClick={()=>{
         
         setShowSharing(true)}}>share</Button>
     </Card>}) : null}
   
    </Grid>
    {showSharing ? <SharingForm mockupId={selectedMockup} /> :null}
   </div>
  )
}

export default SharedMockups
