import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  entranceModal: false,
};

export const entranceModalSlice = createSlice({
  name: 'entranceModal',
  initialState,
  reducers: {
    openEntranceModal: (state, action) => {
      return {
        ...state,
        entranceModal: true
      }

    },
    closeEntranceModal: (state, action) => {
      return {
        ...state,
        entranceModal: false
      }
    },
  }
});


export const { openEntranceModal, closeEntranceModal } = entranceModalSlice.actions;
export const entranceModalReducer = entranceModalSlice.reducer;