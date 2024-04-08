import yup from "@utils/yup";

const ValuesSchema = yup.object().shape({
  name: yup.string().required().label("Nome"),
  type: yup.string().is(["number", "string", "mixed"]).required().label("Tipo"),
});
const SubParametersSchema = yup.object().shape({
  name: yup.string().required().label("Nome"),
  values: yup.array().of(ValuesSchema).min(1).required().label("Valores"),
});

const ParametersSchema = yup.object().shape({
  name: yup.string().required().label("Nome"),
  // Caso tenha um values, não pode ter subParameters, caso tenha subParameters, não pode ter values
  values: yup
    .array()
    .of(ValuesSchema)
    .test(
      "valuesOrSubParameters",
      "Não pode ter valores e subparâmetros ao mesmo tempo",
      function (value) {
        return !value || !this.parent.subparameters;
      },
    )
    .test(
      "needsOneValue",
      "Deve ter pelo menos um valor",
      function (value, context) {
        return context.parent.subparameters || value.length > 0;
      },
    ),
  subparameters: yup
    .array()
    .of(SubParametersSchema)

    .label("Subparâmetros"),
});

export const structureSchema = yup.object().shape({
  name: yup.string().required().label("Nome"),
  folder: yup
    .string()
    .required()
    .matches(/^[a-zA-Z0-9_]*$/, "Apenas letras, números e _")
    .label("Pasta do simulador"),
  inputsFolder: yup
    .string()
    .required()
    .matches(/^[a-zA-Z0-9_]*$/, "Apenas letras, números e _")
    .label("Pasta de entrada dos parâmetros"),
  resultsFolder: yup
    .string()
    .required()
    .matches(/^[a-zA-Z0-9_]*$/, "Apenas letras, números e _")
    .label("Pasta de saída dos resultados"),
  executeCommand: yup
    .string()
    .required()
    .label("Comando de execução do simulador"),
  agents: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required().label("Nome"),
        attributes: yup.array().of(
          yup.object().shape({
            name: yup.string().required().label("Nome"),
            type: yup.string().required().label("Tipo"),
          }),
        ),
      }),
    )
    .min(1)
    .required()
    .label("Agentes"),
  parameters: yup
    .array()
    .of(ParametersSchema)
    .min(1)
    .required()
    .label("Parâmetros"),
  outputParameters: yup
    .array()
    .of(ParametersSchema)
    .min(1)
    .required()
    .label("Parâmetros de saída"),
});
