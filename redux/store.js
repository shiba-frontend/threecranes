import { configureStore } from "@reduxjs/toolkit";
import DataflowReducer from "./reducer/DataflowReducer";
import { combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const persistConfig = {
  key: 'root',
  storage,
}
const rootReducer = combineReducers({ 
    Dataflowreducer: DataflowReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
})