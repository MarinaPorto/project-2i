import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userRole: "Физическое лицо",
  userWork: "Грузоотправитель",
};

export const userRoleSlice = createSlice({
  name: 'userRole',
  initialState,
  reducers: {
    setUserRole: (state, action) => {
      return {
        ...state,
        userRole: action.payload,

      }

    },
    setUserWork: (state, action) => {
      return {
        ...state,

        userWork: action.payload,
      }

    }

  }
});


export const { setUserRole, setUserWork } = userRoleSlice.actions;
export const userRoleReducer = userRoleSlice.reducer;