import { useState, useEffect, useReducer, useContext } from "react";
// import { database, storage } from "../firebase";
// import { onChildAdded, push, ref, set } from "firebase/database";
import React from "react";
import ReactDOM from "react-dom/client";
// Create context
const AppContext = React.createContext();

 
// const username = localStorage.getItem('username')

// Create Provider
const AppProvider = ({ children }) => {
  // State values
  
  // Form data 
  const initDetails={
    cta:"Learn more",
    message:"lorem ipsum dolor",
    brandName:"",
    storiesCta:"Learn moree"
  
  }

 
  const [userId, setUserId] = useState("");
  const[userMockups,setUserMockups]=useState([])
  const [selectedMockup,setSelectedMockup]=useState()
  const [mockup,setMockup] = useState() 
  const [template,setTemplate]=useState("images/feed.png")
  const [values,setValues] = useState(initDetails)
 
 

  return (
    <AppContext.Provider
      value={{
       userId,
       setUserId,
       userMockups,
       setUserMockups,
       selectedMockup,
       setSelectedMockup,
       template,
       setTemplate,
       setValues,
       values,
       mockup,
       setMockup
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Exports

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
