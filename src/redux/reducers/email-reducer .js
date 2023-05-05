import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  emailModal: false,
};

export const emailModalSlice = createSlice({
  name: 'emailModal',
  initialState,
  reducers: {
    openEmailModal: (state, action) => {
      return {
        ...state,
        emailModal: true
      }

    },
    closeEmailModal: (state, action) => {
      return {
        ...state,
        emailModal: false
      }
    },
  }
});


export const { openEmailModal, closeEmailModal } = emailModalSlice.actions;
export const emailModalReducer = emailModalSlice.reducer;