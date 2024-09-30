import { configureStore } from '@reduxjs/toolkit';
import adminReducer from "./slices/admin_slice"


const store = configureStore({
  reducer: {    
    admin : adminReducer ,     
  },
});

export default store;
