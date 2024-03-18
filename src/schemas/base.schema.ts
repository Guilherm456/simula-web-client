import yup from "@utils/yup";

export const baseSchema = yup.object().shape({
  name: yup.string().required().label("Nome"),
  type: yup.object().required().label("Estrutura"),
  files: yup.array().optional(),
});

export const baseSchemaUpdate = yup.object().shape({
  name: yup.string().required().label("Nome"),
});
