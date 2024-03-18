import yup from "@utils/yup";

export const userCreateSchema = yup.object().shape({
  name: yup.string().required().label("Nome"),
  email: yup.string().email().required().label("Email"),
  password: yup
    .string()
    .required()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .label("Senha"),
  confirmPassword: yup
    .string()
    .required()
    .label("Confirme a senha")
    .oneOf([yup.ref("password")], "As senhas não coincidem"),
  role: yup
    .string()
    .required()
    .label("Perfil")
    .oneOf(["admin", "user", "guest"]),
});
