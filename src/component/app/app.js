// import React, { useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, useNavigate, redirect} from "react-router-dom";

// import "../app.css";
import logo from "./donkey.png";
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";

let ApplicationComponent =({ signOut }) =>{
        return(
          <View className="App">
          <Card>
            <Image src={logo} className="App-logo" alt="logo" />
            <Heading level={1}>We now have Auth!</Heading>
          </Card>
          <Button onClick={signOut}>Sign Out</Button>
        </View>
        );
}

export default withAuthenticator(ApplicationComponent);
