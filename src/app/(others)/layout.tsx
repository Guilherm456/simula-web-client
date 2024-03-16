import Drawer from "@pages/components/Drawer";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col md:flex-row">
      <Drawer />
      <div className="container mt-[4.25rem] h-[90dvh] max-h-screen overflow-y-auto md:mt-0 md:h-screen">
        {children}
      </div>
    </div>
  );
}
