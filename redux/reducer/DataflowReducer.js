"use client"
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    uid:null,
    sitedata:{},
    token:null,
    cartItem:[],
    wishlistItem:[],
    CategoryMenu:[]
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

      GetWishlistAction(state, action) {
        state.wishlistItem = action.payload;
      },

      GetMenuAction(state, action) {
        state.CategoryMenu = action.payload;
      },

    },
  });
  
  export const {
    GetWishlistAction,
    UserIdAction,
    SitedataAction,
    AuthTokenAction,
    GetcartAction,
    GetMenuAction
  } = DataflowReducer.actions;
  
  export default DataflowReducer.reducer;