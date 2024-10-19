import axios from 'axios';
import { apiUrl } from '../../constants';


const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true, 
});


const getDesigList = async ({on , pat , page })=>{
    try {
        const response = await axiosInstance.get (`/designation/list?PatternOn=${on}&Pattern=${pat}&page=${page}`)
        return response.data.data;
    } catch (error) {
        console.log ( "error is fetching emplist " , error )
        throw error 
    }
}


export  { getDesigList }
