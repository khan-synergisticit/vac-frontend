import * as ActionType from "../actionTypes";
import axios from "axios";

const axiosInstance = axios.create();

export const AddUserDetailsToStore = (userDetails) => {
  return {
    type: ActionType.AddUserDetailsToStore,
    payload: userDetails,
  }
}



export const SaveUserDetailsToDB = (userDetails)=>{
  
 
  let userID = userDetails.userID;
  return (dispatch)=>{
    axiosInstance.defaults.maxRedirects = 0; 
    axiosInstance.interceptors.response.use(
      response => response,
      error => {
      
        if (error.response && [301, 302].includes(error.response.status)) {
          const redirectUrl = error.response.headers.location;
          console.log("Add UserDetails to store 2: " + JSON.stringify(error.response.data));
          dispatch(AddUserDetailsToStore(error.response.data))
          return axiosInstance.get(redirectUrl);
        }
        return Promise.reject(error);
      }
    );
 
    let header ={
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          "Access-Control-Allow-Origin": "*",
      }
    }
    console.log("fetchUserDetailsFromDB2 : " + typeof(userID) + " " + userID)
    //axiosInstance.get(`http://localhost:8080/userDetails/find?userID=${userDetails}`)
    axiosInstance.get(`http://ec2-54-252-239-111.ap-southeast-2.compute.amazonaws.com:8080/userDetails/find?userID=${userID}`)
    .then((data)=>{
      let details = data.data;
      console.log("Fet userDetails: " + JSON.stringify(data))
      dispatch(AddUserDetailsToStore(details));
    })
    .catch((error)=>{
      console.log("Fetch user from DB Error 2: " + error);
    });
  }
}


export const fetchUserDetailsFromDB = (userDetails) =>{
  return (dispatch)=>{
    axiosInstance.defaults.maxRedirects = 0; 
    axiosInstance.interceptors.response.use(
      response => response,
      error => {
      
        if (error.response && [301, 302].includes(error.response.status)) {
          const redirectUrl = error.response.headers.location;
          console.log("Add UserDetails to store: " + JSON.stringify(error.response.data));
          dispatch(AddUserDetailsToStore(error.response.data))
          return axiosInstance.get(redirectUrl);
        }
        return Promise.reject(error);
      }
    );
 
    let header ={
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          "Access-Control-Allow-Origin": "*",
      }
    }
    console.log("fetchUserDetailsFromDB : " + typeof(userDetails) + " " + userDetails)
    //axiosInstance.get(`http://localhost:8080/userDetails/find?userID=${userDetails}`)
    axiosInstance.get(`http://ec2-54-252-239-111.ap-southeast-2.compute.amazonaws.com:8080/userDetails/find?userID=${userDetails}`)
    .then((data)=>{
      let details = data.data;
      console.log("Fet userDetails: " + JSON.stringify(data))
      dispatch(AddUserDetailsToStore(details));
    })
    .catch((error)=>{
      console.log("Fetch user from DB Error: " + error);
    });
  }
}