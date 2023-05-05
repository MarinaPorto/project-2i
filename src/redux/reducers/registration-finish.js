import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  registrationFinish: false,
};

export const registrationFinishSlice = createSlice({
  name: 'registrationFinish',
  initialState,
  reducers: {
    openRegFinishModal: (state, action) => {
      return {
        ...state,
        registrationFinish: true
      }

    },
    closeRegFinishModal: (state, action) => {
      return {
        ...state,
        registrationFinish: false
      }
    },
  }
});


export const { openRegFinishModal, closeRegFinishModal } = registrationFinishSlice.actions;
export const registrationFinishReducer = registrationFinishSlice.reducer;