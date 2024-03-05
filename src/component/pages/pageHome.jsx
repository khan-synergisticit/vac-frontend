import React from "react";
import logo from "./donkey.png";
import {
  Image,
  Card,
  View
} from "@aws-amplify/ui-react";
let HomePage = () =>{
  
  return(
    
    <div  style={{
      position: 'absolute', left: '50%', top: '50%',
      transform: 'translate(-50%, -50%)'
      }}>
            <img src={logo} className="App-logo" alt="logo" />
          
      </div>
  )

}

export default HomePage;