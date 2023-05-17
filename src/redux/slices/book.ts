import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type {RootState} from "@/redux/store";

// Define a type for the slice state
interface BookState {
  value: number
}

// Define the initial state using that type
const initialState: BookState = {
  value: 0,
}

export const bookSlice = createSlice({
  name: 'book',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = bookSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default bookSlice.reducer