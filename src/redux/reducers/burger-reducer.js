import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  burger: false,
};

export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    openBurger(state) {
      state.burger = !state.burger;
    },
    closeBurger(state) {
      state.burger = false;
    },
  },
});


export const { openBurger, closeBurger } = burgerSlice.actions;
export const burgerReducer = burgerSlice.reducer;