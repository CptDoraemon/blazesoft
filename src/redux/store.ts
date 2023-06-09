import { configureStore } from '@reduxjs/toolkit'
import {bookSlice} from "./slices/book/book";

export const store = configureStore({
  reducer: {
    books: bookSlice.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    thunk: {
      extraArgument: ""
    }
  })
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch