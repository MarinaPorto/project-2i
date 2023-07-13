import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cargoUser: [],
  countCargo: 0
};

export const cargosUserSlice = createSlice({
  name: 'cargoUser',
  initialState,
  reducers: {
    saveCargosUserData: (state, action) => {
      return {
        ...state,
        cargoUser: action.payload,
        countCargo: 1
      }
    },
    addMyCargo: (state, action) => {
      return {
        ...state,
        cargoUser: [...state.cargoUser, action.payload],
        countCargo: state.countCargo + 1,
      }
    },
  }
});

export const { saveCargosUserData, addMyCargo } = cargosUserSlice.actions;
export const cargoUsersReducer = cargosUserSlice.reducer;