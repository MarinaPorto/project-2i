import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  myDialogs: [],
};

export const dialogsSlice = createSlice({
  name: 'myDialogs',
  initialState,
  reducers: {
    saveMyDialogs: (state, action) => {
      return {
        ...state,
        myDialogs: action.payload,
      
       

      }
    },
  }
});

export const { saveMyDialogs } = dialogsSlice.actions;
export const dialogsReducer = dialogsSlice.reducer;