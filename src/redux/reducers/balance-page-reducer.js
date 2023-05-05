import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balancePage: false,
};

export const balancePageSlice = createSlice({
  name: 'balancePage',
  initialState,
  reducers: {
    openBalancePage: (state, action) => {
      return {
        ...state,
        balancePage: true
      }

    },
    closeBalancePage: (state, action) => {
      return {
        ...state,
        balancePage: false
      }
    },
  }
});


export const { openBalancePage, closeBalancePage } = balancePageSlice.actions;
export const balancePageReducer = balancePageSlice.reducer;