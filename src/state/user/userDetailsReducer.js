import { AddUserDetailsToStore } from "../actionTypes";

const User_State = {
  UserDetails: {
    userID:"",
    firstName:"",
    lastName:"",
    occupation:"",
    phone:"",
    email:"",
    address1:"",
    address2:"",
    city:"",
    state:"",
    zipCode:""
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