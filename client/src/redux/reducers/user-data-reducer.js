import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: "",
  userLogin: "",
  auth: false
};

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    saveUserData: (state, action) => {
      return {
        ...state,
        userData: action.payload,
        auth: true,
      }
    },
    loginUserData: (state, action) => {
      return {
        ...state,
        userLogin: action.payload,
        auth: true,
      }
    },
    logoutUserData: (state, action) => {
      return {
        ...state,
        userData: "",
        userLogin: "",
        auth: false,
      }
    },
    checkUserAuth: (state, action) => {
      return {
        ...state,
        // userData: action.payload,
        // userLogin: action.payload,
        auth: true,
      }
    },
  }
});


export const { saveUserData, loginUserData, logoutUserData, checkUserAuth } = userDataSlice.actions;
export const userDataReducer = userDataSlice.reducer;