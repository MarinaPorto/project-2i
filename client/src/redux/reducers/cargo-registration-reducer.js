import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  myCargo: [],
  countCargo: 0,

};

export const cargoRegistrationSlice = createSlice({
  name: 'myCargo',
  initialState,
  reducers: {
    saveMyCargo: (state, action) => {
      return {
        ...state,
        myCargo: [...state.myCargo, action.payload],
        countCargo: state.countCargo + 1,
      }
    },
    // countCargo: (state, action) => {
    //   return {
    //     ...state,
    //     countCargo: state.countCargo + 1,
    //   }
    // }
  }
});


export const { saveMyCargo, countCargo,  } = cargoRegistrationSlice.actions;
export const cargoRegistrationReducer = cargoRegistrationSlice.reducer;