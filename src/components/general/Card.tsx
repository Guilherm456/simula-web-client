import { FC } from "react";

interface Props {
  title?: string | React.ReactNode;
  children: React.ReactNode;
}
export const Card: FC<Props> = ({ children, title }) => {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-solid border-gray-4 p-4">
      {typeof title === "string" ? (
        <span className="text-2xl font-bold text-gray-12">{title}</span>
      ) : (
        title
      )}
      {children}
    </div>
  );
};
