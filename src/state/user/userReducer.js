import { AddUserToStore } from "../actionTypes";

const User_State = {
  User: {
    userID: "",
    userName: "",
    role: "user"
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