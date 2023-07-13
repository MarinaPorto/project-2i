import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  registrationForm: false,
};

export const registrationFormSlice = createSlice({
  name: 'registrationForm',
  initialState,
  reducers: {
    openRegistrForm2: (state, action) => {
      return {
        ...state,
        registrationForm: true
      }

    },
    closeRegistrForm2: (state, action) => {
      return {
        ...state,
        registrationForm: false
      }
    },
  }
});


export const { openRegistrForm2, closeRegistrForm2 } = registrationFormSlice.actions;
export const registrationFormReducer = registrationFormSlice.reducer;