import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chatIsOpen: false,
  chatRoomIsOpen: false,
  chatRoomId: null,
  chatRoomUserName: "",
  chatRoomUserId: null
};

export const chatSlice = createSlice({
  name: 'chatIsOpen',
  initialState,
  reducers: {
    openChat: (state, action) => {
      return {
        ...state,
        chatIsOpen: !state.chatIsOpen
      }
    },
    openChatRoom: (state, action) => {
      return {
        ...state,
        chatRoomIsOpen: true,
        chatRoomId: action.payload.chatRoomId,
        chatRoomUserName: action.payload.chatRoomUserName,
        chatRoomUserId: action.payload.chatRoomUserId

      }
    },
    closeChatRoom: (state, action) => {
      return {
        ...state,
        chatRoomIsOpen: false,
        chatRoomId: null,
        chatRoomUserName: "",
        chatRoomUserId: null

      }
    },

  }
});


export const { openChat, openChatRoom, closeChatRoom } = chatSlice.actions;
export const chatIsOpenReducer = chatSlice.reducer;