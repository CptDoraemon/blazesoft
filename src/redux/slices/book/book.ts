import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type {RootState} from "@/redux/store";

export interface Book {
  name: string,
  price: number,
  category: string,
  description: string
}

export interface BookWithID extends Book {
  id: number,
}

// Define a type for the slice state
interface BookState {
  books: BookWithID[],
  nextId: number
}

// Define the initial state using that type
const initialState: BookState = {
  books: [],
  nextId: 1,
}

// helpers
const findBook = (state: BookState, id: number): number | null => {
  let index: number | null = null;
  for (let i=0; i<state.books.length; i++) {
    if (state.books[i].id === id) {
      index = i;
      break;
    }
  }
  return index
}

export const bookSlice = createSlice({
  name: 'book',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    post: (state: BookState, action: PayloadAction<Book>) => {
      const newBook: BookWithID = {
        id: state.nextId,
        name: action.payload.name,
        price: action.payload.price,
        category: action.payload.category,
        description: action.payload.description,
      }
      state.nextId++;
      state.books.push(newBook);
    },
    put: (state: BookState, action: PayloadAction<BookWithID>) => {
      const targetIndex = findBook(state, action.payload.id);
      if (targetIndex === null) return;

      state.books[targetIndex] = action.payload;
    },
    delete: (state: BookState, action: PayloadAction<Pick<BookWithID, "id">>) => {
      const targetIndex = findBook(state, action.payload.id);
      if (targetIndex === null) return;

      state.books.splice(targetIndex, 1);
    }
  },
})

// Other code such as selectors can use the imported `RootState` type
export const selectBooks = (state: RootState) => state.books.books;