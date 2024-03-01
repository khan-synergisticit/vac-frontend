import React, {useEffect} from "react";
import logo from "./donkey.png";
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

function ApplicationComponent({ signOut, user } ) {
  let User = useSelector((state) => state.UserReducer.User);
  let dispatch = useDispatch();
  let userName = User && User.userName ? User.userName : "";
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
        return(
          <View className="App">
          <HeaderComponent signOut={signOut} userName={userName}/>
          <Card>
            <Image src={logo} className="App-logo" alt="logo" />
          </Card>
          <FooterComponent/>
        </View>
        );
}

export default withAuthenticator(ApplicationComponent);
