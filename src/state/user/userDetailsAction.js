import * as ActionType from "../actionTypes";
import axios from "axios";

//const axiosInstance = axios.create({baseURL:"http://ec2-54-252-239-111.ap-southeast-2.compute.amazonaws.com:8080/"});
const axiosInstance = axios.create({baseURL:"http://localhost:8080/"});

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
    axiosInstance.post("/patients/update", userDetails, header)
          .then((data)=>{
            console.log("Add UserDetails to store 2: " + JSON.stringify(data.data));          
            dispatch(FetchUserDetailsFromDB(userDetails.userID))
          }).catch((error1)=>{
            console.log("Error updating user details: " + error1)
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
        axiosInstance.get(`/patients/find?userID=${userID}`)
    .then((data)=>{
      let details = data.data;
      console.log("Fetch user details: " + JSON.stringify(details))
      
    })
    .catch((error)=>{
      if(error.response.status == 404){
             axiosInstance.put("patients/save", userDetails, header)
        .then((data)=>{
          let details = data.data;
          dispatch(FetchUserDetailsFromDB(details.userID));
          console.log("Saved UserDetials to DB: " + JSON.stringify(details));
        })
        .catch((error2)=>{
          console.log("Failed to save User Details: " + error2);
        })
      } else if(error.response.status == 301 || error.response.status== 302){
        dispatch(UpdateUserDetailsToDB(userDetails));
      } else {
        console.log("Save user details to DB error: " + error)
      }
      
    });
  }
}


export const FetchUserDetailsFromDB = (userID) =>{
  console.log("FETCH: " + userID)
  return (dispatch)=>{
 
    let header ={
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          "Access-Control-Allow-Origin": "*",
      }
    }
    axiosInstance.get(`patients/find?userID=${userID}`, header)
    .then((data)=>{
      let details = data.data;
      dispatch(AddUserDetailsToStore(details));
    })
    .catch((error)=>{
      if(error.response.status == 301 || error.response.status == 302 ){
        
        dispatch(AddUserDetailsToStore(error.response.data))
      } else {
        console.log("Fetch user details from DB Error: " + error);
      }
    });
  }
}