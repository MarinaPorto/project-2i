import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentId: "",
};

export const currentIdSlice = createSlice({
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

export const { saveCurrentID } = currentIdSlice.actions;
export const currentIdReducer = currentIdSlice.reducer;