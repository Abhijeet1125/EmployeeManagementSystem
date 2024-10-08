import axios from 'axios';
import { apiUrl } from '../../constants';


const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true, 
});


const getEmpList = async ({on , pat , page })=>{
    try {
        const response = await axiosInstance.get (`/employee/list?PatternOn=${on}&Pattern=${pat}&page=${page}`)
        // console.log ("emp list ", response.data.data , "response mila ye")
        return response.data.data;
    } catch (error) {
        console.log ( "error is fetching emplist " , error )
        throw error 
    }
}


export  { getEmpList }
