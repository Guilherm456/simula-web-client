import Drawer from "@pages/components/Drawer";
import { Suspense } from "react";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col md:flex-row">
      <Suspense fallback={<div className="h-full w-14 rounded-md bg-gray-4" />}>
        <Drawer />
      </Suspense>
      <div className="container mt-[4.25rem] h-[90dvh] max-h-screen overflow-y-auto md:mt-0 md:h-screen">
        {children}
      </div>
    </div>
  );
}
