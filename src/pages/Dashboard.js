import { Button, Card, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/appContext' 
import axios from "axios";
 
import { BACKEND_URL } from '../constants';
import SharingForm from '../components/SharingForm';
import UserMockups from '../components/UserMockups';
import SharedMockups from '../components/SharedMockups';
 
const Dashboard = () => {
  const{userId} = useAppContext()
  const {userMockups,setUserMockups}=useAppContext()
  const [dashboardView,setDashboardView] = useState("sharedMockups")

  
  useEffect(()=>{
    if(userId && dashboardView==="userMockups"){
      async function getMockups(){      
        const res = await axios.post(`${BACKEND_URL}/mockup`,{                       
            userId:userId}).then((res)=>{
                setUserMockups(res.data)          
           })
      
    }
    
    getMockups()

    }

    if(userId && dashboardView==="sharedMockups"){
      async function getSharedMockups(){      
        const res = await axios.post(`${BACKEND_URL}/mockup/shared`,{                       
            userId:userId}).then((res)=>{
                setUserMockups(res.data)   
                console.log(res.data)       
           })
      
    }
    
    getSharedMockups()

    }

    
    
    
  },[userId,dashboardView])
  return (
    <div>
    <Button onClick={()=>{setDashboardView("userMockups")}}>My Mockups</Button>
    <Button onClick={()=>{setDashboardView("sharedMockups")}}>Shared Mockups</Button>
    {dashboardView === "userMockups"?<UserMockups/>:null}
    {dashboardView === "sharedMockups"?<SharedMockups/>:null}
    </div>
  )
}

export default Dashboard
