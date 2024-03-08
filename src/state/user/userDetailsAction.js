import * as ActionType from "../actionTypes";
import axios from "axios";

const axiosInstance = axios.create();
const axiosInstance2 = axios.create();
export const AddUserDetailsToStore = (userDetails) => {
  return {
    type: ActionType.AddUserDetailsToStore,
    payload: userDetails,
  }
}



export const SaveUserDetailsToDB = (userDetails)=>{
  
 
  let userID = userDetails.userID;
  return (dispatch)=>{
    let header ={
      headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
      }
    }
    axiosInstance2.defaults.maxRedirects = 0; 
    axiosInstance2.interceptors.response.use(
      response => response,
      error => {
        
        if (error.response && [301, 302].includes(error.response.status)) {
          const redirectUrl = error.response.headers.location;
          axiosInstance2.put("http://ec2-54-252-239-111.ap-southeast-2.compute.amazonaws.com:8080/userDetails/update", error.response.data, header)
          .then((data)=>{
            let updated = data.data;
            console.log("Add UserDetails to store 2: " + JSON.stringify(error.response.data));          
            dispatch(AddUserDetailsToStore(error.response.data))
          }).catch((error)=>{
            console.log("Eror updating user details: " + error)
          })
          
          return axiosInstance2.get(redirectUrl);
        }
        return Promise.reject(error);
      }
    );
 
    
    console.log("fetchUserDetailsFromDB2 : " + typeof(userID) + " " + userID)
    //axiosInstance.get(`http://localhost:8080/userDetails/find?userID=${userDetails}`)
    axiosInstance2.get(`http://ec2-54-252-239-111.ap-southeast-2.compute.amazonaws.com:8080/userDetails/find?userID=${userID}`)
    .then((data)=>{
      let details = data.data;
      console.log("Fet userDetails: " + JSON.stringify(data))
      
    })
    .catch((error)=>{
      
      console.log("Fetch user from DB Error 2: " + error + " " + error.response.status);
      if(error.response.status != undefined){
        if(error.response.status == 404){
          axiosInstance2.post("http://ec2-54-252-239-111.ap-southeast-2.compute.amazonaws.com:8080/userDetails/save", userDetails, header)
          .then((data)=>{
            let details = data.data;
            dispatch(AddUserDetailsToStore(details));
            console.log("Saved UserDetials to DB: " + JSON.stringify(details));
          })
          .catch((error2)=>{
            console.log("Failed to save User Details: " + error2);
          })
        }
      }
     
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