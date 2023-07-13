import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  editLocationForm: false,
};

export const editLocationFormSlice = createSlice({
  name: 'editLocationForm',
  initialState,
  reducers: {
    openEditLocationForm: (state, action) => {
      return {
        ...state,
        editLocationForm: true
      }

    },
    closeEditLocationForm: (state, action) => {
      return {
        ...state,
        editLocationForm: false
      }

    },
  }
});


export const { openEditLocationForm, closeEditLocationForm } = editLocationFormSlice.actions;
export const editLocationFormReducer = editLocationFormSlice.reducer;