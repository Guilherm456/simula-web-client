import yup from "@utils/yup";

export const baseSchema = yup.object().shape({
  name: yup.string().required().label("Nome"),
  type: yup.object().required().label("Estrutura"),
  parameters: yup.object().optional(),
  files: yup.array().optional(),
});
