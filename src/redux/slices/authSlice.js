import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  validate: false,
  userData: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setValidate: (state, action) => {
      state.validate = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export let getValidate = (state) => state.auth.validate;
export let getUserData = (state) => state.auth.userData;
export let { setValidate, setUserData } = authSlice.actions;
export default authSlice.reducer;
