import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import problemReducer from './slices/problemSlice';
import {apiSlice} from './slices/apiSlice';

const store=configureStore({
    reducer:{
        auth: authReducer,
        problems: problemReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleWare)=> getDefaultMiddleWare().concat(apiSlice.middleware),
    devTools: true
});

export default store;