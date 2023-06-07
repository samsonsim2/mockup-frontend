import { Box } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppContext } from '../../context/appContext';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';
const DeletableBox = ({image,index,array,setArray,id}) => {

    let currentIndex = index

    const {setStock,setCropReset,cropReset}=useAppContext()
  return (<>
  <Box sx={{position:"relative",width:"fit-content"}}>
    <Box  component="img"  src={image} sx={{width:"40px", height:"40px",objectFit:"cover",borderRadius:"10px",cursor:"pointer"}}
  onClick={ ()=>{        
   setStock({imageUrl:image,croppedImageUrl:null})
   setCropReset(!cropReset)
   console.log(image)    
  }}     
   >
   
   </Box>
    <DeleteIcon  sx={{position:"absolute", bottom:0,right:0,cursor:"pointer"}} onClick={()=>{
         
        if (array.length > 1){
        const newArray = array.filter((item,index)=> 
            index != currentIndex
         )
         
        setArray(newArray)
        }

        else setArray([])

        const assets = axios.delete(`${BACKEND_URL}/mockup/asset/${id}`)  

         
         
    }}/>
    </Box>
    </>
  )
}

export default DeletableBox
