import yup from "@utils/yup";

export const simulationSchema = yup.object().shape({
  name: yup.string().required().label("Nome").max(50),
  base: yup
    .object()
    .shape({
      _id: yup.string().required().label("Base"),
    })
    .required()
    .label("Base"),
});
