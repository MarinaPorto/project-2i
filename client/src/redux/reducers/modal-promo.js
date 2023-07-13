import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalPromo: false,
};

export const modalPromoSlice = createSlice({
  name: 'modalPromo',
  initialState,
  reducers: {
    openModalPromo: (state, action) => {
      return {
        ...state,
        modalPromo: true
      }

    },
    closeModalPromo: (state, action) => {
      return {
        ...state,
        modalPromo: false
      }
    },
  }
});


export const { openModalPromo, closeModalPromo } = modalPromoSlice.actions;
export const modalPromoReducer = modalPromoSlice.reducer;