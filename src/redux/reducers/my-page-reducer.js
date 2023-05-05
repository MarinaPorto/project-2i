import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  myPage: false,
};

export const MyPageSlice = createSlice({
  name: 'myPage',
  initialState,
  reducers: {
    openMyPage: (state, action) => {
      return {
        ...state,
        myPage: true
      }

    },
    closeMyPage: (state, action) => {
      return {
        ...state,
        myPage: false
      }
    },
  }
});


export const { openMyPage, closeMyPage } = MyPageSlice.actions;
export const myPageReducer = MyPageSlice.reducer;