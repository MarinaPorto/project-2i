import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cargoFound: [],
  cargoNotFound: false,
};

export const cargoFoundSlice = createSlice({
  name: 'cargoFound',
  initialState,
  reducers: {
    saveFoundCargo: (state, action) => {
      return {
        ...state,
        cargoFound: action.payload,
        cargoNotFound: true,
      }
    },

  }
});

export const { saveFoundCargo } = cargoFoundSlice.actions;
export const cargoFoundReducer = cargoFoundSlice.reducer;