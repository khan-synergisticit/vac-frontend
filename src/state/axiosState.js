import axios from "axios";


let AxiosState = () =>{
    const axiosInstance = axios.create({baseURL:"http://ec2-54-252-239-111.ap-southeast-2.compute.amazonaws.com:8080/"});
    //const axiosInstance = axios.create({baseURL:"http://localhost:8080/"});
    return axiosInstance;
}

export default AxiosState;
