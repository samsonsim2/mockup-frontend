import { useState, useEffect, useReducer, useContext, useRef } from "react";
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
    storiesCta:"Learn moree",
    location:"Location",
    addYours:"write prompt"
  
  }
  const stockImages =[
    "/images/placeholder/woman.png",
    "/images/placeholder/man.png",
    "/images/placeholder/group.png",
    "/images/placeholder/product1.png",
    "/images/placeholder/product2.png",
  ]
 
  
 

  const filters={
    brightness:1,
    saturation:1,
    contrast:1
  }

  
  const canvasRef = useRef(null);
  function setCanvasRef(ref) {
    canvasRef.current = ref;
}
//AUTHENTICATION INFO
const [currentUserId, setCurrentUserId] = useState("");
const [open, setOpen] = React.useState(false);
//MOCKUP DATA
const[userMockups,setUserMockups]=useState([])
const [selectedMockup,setSelectedMockup]=useState(null)
const [mockup,setMockup] = useState() 


  const [template,setTemplate]=useState("images/feed.png")
  const [values,setValues] = useState(initDetails) 
  const [filterValues,setFilterValues] = useState(filters)
  const [isDrawing,setIsDrawing] = useState(false)
  const [locationSticker,setLocationSticker]=useState(false)
  const [addYoursSticker,setAddYoursSticker]=useState(false)
  const [imagesArray,setImagesArray] = useState(stockImages)
const [testArray,setTestArray] = useState([])
  const[cropReset,setCropReset]=useState(true)
 

  const initData =   {
     
    imageUrl:stockImages[0],
    croppedImageUrl:null
  } 

  const [stock,setStock] =useState(initData)
  const [selectedStock,setSelectedStock] = useState(null) 

  const onCancel =()=>{
    setSelectedStock(null)
        
  }

  const  setCroppedImageFor =(crop,zoom,aspect,croppedImageUrl)=>{      
    const newStock = {...stock, croppedImageUrl,crop,zoom,aspect}
    console.log(newStock )
    setStock(newStock)
    setSelectedStock(null)  
  }

  const resetImage = ( )=>{
    setCroppedImageFor()
  }


 

  return (
    <AppContext.Provider
      value={{
        //Navbar
        open,
        setOpen,

       //Authentication Info
       currentUserId,
       setCurrentUserId,
       
       
        onCancel,
        setCroppedImageFor,
        resetImage,
       
       userMockups,
       setUserMockups,
       selectedMockup,
       setSelectedMockup,
       template,
       setTemplate,
       setValues,
       values,
       mockup,
       setMockup,
       filterValues,
       setFilterValues,       
       stock,
       setStock,
       stockImages,
       selectedStock,
       setSelectedStock,
       isDrawing,setIsDrawing,
       canvasRef,
       setCanvasRef,
       locationSticker,
       setLocationSticker,
       setAddYoursSticker,
       addYoursSticker,
       cropReset,
       setCropReset,imagesArray,
       setImagesArray,
       testArray,
       setTestArray
        
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
