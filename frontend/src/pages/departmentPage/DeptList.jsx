import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loading as loadingReducer, deptlist as departmentReducer , pattern as patternReducer , patternOn as patternOnReducer } from '../../store/slices/department_slice'
import {  getDeptList } from "../../databaseFunctions/department"
import { SearchPattern, Pagination, Table } from '../../components';
import { Loading } from '../../components';



const EmpList = () => {

    const newPat = useSelector(state => state.department.pattern);
    const newPaton = useSelector(state => state.department.patternOn);
    const pageno = useSelector(state => state.department.pageno);



    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loading = useSelector((state) => state.department.loading);
    const queryParams = new URLSearchParams(location.search);
    const patternOn = queryParams.get('PatternOn');
    const pattern = queryParams.get('Pattern');
    const page = queryParams.get('page') || 1;


    useEffect(() => {
        dispatch(loadingReducer(true))
        const caller = async () => {
            try {
                const response = await getDeptList({ on: patternOn || "", pat: pattern || "", page: page || 1 });
                dispatch(departmentReducer(response));
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
                        <SearchPattern path={"department" }  patternReducer={patternReducer} patternOnReducer={patternOnReducer} />
                    </div>
                    < div className='p-4'>
                        <Table path={"department"} listname={"deptlist"} />
                    </div>
                    <div className='p-4'>
                        <Pagination path={"department"} listname={"deptlist"} />
                    </div>
                </div >
            </>
            }
        </>
    )
}

export default EmpList