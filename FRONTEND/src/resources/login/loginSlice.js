import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import login from "../../services/loginService";
const initialState = {
  token: "",
};
export const userLogin = createAsyncThunk("/login", async (data) => {
  const res = await login(data);
  sessionStorage.setItem("token", res.data);
  return res.data;
});

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loadLogin: (state) => {
      state.token = sessionStorage.getItem("token");
    },
    loadLogout: (state) => {
      state.token = sessionStorage.setItem("token", "");
      state.token = sessionStorage.getItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.token = action.payload;
    });
  },
});

export const { reducer } = loginSlice;
export const { loadLogin, loadLogout } = loginSlice.actions;
export default reducer;
