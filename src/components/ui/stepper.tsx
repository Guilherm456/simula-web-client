import { cn } from "@utils/utils";
import { FC, ReactNode } from "react";

type ValueProps = string | number | object;

interface Props {
  value: ValueProps;
  onChange: (newValue: ValueProps) => void;
  steps: {
    value: ValueProps;
    label: string;
    icon: ReactNode;
    id?: string;
  }[];
}

export const Stepper: FC<Props> = ({ value, onChange, steps }) => {
  const indexValue = steps.findIndex((step) => step.value === value);
  return (
    <div className="flex w-full flex-col">
      <ul className="flex w-full flex-row items-center justify-between">
        {steps.map((step, index) => (
          <>
            <li
              key={index}
              className={cn(
                "flex cursor-pointer flex-col items-center justify-center",
                "w-full md:w-auto",
                value === step.value
                  ? "font-bold text-primary"
                  : index < indexValue
                    ? "text-blue-400"
                    : "text-gray-600",
              )}
              aria-current={value === step.value ? "step" : undefined}
              aria-label={`Abrir etapa de ${step.label}`}
              onClick={() => onChange(step.value)}
              id={step.id}
            >
              <span
                className={cn(
                  "rounded-full p-2",
                  value === step.value
                    ? "bg-indigo-600"
                    : index < indexValue
                      ? "bg-blue-300"
                      : "bg-gray-300",
                  "text-white",
                )}
              >
                {step.icon}
              </span>
              <span className="mt-2 hidden truncate text-sm font-medium md:block">
                {step.label}
              </span>
            </li>
            <div
              key={index}
              className={cn(
                "h-[1px] w-full",
                index < steps.length - 1 ? "" : "hidden",
                indexValue > index ? "bg-blue-400" : "bg-gray-300",
              )}
            />
          </>
        ))}
      </ul>
    </div>
  );
};
