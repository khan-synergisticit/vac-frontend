import { AddUserToStore } from "../actionTypes";

const User_State = {
  User: {
    userID: "",
    userName: "",
    role: "user"
  },
  UserDetails: {
    userID:"",
    firstName:"",
    lastName:"",
    occupation:"",
    address: {address1:"",
    address2:"",
    city:"",
    state:"",
    zipcode:""},
    gender:"",
    medicalHistory:[]
  }
}

let UserReducer = (state = User_State, action) => {
  switch(action.type) {
      case AddUserToStore:
          return {...state, User:action.payload}
      default:
          return state;
  }
}

export default UserReducer;