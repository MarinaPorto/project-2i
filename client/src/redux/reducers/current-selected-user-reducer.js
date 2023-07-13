import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSelectedUser: "",
};

export const currentSelectedUserSlice = createSlice({
  name: 'currentSelectedUser',
  initialState,
  reducers: {
    saveCurrentSelectedUser: (state, action) => {
      return {
        ...state,
        currentSelectedUser: action.payload,
      }
    },
  }
});

export const { saveCurrentSelectedUser } = currentSelectedUserSlice.actions;
export const currentSelectedUserReducer = currentSelectedUserSlice.reducer;