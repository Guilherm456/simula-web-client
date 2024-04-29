import { StructureParameters } from "@models/structure.model";
import { cn } from "@utils/utils";
import { Check, Upload } from "lucide-react";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { UploadFile } from "./uploadFile";

interface Props {
  parameters?: StructureParameters[];

  onSendFiles: (files: File[], index: number) => void;
  onCreateBase: () => void;
}
export const ParametersExibition: FC<Props> = ({
  parameters,
  onSendFiles,
  onCreateBase,
}) => {
  const { watch } = useFormContext();

  return (
    <div className="flex flex-col gap-2 border-t border-solid border-gray-4 ">
      {!!watch("type") ? (
        <>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <span className="text-xl text-gray-12">Arquivos importados:</span>
              <span className="text-sm text-muted-foreground">
                Os arquivos podem ser arrastados para cada caixa de parâmetro ou
                clicando na caixa.
              </span>
            </div>

            <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
              {parameters?.map((param, mainIndex) => {
                return (
                  <UploadFile
                    onUpload={(files) => onSendFiles(files, mainIndex)}
                    key={param.name}
                    className="w-full cursor-pointer rounded-md border border-solid border-gray-4 p-2"
                    id={`upload-file-${mainIndex}`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span
                        className={cn(
                          param.subParameters?.length && "text-base underline",
                          "line-clamp-1 font-semibold text-gray-12",
                        )}
                      >
                        {param.name}
                      </span>
                      {watch(`files.${mainIndex}`) &&
                        !param.subParameters?.length && (
                          <Check className="h-4 w-4 text-green-600" />
                        )}
                    </div>
                    <div className="text-center">
                      {param.subParameters?.length ? (
                        param.subParameters?.map((subParam, index: number) => (
                          <span
                            key={index}
                            className={cn(
                              "line-clamp-1 text-sm ",
                              watch(
                                `files.${
                                  mainIndex + index + (mainIndex > 0 ? 1 : 0)
                                }`,
                              )
                                ? "text-green-600 underline"
                                : "text-gray-11",
                            )}
                          >
                            -{subParam.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-gray-11">
                          Não possui subparametros
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex items-center justify-center gap-2">
                      <Upload className="h-4 w-4 text-cyan-800" />
                      <span className="text-sm text-cyan-800 underline">
                        Importar arquivo(s)
                      </span>
                    </div>
                  </UploadFile>
                );
              })}
            </div>
          </div>
          <div className="flex w-full items-center gap-2">
            <div className="h-[1px] w-full bg-gray-12" />
            <span>ou</span>
            <div className="h-[1px] w-full bg-gray-12" />
          </div>
          <span
            className="w-full cursor-pointer text-center font-semibold text-cyan-800 underline"
            onClick={onCreateBase}
            id="create-base-manually-button"
          >
            Criar dados manualmente
          </span>
        </>
      ) : (
        <span className="text-sm text-gray-11">
          Nenhuma estrutura selecionada
        </span>
      )}
    </div>
  );
};
