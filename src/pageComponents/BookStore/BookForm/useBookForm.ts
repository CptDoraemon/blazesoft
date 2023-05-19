import {Book} from "@/redux/slices/book/book";
import {useFormik} from "formik";
import {bookSchema} from "@/pageComponents/BookStore/BookForm/bookSchema";

const useBookForm = (initValues: Book | null, onSave: (updated: Book) => void) => {

  const formik = useFormik({
    initialValues: initValues === null ?
      {
        name: "",
        category: "",
        price: 0,
        description: ""
      } :
      {
        name: initValues.name,
        category: initValues.category,
        price: initValues.price,
        description: initValues.description
      },
    validationSchema: bookSchema,
    onSubmit: async (book) => {
      onSave(book);
    }
  });

  return {
    formik
  }
}

export default useBookForm