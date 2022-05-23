import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import customerServices from "../../services/customerService";
const initialState = {
  customers: [],
};
export const retrieveCustomers = createAsyncThunk(
  "customers/retrieve",
  async () => {
    const res = await customerServices.getAll();
    return res.data;
  }
);
export const createCustomer = createAsyncThunk(
  "customers/create",
  async ({ name, phone, isGold }, thunkAPI) => {
    const token = thunkAPI.getState().loginReducer.token;
    const res = await customerServices.create({ name, phone, isGold }, token);
    return res.data;
  }
);

export const updateCustomer = createAsyncThunk(
  "customers/update",
  async ({ _id, name, phone, isGold }, thunkAPI) => {
    const token = thunkAPI.getState().loginReducer.token;
    const res = await customerServices.update(
      _id,
      { name, phone, isGold },
      token
    );
    return res.data;
  }
);
export const deleteCustomer = createAsyncThunk(
  "customers/delete",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().loginReducer.token;

    const res = await customerServices.remove(id, token);
    return res.data;
  }
);

export const customerSlice = createSlice({
  name: "customers",
  initialState,
  extraReducers: {
    [createCustomer.fulfilled]: (state, action) => {
      state.customers.push(action.payload);
    },
    [retrieveCustomers.fulfilled]: (state, action) => {
      return { customers: [...action.payload] };
    },
    // [updateCustomer.fulfilled]: (state, action) => {
    //
    //   const index = state.customers.findIndex(
    //     (customer) => customer._id === action.payload.id
    //   );

    //   state.customers.splice(index, 1, action.payload);
    // },
    [deleteCustomer.fulfilled]: (state, action) => {
      let index = state.customers.findIndex(
        (customer) => customer._id === action.payload._id
      );
      state.customers.splice(index, 1);
    },
  },
});

export const { reducer } = customerSlice;
export default reducer;
