import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transportsUser: [],

};

export const transportsUserSlice = createSlice({
  name: 'transportsUser',
  initialState,
  reducers: {
    saveTransportsUserData: (state, action) => {
      return {
        ...state,
        transportsUser: action.payload,
     
      }
    },
    addMyTransport: (state, action) => {
      return {
        ...state,
        transportsUser: [...state.transportsUser, action.payload],
       
      }
    },
  }
});

export const { saveTransportsUserData, addMyTransport } = transportsUserSlice.actions;
export const transportsUserReducer = transportsUserSlice.reducer;