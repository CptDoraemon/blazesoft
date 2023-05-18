import React from "react";
import {styled} from "@mui/material/styles";
import WidthWrapper from "@/publicComponents/WidthWrapper";
import useBookStore from "@/pageComponents/BookStore/useBookStore";
import BookItem from "@/pageComponents/BookStore/BookItem";
import {useMount} from "react-use";
import AddBookButton from "@/pageComponents/BookStore/AddBookButton";
import {Box, Grid} from "@mui/material";

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

        <Grid container my={{xs: 1, md: 2}} spacing={{xs: 1, md: 2}}>
          {
            books.map(book => (
              <Grid item key={book.id} xs={12}>
                <BookItem book={book} />
              </Grid>
            ))
          }
        </Grid>
      </Root>
    </WidthWrapper>
  )
};

export default BookStore
