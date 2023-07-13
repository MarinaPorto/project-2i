import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentId: "",
};

export const currentFoundCargoIdSlice = createSlice({
  name: 'currentIdSlice',
  initialState,
  reducers: {
    saveCurrentID: (state, action) => {
      return {
        ...state,
        currentId: action.payload,
      }
    },
  }
});

export const { saveCurrentID } = currentFoundCargoIdSlice.actions;
export const currentIdReducer = currentFoundCargoIdSlice.reducer;