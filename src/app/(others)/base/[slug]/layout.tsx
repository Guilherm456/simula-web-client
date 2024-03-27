import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
export default async function Layout({ children }: Props) {
  return <div className="m-6 flex flex-col gap-5">{children}</div>;
}
