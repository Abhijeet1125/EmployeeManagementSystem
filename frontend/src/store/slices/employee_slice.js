import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    emplist: {},
    headers: {
        "First Name" :"firstname",
        "Last Name" : "lastname",
        "Email" : "email",
        "Gender" : "gender",
        "Payment From" :  "payfrom",
    },
    loading: true ,


};

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        loading : (state, action) => {
            state.loading = action.payload;
        },
        emplist: (state , action ) => {
            state.emplist = action.payload
        },
    },
});

export const { loading , emplist  } = employeeSlice.actions;
export default employeeSlice.reducer; 
