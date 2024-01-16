interface Props {
  children: React.ReactNode;
}
export default function Layout({ children }: Props) {
  return (
    <div className="m-6 flex flex-col gap-5">
      <div className="z-10 flex flex-col gap-5 bg-white py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-bold text-gray-12">
            Registros do servidor
          </h1>
        </div>
      </div>
      <div className="h-[80dvh] overflow-auto rounded-2xl border border-solid border-gray-4 bg-gray-12 p-2">
        {children}
      </div>
    </div>
  );
}
