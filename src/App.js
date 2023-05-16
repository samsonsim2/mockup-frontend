import React from 'react'
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/sharedComponents/Navbar';
import Landing from './pages/Landing';
import Mockup from './pages/Mockup';
import MockupForm from './components/dashboardComponents/CreateMockupForm';
import Dashboard from './pages/Dashboard';
import Error from "./pages/Error"

 
const App = () => {

  return (
  <BrowserRouter>
   {/* <NavBar></NavBar> */}
   <Routes>
      <Route path="/" element={<Landing />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/mockup" element={<Mockup />}/>         
      <Route path="*" element={<Error/>}/>          
  </Routes>  
  </BrowserRouter>
  )
}

export default App
