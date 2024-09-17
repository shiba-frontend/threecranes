import { configureStore } from "@reduxjs/toolkit";
import DataflowReducer from "./reducer/DataflowReducer";
import { combineReducers } from 'redux'

const rootReducer = combineReducers({ 
    Dataflowreducer: DataflowReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})