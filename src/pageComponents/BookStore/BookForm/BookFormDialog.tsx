import React from "react";
import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import Box from "@mui/material/Box";
import BookForm, {BookFormProps} from "@/pageComponents/BookStore/BookForm/BookForm";

interface BookFormDialogProps extends BookFormProps {
  open: boolean
}

const BookFormDialog = (props: BookFormDialogProps) => {
  const {open, ...formProps} = props;

  return (
    <Dialog
      open={open}
      onClose={() => false}
      aria-labelledby="alert-dialog-title"
      fullWidth
      maxWidth={'md'}
    >
      <DialogTitle id="alert-dialog-title">
        { formProps.initValues === null ? "Add New Book" : "Edit Book" }
      </DialogTitle>
      <DialogContent>
        <Box py={2}>
          <BookForm {...formProps} />
        </Box>
      </DialogContent>
    </Dialog>
  )
};

export default BookFormDialog