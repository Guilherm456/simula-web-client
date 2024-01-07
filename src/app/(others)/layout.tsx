import { Drawer } from "@pages/components/Drawer";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col md:flex-row">
      <Drawer />
      <div className="container mt-[4.25rem] max-h-screen min-h-screen overflow-y-auto md:mt-0">
        {children}
      </div>
    </div>
  );
}
