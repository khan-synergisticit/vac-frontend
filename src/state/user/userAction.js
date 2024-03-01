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

export const SaveUserToDB = (newUser)=>{
  return (dispatch)=>{
    axios.post("http://3.26.185.123:8080/users/saveUser", newUser)
    .then((data) => {
      let savedUser = data.data;
      dispatch(FetchUserFromDB(savedUser.userID)) 
    })
    .catch((error)=>{
      console.log("Save User to DB Error: " + error)
    })
  }
}

export const FetchUserFromDB = (user) =>{
  console.log("Fetch User from DB: " + JSON.stringify(user))
  return (dispatch)=>{
    axiosInstance.defaults.maxRedirects = 0; // Set to 0 to prevent automatic redirects
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
    axiosInstance.post("http://3.26.185.123:8080/users/finduser", user)
    .then((data)=>{
      let user = data.data;
      console.log("Fetuser: " + JSON.stringify(data.data))
      dispatch(SaveUserToDB(user));
    })
    .catch((error)=>{
      console.log("Fetch user from DB Error: " + error);
    });
  }
}