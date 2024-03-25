import axios from "axios";
import AxiosState from "../axiosState";
import * as ActionType from "../../state/actionTypes"

const axiosInstance = AxiosState();

export const AddPatientsToStore = (patients) => {
  return {
    type: ActionType.AddPatientsToStore,
    payload: patients,
  }
}

export const AddPatientsCountToStore = (count) =>{
    return {
        type: ActionType.AddPatientsCountToStore,
        payload: count
    }
}

export const  FetchAllPatientsFromDB = (pageInfo) =>{
    console.log("Start all patients fetch, pageNo:" + pageInfo.pageNumber + ", pageSize: " + pageInfo.pageSize)
    return (dispatch)=>{
        let header ={
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Access-Control-Allow-Origin": "*",
            }
          }
          axiosInstance.get(`patients/findAll?pageNo=${pageInfo.pageNumber}&pageSize=${pageInfo.pageSize}`, header)
          .then((data)=>{
            console.log("Fetched COUNT: " + JSON.stringify(data.data))
            dispatch(AddPatientsToStore(data.data.patients));
            dispatch(AddPatientsCountToStore(data.data.count));
            
          }).catch((error)=>{
            if(error.response.status == 301 || error.response.status == 302 ){
                let data = error.response.data;
                console.log("PATIENTS: " + JSON.stringify(data.patients))
                dispatch(AddPatientsToStore(data.patients));
                dispatch(AddPatientsCountToStore(data.count));
            } else {
               console.log("Fetch user details from DB Error: " + error);
            }
          })
    }
  }
  
  export const FetchPatientsCount = () =>{
    return (dispatch)=>{
        let header ={
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Access-Control-Allow-Origin": "*",
            }
          }
          axiosInstance.get("patients/count", header)
          .then((data)=>{
            console.log("Fetched COUNT: " + JSON.stringify(data.data))
            dispatch(AddPatientsCountToStore(data.data))
            
          }).catch((error)=>{
            console.log("Error fetching count: " + error);
          })
    }
  }