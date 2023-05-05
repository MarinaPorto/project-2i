import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  registrationOpen: false,
};

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    openRegistrForm: (state, action) => {
      return {
        ...state,
        registrationOpen: true
      }

    },
    closeRegistrForm: (state, action) => {
      return {
        ...state,
        registrationOpen: false
      }

    },
  },
});


export const { openRegistrForm, closeRegistrForm } = registrationSlice.actions;
export const registrationReducer = registrationSlice.reducer;