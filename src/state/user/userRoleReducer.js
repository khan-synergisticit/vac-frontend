import {  AddUserRoleToStore } from "../actionTypes";

const UserRole_State = {
  Role: {
    role: ""
  },

}

let UserRoleReducer = (state = UserRole_State, action) => {
  switch(action.type) {
      case AddUserRoleToStore:
          return {...state, Role:action.payload}
      default:
          return state;
  }
}

export default UserRoleReducer;