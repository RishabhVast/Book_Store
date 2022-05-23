import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import registerServices from "../../services/registerService";

const initialState = {
  user: {},
  error: "",
};
export const createRegister = createAsyncThunk(
  "/users",
  async ({ name, email, password, isAdmin }) => {
    try {
      const res = await registerServices.create({
        name,
        email,
        password,
        isAdmin,
      });
      return res.data;
    } catch (error) {
      return { error: "duplicate entry" };
    }
  }
);

export const registerSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createRegister.fulfilled, (state, action) => {
      // if (action.payload.error) {

      // } else {
      //   state.user = action.payload;
      // }.
      state.user = action.payload;
    });
  },
});

export const { reducer } = registerSlice;
export default reducer;
