import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  editForm: false,
};

export const editFormSlice = createSlice({
  name: 'editForm',
  initialState,
  reducers: {
    toggleEditForm: (state, action) => {
      return {
        ...state,
        editForm: !state.editForm
      }

    },
  }
});


export const { toggleEditForm } = editFormSlice.actions;
export const editFormReducer = editFormSlice.reducer;