import * as yup from "yup";

export const threadCreationValidationSchema = yup.object({
  title: yup
    .string()
    .required("Заголовок не может быть пустым")
    .min(5, "Заголовок не может содержать меньше 5ти символов")
    .max(50, "Заголовок не может содержать больше 50ти символов"),
});
