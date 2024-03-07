import React, {useEffect, useState, Suspense} from "react";
import ClipLoader from "react-spinners/ClipLoader";

import "@aws-amplify/ui-react/styles.css";
import HeaderComponent from "../header/header";
import FooterComponent from "../footer/footer";
import { useSelector, useDispatch } from "react-redux";
import { FetchUserFromDB } from "../../state/user/userAction";
import {
  withAuthenticator,
  Image,
  View,
  Card,
  
} from "@aws-amplify/ui-react";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import UserRouter from "../userRoutes/userRoutes.jsx";

function ApplicationComponent({ signOut, user } ) {
  let [loading, setLoading] = useState(true);

  let User = useSelector((state) => state.UserReducer.User);
  let dispatch = useDispatch();
  let userName = User && User.userName ? User.userName : "";
  let isAdmin = User.role == "admin";

  useEffect(()=>{
    if(userName == ""){
      let newUser = {
        userID : user.userId,
        userName: user.username,
        role: "user"
      }
      dispatch(FetchUserFromDB(newUser));
    }
  }, [])
      console.log("userName: " + JSON.stringify(userName))

      let TempComp = () =>{
        return (
          <Card>
            <Image src={logo} className="App-logo" alt="logo" />
          </Card>
        )
      }

      let Circle = () => {
        return (
          <ClipLoader
         
            loading={loading}
            
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )
      }
        return(
          <View className="App">
          <Router>
          <HeaderComponent signOut={signOut} userName={userName} isAdmin={isAdmin}/>
          <div  style={{
              
              display: "flex",
              flexDirection: "column",
              overflowY: "scroll"
          }}>
          
          {userName == "" ? <Circle/> : <UserRouter isAdmin={isAdmin}/>}
          
          
         
          </div>
          <FooterComponent/>
           </Router>
        </View>
        );
}

export default withAuthenticator(ApplicationComponent);


// position: 'fixed', left: '50%', top: '50%',
//               transform: 'translate(-50%, -50%)',