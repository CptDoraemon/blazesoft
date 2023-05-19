import {createAsyncThunk} from "@reduxjs/toolkit";
import {bookSlice} from "@/redux/slices/book/book";
import {RootState} from "@/redux/store";

const loadTestBooks = createAsyncThunk<void, void, {state: RootState}>(
  'books/loadTestBooks',
  (action, thunkAPI) => {
    thunkAPI.dispatch(bookSlice.actions.post({
      name: "Test Book 1",
      price: 1.99,
      category: "Test Category",
      description: "This is description for Test Book 1"
    }));
    thunkAPI.dispatch(bookSlice.actions.post({
      name: "Test Book 2",
      price: 14.99,
      category: "Test Category",
      description: "This is description for Test Book 2"
    }));
    thunkAPI.dispatch(bookSlice.actions.post({
      name: "Test Book 3",
      price: 49.99,
      category: "Test Category",
      description: "This is description for Test Book 3"
    }));
  }
)

export const bookThunkActions = {
  loadTestBooks
}