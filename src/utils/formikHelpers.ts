import startCase from "lodash/startCase";
import {FormikValues} from "formik";
import {TextFieldProps} from "@mui/material";

const getLabel = (key: string) => startCase(key);

const getTextFieldPropsFromFormik = (key: string, formik: FormikValues): TextFieldProps => {
  return {
    id: key,
    name: key,
    label: getLabel(key),
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    value: formik.values[key],
    error: !!formik.errors[key] && !!formik.touched[key],
    helperText: !!formik.touched[key] && formik.errors[key],
  }
}

export {getTextFieldPropsFromFormik}