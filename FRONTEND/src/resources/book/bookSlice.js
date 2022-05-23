import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import bookServices from "../../services/bookServices";
const initialState = {
  books: [],
  count: "",
  error: "",
};
export const retrieveBooks = createAsyncThunk(
  "books/retrieveBooks",
  async () => {
    const res = await bookServices.getAll();
    return res.data;
  }
);

export const createBook = createAsyncThunk(
  "book/create",
  async (data, thunkAPI) => {
    const token = thunkAPI.getState().loginReducer.token;
    const res = await bookServices.create(data, token);
    return res.data;
  }
);

export const updateBook = createAsyncThunk(
  "book/update",
  async (data, thunkAPI) => {
    const token = thunkAPI.getState().loginReducer.token;
    const res = await bookServices.update(data);
    return res.data;
  }
);
export const deleteBook = createAsyncThunk(
  "book/delete",
  async (_id, thunkAPI) => {
    const token = thunkAPI.getState().loginReducer.token;
    const res = await bookServices.remove(_id, token);
    return res.data;
  }
);
export const retrieveBooksCount = createAsyncThunk(
  "books/retrieveBooksCount",
  async (data) => {
    const res = await bookServices.getBookCount(data);
    return res.data;
  }
);
export const retrievePaginatedBook = createAsyncThunk(
  "books/retrievePaginatedBook",
  async (data) => {
    const res = await bookServices.pfs(data);
    return res.data;
  }
);
export const bookSlice = createSlice({
  name: "book",
  initialState,
  extraReducers: {
    [createBook.fulfilled]: (state, action) => {
      state.books.push(action.payload);
    },
    [createBook.rejected]: (state, action) => {
      state.error = "Something failed";
    },

    [retrieveBooks.fulfilled]: (state, action) => {
      state.books = [];
      state.books = action.payload;
      state.error = "";
    },
    [retrievePaginatedBook.fulfilled]: (state, action) => {
      state.books = [];
      state.books = action.payload;
      state.error = "";
    },
    [retrieveBooksCount.fulfilled]: (state, action) => {
      state.count = action.payload.count;
    },
    [deleteBook.fulfilled]: (state, action) => {
      let index = state.books.findIndex(
        (book) => book._id === action.payload._id
      );

      state.books.splice(index, 1);
    },
    [deleteBook.rejected]: (state, action) => {
      state.error = "something failed";
    },

    [updateBook.fulfilled]: (state, action) => {
      const index = state.books.findIndex(
        (book) => book._id === action.payload.id
      );

      state.book.splice(index, 1, action.payload);
    },
  },
});

export const { reducer } = bookSlice;
export default reducer;
