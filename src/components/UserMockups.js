import { Button, Card, Grid } from '@mui/material'
 
import SharingForm from './SharingForm'
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/appContext' 
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { BACKEND_URL } from '../constants';
 
const UserMockups = () => {
  const navigate = useNavigate();
  const {userMockups,setUserMockups,selectedMockup,setSelectedMockup}=useAppContext()

    const [showSharing,setShowSharing] = useState(false)
    
  return (
    <div>
  
    <Grid>
     {userMockups? userMockups.map((mockup)=> {return   <Card>
       {mockup.userName}
       <Button variant="contained" onClick={()=>{
         console.log(mockup.id)
         setSelectedMockup(mockup.id)
         setShowSharing(true)}}>share</Button>

        <Button variant="contained" onClick={()=>{        
         setSelectedMockup(mockup.id)
         navigate("/mockup")
          }}>Edit</Button>

      <Button variant="contained" onClick={async()=>{   
        
        const res = await axios.post(`${BACKEND_URL}/mockup/delete`,{                       
          mockupId:mockup.id}).then((res)=>{

             console.log(mockup.id)
            const newList = userMockups.filter((m)=>{
              return m.id != mockup.id
            })
            
             setUserMockups(newList)
            
         })
        
       
          
          }}>Delete</Button>
      </Card>}) : null}
   
    </Grid>
    {showSharing ? <SharingForm mockupId={selectedMockup} /> :null}
   </div>
  )
}

export default UserMockups
