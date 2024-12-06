"use client"
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    uid:null,
    sitedata:{},
    token:null,
  };

  export const DataflowReducer = createSlice({
    name: "DataflowReducer",
    initialState,
    reducers: {
      UserIdAction(state, action) {
        state.uid = action.payload;
      },
      SitedataAction(state, action) {
        state.sitedata = action.payload;
      },
      AuthTokenAction(state, action) {
        state.token = action.payload;
      },
    },
  });
  
  export const {
    UserIdAction,
    SitedataAction,
    AuthTokenAction
  } = DataflowReducer.actions;
  
  export default DataflowReducer.reducer;