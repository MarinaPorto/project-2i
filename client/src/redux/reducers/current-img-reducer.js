import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentImg: "",
};

export const currentImgSlice = createSlice({
  name: 'currentImg',
  initialState,
  reducers: {
    saveCurrentImg: (state, action) => {
      return {
        ...state,
        currentImg: action.payload,
      }
    },
  }
});

export const { saveCurrentImg } = currentImgSlice.actions;
export const currentImgReducer = currentImgSlice.reducer;