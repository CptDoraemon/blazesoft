import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {Book, bookSlice, selectBooks} from "@/redux/slices/book/book";
import {useCallback} from "react";
import {bookThunkActions} from "@/redux/slices/book/thunk";

const useBookStore = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector(selectBooks);

  const loadTestBooks = useCallback(() => {
    dispatch(bookThunkActions.loadTestBooks());
  }, [dispatch]);

  const post = useCallback((book: Book) => {
    dispatch(bookSlice.actions.post(book));
  }, [dispatch]);

  const put = useCallback((book: Book, id: number) => {
    dispatch(bookSlice.actions.put({
      id,
      ...book
    }));
  }, [dispatch]);

  const deleteBook = useCallback((id: number) => {
    dispatch(bookSlice.actions.delete({id}));
  }, [dispatch]);

  return {
    books,
    loadTestBooks,
    deleteBook,
    post,
    put
  }
}

export default useBookStore;