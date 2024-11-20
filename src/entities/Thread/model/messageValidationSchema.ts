import * as yup from "yup";

export const messageValidationSchema = yup.object({
  content: yup
    .string()
    .required("Сообщение не может быть пустым")
    .min(5, "Сообщение не может содержать меньше 5ти символов")
    .max(1600, "Сообщение не может содержать больше 1600та символов"),
  attachments: yup
    .mixed<File[]>()
    .required()
    .test("length", "Кол-во вложений не может быть больше 5ти", (value) => {
      return value.length <= 5;
    })
    .test("fileSize", "Размер файла привышает 10 мегабайт", (value) => {
      if (!value) return true;
      for (const file of value) {
        if (file.size > 1024 * 1024 * 10) {
          return false;
        }
      }
      return true;
    }),
});
