import { configureStore } from '@reduxjs/toolkit'
import {bookSlice} from "./slices/book/book";

const getStore = () => {
  return configureStore({
    reducer: {
      books: bookSlice.reducer
    },
  });
}

export const store = getStore();

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch