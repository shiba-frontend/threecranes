"use client"
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    uid:null,
    sitedata:{},
    token:null,
    cartItem:[],
    wishlistItem:[],
    CategoryMenu:[],
    TransactionDetails:'',
    isToggle: false,
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

      GetTransactionDetails(state, action) {
        state.TransactionDetails = action.payload;
      },

      HeaderDropdown(state, action) {
        state.isToggle = action.payload;
      },

    },
  });
  
  export const {
    GetWishlistAction,
    UserIdAction,
    SitedataAction,
    AuthTokenAction,
    GetcartAction,
    GetMenuAction,
    GetTransactionDetails,
    HeaderDropdown
  } = DataflowReducer.actions;
  
  export default DataflowReducer.reducer;