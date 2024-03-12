import { AddUserDetailsToStore } from "../actionTypes";

const User_State = {
  UserDetails: {
    userID:"",
    firstName:"",
    lastName:"",
    email:"",
    address:"",
    city:"",
    state:"",
    zipcode:"",
    birthDate:"",
  },
  AllUserDetails:[]
}

let UserDetailsReducer = (state = User_State, action) => {
  switch(action.type) {
      case AddUserDetailsToStore:
          return {...state, UserDetails:action.payload}
      default:
          return state;
  }
}

export default UserDetailsReducer;