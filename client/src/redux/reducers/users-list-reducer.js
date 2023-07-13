import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      return {
        ...state,
        users: action.payload,
      }
    }
  }
});


export const { setUsers } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;