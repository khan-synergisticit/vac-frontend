import * as ActionType from "../actionTypes";
import axios from "axios";

const axiosInstance = axios.create({baseURL:"http://ec2-54-252-239-111.ap-southeast-2.compute.amazonaws.com:8080/"});

export const AddUserDetailsToStore = (userDetails) => {
  return {
    type: ActionType.AddUserDetailsToStore,
    payload: userDetails,
  }
}


export const UpdateUserDetailsToDB = (userDetails) => {
  return (dispatch) =>{
    let header ={
      headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
      }
    }
    axiosInstance.post("/userDetails/update", userDetails, header)
          .then((data)=>{
            console.log("Add UserDetails to store 2: " + JSON.stringify(data.data));          
            dispatch(AddUserDetailsToStore(data.data))
          }).catch((error1)=>{
            console.log("Eror updating user details: " + error1)
          })
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
    axiosInstance.defaults.maxRedirects = 0; 
    axiosInstance.interceptors.response.use(
      response => response,
      error => {
        if (error.response && [301, 302].includes(error.response.status)) {
          const redirectUrl = error.response.headers.location;
          // console.log("1")
          // dispatch(UpdateUserDetailsToDB(error.response.data));          
          return axiosInstance.get(redirectUrl);
        }
        return Promise.reject(error);
      }
    );
 
    
    //axiosInstance.get(`http://localhost:8080/userDetails/find?userID=${userDetails}`)
    axiosInstance.get(`/userDetails/find?userID=${userID}`)
    .then((data)=>{
      let details = data.data;
      console.log("Fet userDetails: " )
      
    })
    .catch((error)=>{
      console.log("2: " + error)
      
      if(error.response.status == 404){
        console.log("4")
        axiosInstance.put("userDetails/save", userDetails, header)
        .then((data)=>{
          let details = data.data;
          dispatch(AddUserDetailsToStore(details));
          console.log("Saved UserDetials to DB: " + JSON.stringify(details));
        })
        .catch((error2)=>{
          console.log("Failed to save User Details: " + error2);
        })
      } else if(error.response.status == 301 || error.response.status== 302){
        console.log("5")
        console.log("REsponse status: "+ error.response.status);
      } else {
        console.log("ERROR: " + error)
      }
      
    });
  }
}


export const fetchUserDetailsFromDB = (userDetails) =>{
  return (dispatch)=>{
    /* axiosInstance.defaults.maxRedirects = 0; 
    axiosInstance.interceptors.response.use(
      response => response,
      error => {
      
        if (error.response && [301, 302].includes(error.response.status)) {
          const redirectUrl = error.response.headers.location;
          //console.log("Add UserDetails to store: " + JSON.stringify(error.response.data));
          dispatch(AddUserDetailsToStore(error.response.data))
          return axiosInstance.get(redirectUrl);
        }
        return Promise.reject(error);
      }
    ); */
 
    let header ={
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          "Access-Control-Allow-Origin": "*",
      }
    }
    console.log("fetchUserDetailsFromDB : " + typeof(userDetails) + " " + userDetails)
    //axiosInstance.get(`http://localhost:8080/userDetails/find?userID=${userDetails}`)
    axiosInstance.get(`userDetails/find?userID=${userDetails}`)
    .then((data)=>{
      let details = data.data;
      //.log("Fet userDetails: " + JSON.stringify(data))
      dispatch(AddUserDetailsToStore(details));
    })
    .catch((error)=>{
      if(error.response.status == 301 || error.response.status == 302 ){
        console.log("Fetch user from DB Error: " + error);
      }
      //console.log("Fetch user from DB Error: " + error);
    });
  }
}