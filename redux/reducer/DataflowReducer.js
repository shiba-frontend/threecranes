"use client"
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    user:{},
    Teampreview:{}
  };

  export const DataflowReducer = createSlice({
    name: "DataflowReducer",
    initialState,
    reducers: {
      GetprofileAction(state, action) {
        state.user = action.payload;
      },
      GetTeampreviewAction(state, action) {
        state.Teampreview = action.payload;
      },
    },
  });
  
  export const {
    GetprofileAction,
    GetTeampreviewAction
  } = DataflowReducer.actions;
  
  export default DataflowReducer.reducer;