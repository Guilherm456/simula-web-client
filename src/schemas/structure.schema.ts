import yup from "@utils/yup";

const ValuesSchema = yup.object().shape({
  name: yup.string().required().label("Nome do valor de um parâmetro"),
  type: yup
    .string()
    .is(["number", "string", "mixed"])
    .required()
    .label("Tipo de valor"),
});
const SubParametersSchema = yup.object().shape({
  name: yup.string().required().label("Nome do subparâmetro"),
  values: yup
    .array()
    .of(ValuesSchema)
    .min(1)
    .required()
    .label("Valores do subparâmetro"),
});

const ParametersSchema = yup.object().shape({
  name: yup.string().required().label("Nome do parâmetro"),
  // Caso tenha um values, não pode ter subParameters, caso tenha subParameters, não pode ter values
  values: yup
    .array()
    .of(ValuesSchema)
    .test(
      "valuesOrSubParameters",
      "Não pode ter valores e subparâmetros ao mesmo tempo dentro do parâmetro",
      function (value) {
        return !value || !this.parent.subparameters;
      },
    )
    .test(
      "needsOneValue",
      "Deve ter pelo menos um valor ou subparâmetro dentro do parâmetro",
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
  name: yup.string().required().label("Nome da estrutura"),
  folder: yup
    .string()
    .required()
    .matches(/^[a-zA-Z0-9_]*$/, "Apenas letras, números e _")
    .label("Pasta do simulador"),
  inputsFolder: yup
    .string()
    .required()
    .matches(/^[a-zA-Z0-9_/]*$/, "Apenas letras, números, _ e /")
    .label("Pasta de entrada dos parâmetros"),
  resultsFolder: yup
    .string()
    .required()
    .matches(/^[a-zA-Z0-9_/]*$/, "Apenas letras, números, _ e /")
    .label("Pasta de saída dos resultados"),
  executeCommand: yup
    .string()
    .required()
    .label("Comando de execução do simulador"),
  agents: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required().label("Nome do agente"),
        label: yup
          .string()
          .required()
          .label("Rótulo do agente")
          .matches(
            /^[a-zA-Z]*$/,
            "O rótulo do agente deve conter apenas letras",
          ),
        color: yup.string().required().label("Cor do agente"),
        onData: yup.string().required().label("Função onData"),
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

type StructureSchemaType = yup.InferType<typeof structureSchema>;
