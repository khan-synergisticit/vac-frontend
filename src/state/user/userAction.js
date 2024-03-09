import * as ActionType from "../actionTypes";
import axios from "axios";

const axiosInstance = axios.create({baseURL:"http://ec2-54-252-239-111.ap-southeast-2.compute.amazonaws.com:8080/"});
//const axiosInstance = axios.create({baseURL:"http://localhost:8080/"});


export const AddUserToStore = (newUser) => {
  console.log("Add User to store2 : " + JSON.stringify(newUser));
    return {
        type: ActionType.AddUserToStore,
        payload: newUser
    }
}



export const SaveUserToDB = (newUser)=>{
  return (dispatch)=>{
    axiosInstance.post("users/save", newUser)
        .then((data) => {
          let savedUser = data.data;
          dispatch(FetchUserFromDB(savedUser)) 
        })
        .catch((error)=>{
          console.log("Save User to DB Error: " + error)
        })
    
  }
}

export const FetchUserFromDB = (user) =>{
  return (dispatch)=>{   
 
    let header ={
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }
    }
    axiosInstance.post("users/find", user, header)
    .then((data)=>{
      let user = data.data;
      console.log("Fetch user: " + JSON.stringify(data.data))
      dispatch(AddUserToStore(user));
    })
    .catch((error)=>{
      console.log("User fetch error: " + error)
      if(error.response.status == 301 || error.response.status == 302 ){
        
        dispatch(AddUserToStore(error.response.data))
      } else if(error.response.status == 404 ){
        console.log("User fetch 404 error: " + error)
        dispatch(SaveUserToDB(user));
      } else {
        console.log("Fetch user from DB Error: " + error);
      }
    });
  }
}
