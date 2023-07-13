import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  successModal: false,
};

export const successModalSlice = createSlice({
  name: 'successModal',
  initialState,
  reducers: {
    openSuccessModal: (state, action) => {
      return {
        ...state,
        successModal: true
      }

    },
    closeSuccessModal: (state, action) => {
      return {
        ...state,
        successModal: false
      }
    },
  }
});


export const { openSuccessModal, closeSuccessModal } = successModalSlice.actions;
export const successModalReducer = successModalSlice.reducer;