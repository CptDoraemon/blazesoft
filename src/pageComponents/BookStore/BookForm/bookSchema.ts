import * as Yup from "yup";

/* User */
export const nameSchema = Yup.string()
  .min(1)
  .max(50)
  .required();

export const categorySchema = Yup.string()
  .min(1)
  .max(50)
  .required();

export const priceSchema = Yup.number()
  .min(0)
  .required();

export const descriptionSchema = Yup.string()
  .min(1)
  .max(200)
  .required();

export const bookSchema = Yup.object().shape({
  name: nameSchema,
  category: categorySchema,
  price: priceSchema,
  description: descriptionSchema
});