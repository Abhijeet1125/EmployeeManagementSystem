import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loading as loadingReducer, desiglist as desigListReducer, pattern as patternReducer, patternOn as patternOnReducer } from '../../store/slices/designation_slice';
import { getDesigList } from "../../databaseFunctions/designation";
import { SearchPattern, Pagination, Table } from '../../components';
import { Loading } from '../../components';

const DesignationList = () => {
  const newPat = useSelector(state => state.designation.pattern);
  const newPaton = useSelector(state => state.designation.patternOn);
  const pageno = useSelector(state => state.designation.pageno);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.designation.loading);
  const queryParams = new URLSearchParams(location.search);
  const patternOn = queryParams.get('PatternOn');
  const pattern = queryParams.get('Pattern');
  const page = queryParams.get('page') || 1;

  useEffect(() => {
    dispatch(loadingReducer(true));
    const caller = async () => {
      try {
        const response = await getDesigList({ on: patternOn || "", pat: pattern || "", page: page || 1 });
        dispatch(desigListReducer(response));
        dispatch(loadingReducer(false));
      } catch (error) {
        console.log(error);
      }
    }
    caller();
  }, [patternOn, pattern, page]);

  useEffect(() => {
    navigate(`?PatternOn=${newPaton}&Pattern=${newPat}&page=${pageno}`);
  }, [newPat, newPaton, pageno]);

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <>
          <div className='min-h-full bg-gray-100 dark:bg-background-primary'>
            <div className='p-4'>
              <SearchPattern path={"designation"} patternReducer={patternReducer} patternOnReducer={patternOnReducer} />
            </div>
            <div className='p-4'>
              <Table path={"designation"} listname={"desiglist"} />
            </div>
            <div className='p-4'>
              <Pagination path={"designation"} listname={"desiglist"} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default DesignationList;
