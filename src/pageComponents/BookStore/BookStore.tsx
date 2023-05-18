import React from "react";
import {styled} from "@mui/material/styles";
import WidthWrapper from "@/publicComponents/WidthWrapper";
import useBookStore from "@/pageComponents/BookStore/useBookStore";
import BookItem from "@/pageComponents/BookStore/BookItem";
import {useMount} from "react-use";
import AddBookButton from "@/pageComponents/BookStore/AddBookButton";

const Root = styled('div')(({ theme }) => ({
  padding: theme.spacing(2)
}))

interface BookStoreProps {}

const BookStore = () => {
  const {books, loadTestBooks} = useBookStore();

  useMount(loadTestBooks);

  return (
    <WidthWrapper>
      <Root>
        <AddBookButton/>

        <div>
          {
            books.map(book => <BookItem key={book.id} book={book} />)
          }
        </div>
      </Root>
    </WidthWrapper>
  )
};

export default BookStore
