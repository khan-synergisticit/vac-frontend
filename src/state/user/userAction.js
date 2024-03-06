import * as ActionType from "../actionTypes";
import axios from "axios";

const axiosInstance = axios.create();



export const AddUserToStore = (newUser) => {
  console.log("Add User to store2 : " + JSON.stringify(newUser));
    return {
        type: ActionType.AddUserToStore,
        payload: newUser
    }
}

export const AddUserDetailsToStore = (userDetails) => {
  return {
    type: ActionType.AddUserDetailsToStore,
    payload: userDetails,
  }
}

export const SaveUserDetailsToDB = (userDetails)=>{
  return (dispatch) =>{
    axios.get("http://localhost:8080/userDetails/find", userDetails.userID)
    //axios.get("http://ec2-54-252-239-111.ap-southeast-2.compute.amazonaws.com:8080/userDetails/find", userDetails.userID)
    .then((data)=>{
      if(data.data == null){
        axios.post("http://localhost:8080/userDetails/save", userDetails)
        //axios.post("http://ec2-54-252-239-111.ap-southeast-2.compute.amazonaws.com:8080/userDetails/save", userDetails)
        .then((data)=>{
          let savedDetails = data.data;
          dispatch(fetchUserDetailsFromDB(savedDetails.userID));
        })
        .catch((error)=>{
          console.log("Save User details to DB Error: " + error)
        })
      } else {
        axios.put("http://localhost:8080/userDetails/update", userDetails)
        //axios.put("http://ec2-54-252-239-111.ap-southeast-2.compute.amazonaws.com:8080/userDetails/update", userDetails)
        .then((data) => {
          let savedUser = data.data;
          dispatch(FetchUserFromDB(savedUser.userID)) 
        })
        .catch((error)=>{
          console.log("Update User details to DB Error: " + error)
        })
      }
    })
  }
}

export const SaveUserToDB = (newUser)=>{
  return (dispatch)=>{
    axios.get("http://localhost:8080/users/find", newUser)
    //axios.get("http://ec2-54-252-239-111.ap-southeast-2.compute.amazonaws.com:8080/users/find", newUser)
    .then((data)=>{
      if(data.data == null){
        axios.post("http://localhost:8080/users/save", newUser)
        //axios.post("http://ec2-54-252-239-111.ap-southeast-2.compute.amazonaws.com:8080/users/save", newUser)
        .then((data) => {
          let savedUser = data.data;
          dispatch(FetchUserFromDB(savedUser.userID)) 
        })
        .catch((error)=>{
          console.log("Save User to DB Error: " + error)
        })
      } else {
        axios.put("http://localhost:8080/users/update", newUser)
        //axios.put("http://ec2-54-252-239-111.ap-southeast-2.compute.amazonaws.com:8080/users/update", newUser)
        .then((data) => {
          let savedUser = data.data;
          dispatch(FetchUserFromDB(savedUser.userID)) 
        })
        .catch((error)=>{
          console.log("Update User to DB Error: " + error)
        })
      }
    })
    
  }
}

export const FetchUserFromDB = (user) =>{
  return (dispatch)=>{
    axiosInstance.defaults.maxRedirects = 0; 
    axiosInstance.interceptors.response.use(
      response => response,
      error => {
      
        if (error.response && [301, 302].includes(error.response.status)) {
          const redirectUrl = error.response.headers.location;
          console.log("Add User to store: " + JSON.stringify(error.response.data));
          dispatch(AddUserToStore(error.response.data))
          return axiosInstance.get(redirectUrl);
        }
        return Promise.reject(error);
      }
    );
 
    let header ={
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }
    }
    axiosInstance.post("http://localhost:8080/users/find", user, header)
    //axiosInstance.get("http://ec2-54-252-239-111.ap-southeast-2.compute.amazonaws.com:8080/users/find", user, header)
    .then((data)=>{
      let user = data.data;
      console.log("Fetuser: " + JSON.stringify(data.data))
      dispatch(AddUserToStore(user));
    })
    .catch((error)=>{
      console.log("Fetch user from DB Error: " + error);
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
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }
    }
    axiosInstance.post("http://localhost:8080/userDetails/find", user, header)
    //axiosInstance.get("http://ec2-54-252-239-111.ap-southeast-2.compute.amazonaws.com:8080/userDetails/find", userDetails, header)
    .then((data)=>{
      let details = data.data;
      console.log("Fet userDetails: " + JSON.stringify(data.data))
      dispatch(AddUserDetailsToStore(details));
    })
    .catch((error)=>{
      console.log("Fetch user from DB Error: " + error);
    });
  }
}