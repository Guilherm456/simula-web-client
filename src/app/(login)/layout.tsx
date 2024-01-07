import { Metadata } from "next";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100 md:items-center">
      <div className="container">
        <div className="mx-auto h-full max-w-md space-y-10 rounded-md border border-solid border-gray-3 bg-white p-6 md:h-min md:max-w-lg lg:max-w-xl">
          {children}
        </div>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "SIMULA Web - Conecte-se",
  description: "Faça login para acessar o sistema",
};
