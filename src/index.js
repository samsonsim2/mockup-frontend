import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import NavBar from './components/Navbar';
import { Auth0Provider } from "@auth0/auth0-react";
import { ThemeProvider } from '@mui/material/styles';
import { AppProvider } from "./context/appContext";
import { theme } from './theme';
import { CssBaseline } from '@mui/material';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import MockupForm from './components/MockupForm';
import Gif from './components/Gif';
import Sketch from './components/Sketch';
 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
  <Auth0Provider
  domain="dev-ar0l70p2.us.auth0.com"
  clientId="jzgWmot98ollqQBdroSHEKhdmILUWBXJ"
  
  authorizationParams={{
    redirect_uri: window.location.origin,
    scope: 'openid profile email phone'
  }}
>
 
  <ThemeProvider theme={theme}>
    <CssBaseline/>
  <BrowserRouter>
   <NavBar></NavBar>
   <Routes>
     <Route path="/" element={<Landing />}/>
     <Route path="/dashboard" element={<Dashboard />}/>
     <Route path="/mockup" element={<App />}/>
     <Route path="/form" element={<MockupForm />}/>
     {/* <Route path="/gif" element={<Sketch/>}/> */}
  </Routes>
  </BrowserRouter>
  </ThemeProvider>

  </Auth0Provider>
  </AppProvider>
  
);

 
