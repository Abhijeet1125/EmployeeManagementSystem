import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  loading as loadingReducer  , emplist as empListReducer } from '../../store/slices/employee_slice'
import { getEmpList } from "../../databaseFunctions/employee"


const EmpList = () => {

    const [newPat , setNewPat ]  = useState("lastname");
    const [newPaton , setNewPaton  ]  = useState("et");
    const [pageno , setPageno] = useState ('1');

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loading = useSelector ( (state) => state.employee.loading);
    const queryParams = new URLSearchParams(location.search);
    const patternOn = queryParams.get('PatternOn');
    const pattern = queryParams.get('Pattern');
    const page = queryParams.get('page') || 1;  


    useEffect (()=>{
        dispatch ( loadingReducer ( true ) )
        const caller = async ()=>{
            try {
                const response = await getEmpList( { on : patternOn , pat : pattern , page : page });
                dispatch ( empListReducer ( response ) );
                dispatch ( loadingReducer ( false));
            } catch (error) {
              console.log ( error );  
            }
        }
        caller () ;         
    },[ patternOn , pattern , page ])



    // const prt = useSelector ( (state) => state.employee.emplist)
    // useEffect ( ()=> {
    //     console.log ( prt , " store me data gya h ye")
    // } ,[loading])

    return (
        <>
            
        </>
    )
}

export default EmpList