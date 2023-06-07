import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useAuth0 } from "@auth0/auth0-react"; 
import axios from "axios"; 
import { BACKEND_URL } from '../constants';
import { useEffect, useState,useRef } from 'react'
import NavBar from '../components/sharedComponents/Navbar';
import { useAppContext } from '../context/appContext';
import { Button, Card, CardActions, CardContent, CardMedia, Fab, Stack } from '@mui/material';
import MockupForm from '../components/dashboardComponents/CreateMockupForm';
 import formatDateFromSequelize from "../components/utils"
 import FolderSharedIcon from '@mui/icons-material/FolderShared';
 import EditIcon from '@mui/icons-material/Edit';
 import DeleteIcon from '@mui/icons-material/Delete';
 import AddIcon from '@mui/icons-material/Add';
import { useMobileView } from '../components/utils';
import DeleteModal from '../components/dashboardComponents/DeleteModal';
import SharingForm from '../components/dashboardComponents/SharingForm';
import { useNavigate } from 'react-router';
import ShareIcon from '@mui/icons-material/Share';
import WorkIcon from '@mui/icons-material/Work';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

 
const menu = [
  ["My mockups",  <WorkIcon  />],
  ["Shared mockups",<ShareIcon/>],
  ["Profile",< AccountCircleIcon/>],
   
 
];

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Dashboard() {

  const navigate = useNavigate();

 const { user,isAuthenticated,getAccessTokenSilently } = useAuth0();    
 const {accessToken,setAccessToken,setProfilePic,setProfileInput,setUserMockups,setCurrentUserId,currentUserId,userMockups,selectedMockup,setSelectedMockup}=useAppContext()

  //Check Mobile view
 const isMobile = useMobileView();
  // Side bar state
  const {open,setOpen}= useAppContext()
  // Mockup form modal
  const [openMockupForm,setOpenMockupForm]= useState(false)
   // Confirm delete modal
   const [openConfirmDelete,setOpenConfirmDelete]= useState(false)
   // Sharing Modal 
   const [openSharingForm,setOpenSharingForm]= useState(false)

 
  // Dashboard View 
  const [dashboardView,setDashboardView] = useState("My mockups")
  const [token,setToken]= useState("My mockups")

// Get jwt token + set currentUserId
  useEffect(()=>{
    if(isAuthenticated){
      
    async function getToken(){
            let accessToken = await getAccessTokenSilently();
            setAccessToken(accessToken)
        
            const {email,given_name,family_name}=user
            
            const res = await axios.post(`${BACKEND_URL}/auth/register`, {                       
                email:email,firstName:given_name,lastName:family_name }).then((res)=>{
                   
                     
                    setCurrentUserId(res.data.id)                       
                })              
     }  
     
     getToken()  
     
    }          
},[isAuthenticated,getAccessTokenSilently])

  
useEffect( ()=>{

    // GET mockups CREATED by user 
    if(currentUserId && dashboardView==="My mockups" && accessToken){
      
      async function getMockups(){      
         
        console.log(accessToken)
        const res = await axios.get(`${BACKEND_URL}/mockup/${currentUserId}` , {headers: {
          Authorization: `Bearer ${accessToken}`,
        }}
        ).then((res)=>{
            console.log(token)
                setUserMockups(res.data)   
                console.log(res.data)       
           })    
    }    
    getMockups()
    }

    // GET mockups SHARED by user
    if(currentUserId && dashboardView==="Shared mockups"  && accessToken){
      async function getSharedMockups(){      
         
        console.log(accessToken)
        const res = await axios.get(`${BACKEND_URL}/mockup/sharedmockups/${currentUserId}`, {headers: {
          Authorization: `Bearer ${accessToken}`,
        }} 
        ).then((res)=>{
                setUserMockups(res.data)    
                console.log(res.data)                    
           })      
    }    
    getSharedMockups()
    }
  },[currentUserId,dashboardView,accessToken])



  const theme = useTheme();

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (

    <Box sx={{ display: 'flex' }}>

    {/* MODALS */}
       <DeleteModal setOpenConfirmDelete={setOpenConfirmDelete} openConfirmDelete={openConfirmDelete}/>
       <MockupForm  setOpenMockupForm={setOpenMockupForm} openMockupForm={openMockupForm} />
       <SharingForm setOpenSharingForm={setOpenSharingForm} openSharingForm={openSharingForm}/>






      <CssBaseline />
      <AppBar position="fixed" open={open}>
       <NavBar/>
      </AppBar>
      <Drawer
        sx={{
          display:"flex",
          justifyContent:"space-between",
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menu.map((item, index) => (
            <ListItem key={index} disablePadding onClick={()=>setDashboardView(item[0])}>
              <ListItemButton>
                <ListItemIcon>
                    {item[1]}
                </ListItemIcon>
                <ListItemText primary={item[0]} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box sx={{height:"100%"  ,display:"flex", alignItems:"flex-end", p :"10px"}}> <Typography  fontWeight="bold"> Welcome  {user?.given_name} {user?.family_name} </Typography></Box>
        
      </Drawer>
      <Main sx={{height:"100vh",display:'flex',flexDirection:"column", backgroundColor:"#F5F5F5"}}open={open}>
        {/* <DrawerHeader /> */}
        <Box  width="100%" sx={{display:'flex',justifyContent:"flex-end",mt:4}}>
          {isMobile? <Fab color="primary" aria-label="add"  onClick={()=>{setOpenMockupForm(!openMockupForm)
          }}>
        <AddIcon />
      </Fab>: <Button sx={{alignSelf:"flex-end",mt:4  }} variant="contained" 
          onClick={()=>{setOpenMockupForm(!openMockupForm)
          }}><AddIcon sx={{marginRight:"5px"}}/>Create Mockup</Button>}
         
        </Box>

        <Typography fontSize="1rem" sx={{mb:4}}>{userMockups.length} Mockups</Typography>
        
        <Box display="grid"  sx={{ columnGap:"10px",
        rowGap:"20px",gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))',}}>
        {userMockups.map((mockup,index)=>{
        return   <Card key={index} sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={mockup?.imageUrl ? mockup.imageUrl : mockup?.Mockup?.imageUrl}        
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{textTransform:"capitalize"}}>
            {mockup.userName? mockup.userName : mockup?.Mockup?.userName}
          </Typography>   
          {dashboardView==="Shared mockups" ?<Typography>Shared by:{mockup?.Mockup?.createdBy}</Typography>: null}
        
        </CardContent>
        <CardActions   sx={{display:"flex",justifyContent: 'space-between',paddingRight:2,paddingLeft:2,}} >
          <Box> 
          <Typography fontSize="0.6rem"> Last Updated: {formatDateFromSequelize(mockup.updatedAt)}</Typography>
          </Box>
         
         <Stack direction="row" spacing={1}> 



        
          {/*SHARE BUTTON (only allow sharing for user's own mockup) */}  
          {dashboardView==="My mockups" ?
            <IconButton onClick={()=>{
              setSelectedMockup(mockup.id)
              setOpenSharingForm(true)
            }}><FolderSharedIcon /></IconButton> : null }

          {/*EDIT BUTTON */}  
            <IconButton onClick={(e)=>{
              console.log(mockup.id)
           
              setSelectedMockup(mockup.id)
            
              navigate('/mockup')
            }}><EditIcon/></IconButton>      

          {/*DELETE BUTTON (only allow deletion for user's own mockup) */}  
          {dashboardView==="My mockups" ?
            <IconButton onClick={()=>{
              setSelectedMockup(mockup.id)
              setOpenConfirmDelete(true)
            }}><DeleteIcon />  </IconButton> : null }        
          </Stack>
        </CardActions>
      </Card>
           })}
        </Box>

        
      
      </Main>
    </Box>
  );
}