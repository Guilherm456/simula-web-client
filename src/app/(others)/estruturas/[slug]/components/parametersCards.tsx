import { StructureParameters } from "@models/structure.model";
import { cn } from "@utils/utils";
import { FC } from "react";

interface Props {
  parameters: StructureParameters[];
  level?: number;
}

export const CardParameters: FC<Props> = ({ parameters, level = 0 }) => {
  return (
    <>
      {parameters.map((param) => (
        <div
          key={param.name}
          className={cn(
            `ml-${level * 4} mt-2`,
            level === 0 &&
              "rounded-md border border-dashed border-gray-200 p-4",
          )}
        >
          <div className="font-bold text-gray-700">{param.name}</div>
          <div className="ml-4">
            {param.values?.map((value) => (
              <div key={value.name} className="text-gray-600">
                {value.name} ({value.type})
              </div>
            ))}
            {param.subParameters?.length > 0 && (
              <div className="mt-2 border-l-2 border-dashed border-gray-200 pl-2">
                <CardParameters
                  parameters={param.subParameters}
                  level={level + 1}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};
