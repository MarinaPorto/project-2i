import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchIsOpen: false,
};

export const searchInputSlice = createSlice({
  name: 'searchIsOpen',
  initialState,
  reducers: {
    openSearchInput: (state, action) => {
      return {
        ...state,
        searchIsOpen: true
      }
    },
    closeSearchInput: (state, action) => {
      return {
        ...state,
        searchIsOpen: false
      }
    }
  }
});


export const { openSearchInput, closeSearchInput } = searchInputSlice.actions;
export const searchIsOpenReducer = searchInputSlice.reducer;