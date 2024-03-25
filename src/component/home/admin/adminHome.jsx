import React, {useEffect} from "react";
import logo from "./donkey1.png";
import { useDispatch } from "react-redux";
import {
  Image,
  Card,
  View
} from "@aws-amplify/ui-react";
import { FetchPatientsCount } from "../../../state/patients/patientsAction";


let AdminHomePage = () =>{
 

  useEffect(() => {
    FetchPatientsCount();
  },[])

  return(
    <div  style={{
      position: 'absolute', left: '50%', top: '50%',
      transform: 'translate(-50%, -50%)'
      }}>
            <img src={logo} className="App-logo" alt="logo" width={200} />
      </div>
  )

}

export default AdminHomePage;