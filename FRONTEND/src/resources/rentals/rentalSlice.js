import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import rentalServices from "../../services/rentalServices";

const initialState = {
  rentals: [],
};
export const retrieveRentals = createAsyncThunk("retals/retrieve", async () => {
  const res = await rentalServices.getAll();
  return res.data;
});
export const createRentals = createAsyncThunk(
  "rentals/create",
  async (data, thunkAPI) => {
    const token = thunkAPI.getState().loginReducer.token;
    const res = await rentalServices.create(data, token);
    return res.data;
  }
);

export const updateRentals = createAsyncThunk(
  "genres/update",
  async (_id, thunkAPI) => {
    const token = thunkAPI.getState().loginReducer.token;
    const res = await rentalServices.update(_id, token);
    return res.data;
  }
);
export const deleteRentals = createAsyncThunk(
  "rentals/delete",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().loginReducer.token;
    const res = await rentalServices.remove(id, token);
    return res.data;
  }
);

export const rentalSlice = createSlice({
  name: "rentals",
  initialState,
  extraReducers: {
    // [createRentals.fulfilled]: (state, action) => {
    //   state.genres.push(action.payload);
    // },
    [retrieveRentals.fulfilled]: (state, action) => {
      state.rentals = [...action.payload];
    },

    [updateRentals.fulfilled]: (state, action) => {
      const index = state.rentals.findIndex(
        (rental) => rental._id === action.payload._id
      );
      state.rentals.splice(index, 1, action.payload);
    },
    [deleteRentals.fulfilled]: (state, action) => {
      let index = state.rentals.findIndex(
        (rental) => rental._id === action.payload._id
      );
      state.rentals.splice(index, 1);
    },
  },
});

export const { reducer } = rentalSlice;
export default reducer;
