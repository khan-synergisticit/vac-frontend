import {  AddPatientsCountToStore, AddPatientsToStore } from "../actionTypes";

const Patients_State = {
  Patients:[],
  Count: 0,
}

let PatientsReducer = (state = Patients_State, action) => {
  switch(action.type) {
      case AddPatientsCountToStore:
          return {...state, Count:action.payload}
      case AddPatientsToStore:
            return {...state, Patients:action.payload}
      default:
          return state;
  }
}

export default PatientsReducer;