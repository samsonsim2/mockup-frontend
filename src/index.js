import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";
import { ThemeProvider } from '@mui/material/styles';
import { AppProvider } from "./context/appContext";
import { theme } from './theme';
import { CssBaseline } from '@mui/material';

 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
  <Auth0Provider
  domain="dev-ar0l70p2.us.auth0.com"
  clientId="jzgWmot98ollqQBdroSHEKhdmILUWBXJ"
  
  
  authorizationParams={{
    redirect_uri: window.location.origin,
    scope: 'openid profile email phone',
    audience:"https://mockup/api"
  }}
>
 
  <ThemeProvider theme={theme}>
    <CssBaseline/>
  <App/>
  </ThemeProvider>

  </Auth0Provider>
  </AppProvider>
  
);

 
