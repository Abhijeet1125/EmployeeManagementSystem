import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loading as loadingReducer, emplist as empListReducer } from '../../store/slices/employee_slice'
import { getEmpList  } from "../../databaseFunctions/employee"
import { SearchPattern, Pagination, Table } from '../../components';
import { Loading } from '../../components';



const EmpList = () => {

    const newPat = useSelector(state => state.employee.pattern);
    const newPaton = useSelector(state => state.employee.patternOn);
    const pageno = useSelector(state => state.employee.pageno);



    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loading = useSelector((state) => state.employee.loading);
    const queryParams = new URLSearchParams(location.search);
    const patternOn = queryParams.get('PatternOn');
    const pattern = queryParams.get('Pattern');
    const page = queryParams.get('page') || 1;


    useEffect(() => {
        dispatch(loadingReducer(true))
        const caller = async () => {
            try {
                const response = await getEmpList({ on: patternOn || "", pat: pattern || "", page: page || 1 });
                dispatch(empListReducer(response));
                dispatch(loadingReducer(false));
            } catch (error) {
                console.log(error);
            }
        }
        caller();
    }, [patternOn, pattern, page])


    useEffect(() => {
        navigate(`?PatternOn=${newPaton}&Pattern=${newPat}&page=${pageno}`)
    }, [newPat, newPaton, pageno])

    return (
        <>
            {loading  && <Loading />}
            {!loading  && <>
                <div className='min-h-full bg-gray-100  dark:bg-background-primary '>
                    <div className='p-4'>
                        <SearchPattern path={"employee"} />
                    </div>
                    < div className='p-4'>
                        <Table path={"employee"} listname={"emplist"} />
                    </div>
                    <div className='p-4'>
                        <Pagination path={"employee"} listname={"emplist"} />
                    </div>
                </div >
            </>
            }
        </>
    )
}

export default EmpList