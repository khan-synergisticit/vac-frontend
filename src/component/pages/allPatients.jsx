import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FetchPatientsCount, FetchAllPatientsFromDB } from "../../state/patients/patientsAction";

let AllPatientsPage = () =>{
    let Count = useSelector((state)=> state.PatientsReducer.User)
    let Patients = useSelector((state) => state.PatientsReducer.Patients)
    let dispatch = useDispatch();

    let [pageNumber, setPageNumber] = useState(1);
    const pageSize = 10;

    useEffect(()=>{
        let pageInfo = {
            pageNumber,
            pageSize
        }
        dispatch(FetchAllPatientsFromDB(pageInfo));
      }, [])
      console.log("PATIENTS 1: " + JSON.stringify(Patients))
    return (
        <>
            {Patients && Patients.length > 0 ? Patients.map((patient)=>{
                return <ul className="patient col-md-11">
                <li className="patient" >
               {patient.firstName}
                   
                </li>
            </ul>
            }) : <h4>Heehaww</h4>}
        </>
    )

}

export default AllPatientsPage;