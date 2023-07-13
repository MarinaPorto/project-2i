import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transportFound: [],
  transportNotFound: false,
};

export const transportFoundSlice = createSlice({
  name: 'transportFound',
  initialState,
  reducers: {
    saveFoundTransport: (state, action) => {
      return {
        ...state,
        transportFound: action.payload,
        transportNotFound: true,
      }
    },

  }
});

export const { saveFoundTransport } = transportFoundSlice.actions;
export const transportFoundReducer = transportFoundSlice.reducer;