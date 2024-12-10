"use client"
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    uid:null,
    sitedata:{},
    token:null,
    cartItem:[]
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

      GetcartAction(state, action) {
        state.cartItem = action.payload;
      },

    },
  });
  
  export const {
    UserIdAction,
    SitedataAction,
    AuthTokenAction,
    GetcartAction
  } = DataflowReducer.actions;
  
  export default DataflowReducer.reducer;