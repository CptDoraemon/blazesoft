import React, {useCallback} from "react";
import {styled} from "@mui/material/styles";
import useOpenState from "@/utils/useOpenState";
import {Book} from "@/redux/slices/book/book";
import useBookStore from "@/pageComponents/BookStore/useBookStore";
import {Button as MuiButton} from "@mui/material";
import dynamic from 'next/dynamic';
const BookFormDialog = dynamic(() => import("@/pageComponents/BookStore/BookForm/BookFormDialog"));

const Button = styled(MuiButton)(({ theme }) => ({
  fontSize: theme.typography.h5.fontSize,
  fontWeight: 700,
  padding: theme.spacing(1, 4)
}))

interface AddBookButtonProps {}

const AddBookButton = () => {
  const {post} = useBookStore();
  const editDialogOpen = useOpenState(false);

  const saveEdit = useCallback((book: Book) => {
    post(book);
    editDialogOpen.handleClose();
  }, [editDialogOpen, post]);

  return (
    <>
      <Button
        onClick={editDialogOpen.handleOpen}
        variant={"contained"}
      >
        Add Book
      </Button>

      {
        editDialogOpen.isOpen &&
        <BookFormDialog
          onSave={saveEdit}
          onCancel={editDialogOpen.handleClose}
          initValues={null}
        />
      }
    </>
  )
};

export default AddBookButton
