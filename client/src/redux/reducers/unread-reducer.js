import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  countUnreadMessages: 0,
  unreadDialogs: [],

};

export const unreadMessagesSlice = createSlice({
  name: 'countUnreadMessages',
  initialState,
  reducers: {
    saveCountUnreadMessages: (state, action) => {
      return {
        ...state,
        countUnreadMessages: action.payload
      }
    },
    saveCountUnreadDialogs: (state, action) => {
      return {
        ...state,
        unreadDialogs: action.payload
      }
    }

   }, 
   
});


export const { saveCountUnreadMessages,  saveCountUnreadDialogs} = unreadMessagesSlice.actions;
export const unreadMessagesReducer = unreadMessagesSlice.reducer;