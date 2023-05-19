import React, {useCallback} from "react";
import {styled} from "@mui/material/styles";
import {Book, BookWithID} from "@/redux/slices/book/book";
import {Button, Grid, Typography} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import useBookStore from "@/pageComponents/BookStore/useBookStore";
import useOpenState from "@/utils/useOpenState";
import ConfirmDialog from "@/publicComponents/ConfirmDialog";
import BookFormDialog from "@/pageComponents/BookStore/BookForm/BookFormDialog";

const Root = styled(Grid)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  width: "100%",
  background: theme.palette.background.paper
}));

const TopRow = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center"
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  flex: "1 1 auto",
})) as typeof Typography;

const Price = styled(Typography)(({ theme }) => ({
  flex: "0 0 auto"
})) as typeof Typography;

const Category = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(0.5, 2),
  background: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  margin: theme.spacing(0, 0, 1, 0),
  borderRadius: 0.65 * theme.shape.borderRadius,
  display: "block",
  width: "fit-content",
  fontWeight: 600
})) as typeof Typography;

interface BookItemProps {
  book: BookWithID
}

const BookItem = ({book}: BookItemProps) => {
  const {deleteBook, put} = useBookStore();

  const deleteDialogOpen = useOpenState(false);
  const deleteThisBook = useCallback(() => {
    deleteBook(book.id);
  }, [book.id, deleteBook]);

  const editDialogOpen = useOpenState(false);
  const saveEdit = useCallback((updated: Book) => {
    put(updated, book.id);
    editDialogOpen.handleClose();
  }, [book.id, editDialogOpen, put]);

  return (
    <Root container p={{xs: 1, md: 2}} data-cy={"book-item"}>

      <Grid item xs={12}>
        <TopRow>
          <Title component={"h2"} variant={"h5"} data-cy={"book-item-name"}>
            {book.name}
          </Title>
          <Price component={"span"} variant={"h5"} data-cy={"book-item-price"}>
            ${book.price}
          </Price>
        </TopRow>
      </Grid>

      <Grid item xs={12}>
        <Category variant={"caption"} data-cy={"book-item-category"}>
          {book.category}
        </Category>
      </Grid>

      <Grid item xs={12} data-cy={"book-item-description"}>
        <Typography>
          {book.description}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={2} mt={2} justifyContent={"flex-end"}>
          <Grid item>
            <Button
              variant="contained"
              disableElevation
              startIcon={<EditIcon/>}
              onClick={editDialogOpen.handleOpen}
            >
              Edit
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              startIcon={<DeleteOutlineIcon/>}
              color={"warning"}
              onClick={deleteDialogOpen.handleOpen}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <BookFormDialog
        open={editDialogOpen.isOpen}
        onSave={saveEdit}
        onCancel={editDialogOpen.handleClose}
        initValues={book}
      />

      <ConfirmDialog
        content={`Please confirm you want to delete book ${book.name}`}
        onYes={deleteThisBook}
        onNo={deleteDialogOpen.handleClose}
        open={deleteDialogOpen.isOpen}
      />
    </Root>
  )
};

export default BookItem
