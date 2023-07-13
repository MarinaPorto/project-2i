import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  editAccountForm: false,
};

export const editAccountFormSlice = createSlice({
  name: 'editAccountForm',
  initialState,
  reducers: {
    openEditAccountForm: (state, action) => {
      return {
        ...state,
        editAccountForm: true
      }
    },
    closeEditAccountForm: (state, action) => {
      return {
        ...state,
        editAccountForm: false
      }

    },
  }
});

export const { openEditAccountForm, closeEditAccountForm } = editAccountFormSlice.actions;
export const editAccountFormReducer = editAccountFormSlice.reducer;