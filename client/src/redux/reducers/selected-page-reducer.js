import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedPage: "homepage",
};

export const selectedPageSlice = createSlice({
  name: 'selectedPage',
  initialState,
  reducers: {
    openSelectedPage: (state, action) => {
      return {
        ...state,
        selectedPage: action.payload
      }
    },
  }
});


export const { openSelectedPage} = selectedPageSlice.actions;
export const selectedPageReducer = selectedPageSlice.reducer;