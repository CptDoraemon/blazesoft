import React from "react";
import {Book} from "@/redux/slices/book/book";
import {Box, Button, Grid, TextField} from "@mui/material";
import {getTextFieldPropsFromFormik} from "@/utils/formikHelpers";
import useBookForm from "@/pageComponents/BookStore/BookForm/useBookForm";

export interface BookFormProps {
  onSave: (updated: Book) => void,
  onCancel: () => void
  initValues: Book | null,
}

const BookForm = ({onSave, onCancel, initValues}: BookFormProps) => {
  const {formik} = useBookForm(initValues, onSave);

  return (
    <form>
      <Grid container spacing={2}>

        <Grid item xs={12}>
          <TextField
            {...getTextFieldPropsFromFormik('name', formik)}
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            {...getTextFieldPropsFromFormik('category', formik)}
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            {...getTextFieldPropsFromFormik('price', formik)}
            fullWidth
            type={'number'}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            {...getTextFieldPropsFromFormik('description', formik)}
            fullWidth
          />
        </Grid>

      </Grid>

      <Box mt={6}>
        <Grid container spacing={2}>
          <Grid item>
            <Button variant={'contained'} sx={{textTransform: 'none'}} onClick={formik.submitForm}>
              Save
            </Button>
          </Grid>
          <Grid item>
            <Button variant={'outlined'} color={'warning'} sx={{textTransform: 'none'}} onClick={onCancel}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  )
};

export default BookForm
