import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  passwordModal: false,
};

export const passwordModalSlice = createSlice({
  name: 'passwordModal',
  initialState,
  reducers: {
    openPasswordModal: (state, action) => {
      return {
        ...state,
        passwordModal: true
      }

    },
    closePasswordModal: (state, action) => {
      return {
        ...state,
        passwordModal: false
      }
    },
  }
});


export const { openPasswordModal, closePasswordModal } = passwordModalSlice.actions;
export const passwordModalReducer = passwordModalSlice.reducer;