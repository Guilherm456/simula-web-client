import yup from "@utils/yup";

export const loginSchema = yup.object({
  email: yup.string().email().required().label("E-mail"),
  password: yup.string().required().label("Senha"),
});

export const recoverPasswordEmailSchema = yup.object({
  email: yup.string().email().required().label("E-mail"),
});

export const resetPasswordSchema = yup.object({
  newPassword: yup.string().trim().required().label("Senha"),
  confirmPassword: yup
    .string()
    .trim()
    .required()
    .oneOf([yup.ref("newPassword")], "Senhas não conferem")
    .label("Confirmar senha"),
  token: yup.string().required().label("Token"),
});
