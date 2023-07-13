import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  emailModal: false,
};

export const sfModalSlice = createSlice({
  name: 'sfModal',
  initialState,
  reducers: {
    openSFModal: (state, action) => {
      return {
        ...state,
        sfModal: true
      }

    },
    closeSFModal: (state, action) => {
      return {
        ...state,
        sfModal: false
      }
    },
  }
});


export const { openSFModal, closeSFModal } = sfModalSlice.actions;
export const sfModalReducer = sfModalSlice.reducer;