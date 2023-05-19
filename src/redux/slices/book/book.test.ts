import {bookSlice, BookState, selectBooks} from './book';
import {describe, expect, test} from '@jest/globals';
import {RootState} from "@/redux/store";
import cloneDeep from "lodash/cloneDeep";

test('should return the initial state', () => {
  expect(bookSlice.reducer(undefined, { type: undefined })).toEqual({
    books: [],
    nextId: 1
  })
});

describe("book CRUD tests", () => {
  let state: BookState;

  const getRootState = (state: BookState): RootState => ({
    books: state
  });

  test('should return the initial state', () => {
    state = bookSlice.reducer(undefined, { type: undefined });

    expect(state).toEqual({
      books: [],
      nextId: 1
    });
  });

  const book1 = {
    name: "book1",
    price: 111,
    category: "book1Category",
    description: "book1Description"
  };

  const book1Updated = {
    name: "book1Updated",
    price: 1111,
    category: "book1CategoryUpdated",
    description: "book1DescriptionUpdated"
  };

  const book2 = {
    name: "book2",
    price: 222,
    category: "book2Category",
    description: "book2Description"
  };

  const book3 = {
    name: "book1",
    price: 333,
    category: "book2Category",
    description: "book2Description"
  };

  test("should be able to add first book", () => {
    state = bookSlice.reducer(state, bookSlice.actions.post(book1));

    expect(state).toEqual({
      books: [{
        id: 1,
        ...book1
      }],
      nextId: 2
    });
  });

  test("add second book, it should be placed after the first book", () => {
    state = bookSlice.reducer(state, bookSlice.actions.post(book2));

    expect(state).toEqual({
      books: [
        {
          id: 1,
          ...book1
        },
        {
          id: 2,
          ...book2
        }
      ],
      nextId: 3
    });
  });

  test("add third book, it should be placed after the second book", () => {
    state = bookSlice.reducer(state, bookSlice.actions.post(book3));

    expect(state).toEqual({
      books: [
        {
          id: 1,
          ...book1
        },
        {
          id: 2,
          ...book2
        },
        {
          id: 3,
          ...book3
        }
      ],
      nextId: 4
    });
  });

  test("should be able to delete second book", () => {
    state = bookSlice.reducer(state, bookSlice.actions.delete({id: 2}));

    expect(state).toEqual({
      books: [
        {
          id: 1,
          ...book1
        },
        {
          id: 3,
          ...book3
        }
      ],
      nextId: 4
    });
  });

  test("should be able to edit first book", () => {
    state = bookSlice.reducer(state, bookSlice.actions.put({
      id: 1,
      ...book1Updated
    }));

    expect(state).toEqual({
      books: [
        {
          id: 1,
          ...book1Updated
        },
        {
          id: 3,
          ...book3
        }
      ],
      nextId: 4
    });

    expect(state).not.toEqual({
      books: [
        {
          id: 1,
          ...book1
        },
        {
          id: 3,
          ...book3
        }
      ],
      nextId: 4
    });
  });

  test("books selector should return the updated books", () => {
    expect(selectBooks(getRootState(state))).toEqual([
      {
        id: 1,
        ...book1Updated
      },
      {
        id: 3,
        ...book3
      }
    ]);
  });

  test("should ignore editing a book with non-existing ID", () => {
    const prevStateClone = cloneDeep(state);
    state = bookSlice.reducer(state, bookSlice.actions.put({
      id: 4,
      ...book1Updated
    }));

    expect(state).toEqual(prevStateClone);
  });

  test("should ignore deleting a book with non-existing ID", () => {
    const prevStateClone = cloneDeep(state);
    state = bookSlice.reducer(state, bookSlice.actions.delete({id: 4}));

    expect(state).toEqual(prevStateClone);
  });
})