import React from "react";
import * as ReactDOM from "react-dom/client"
import { Provider } from "react-redux";
import ApplicationComponent from "./component/app/app";
import store from "./state/store";
import { Amplify } from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
        <ApplicationComponent/>
    </Provider>

)

//"start": "concurrently \"cd ./server && npm start\" \"cd ./app && npm start\""
