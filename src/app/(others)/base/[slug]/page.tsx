import { Card } from "@components/general/Card";
import { Header } from "@components/general/header";
import { ParametersTable } from "@components/general/parametersTable/parametersTable";
import { getBase } from "@services/base";
import dayjs from "dayjs";
import { Building, CalendarClock, CalendarPlus } from "lucide-react";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getBase(params.slug);

  if (!data) notFound();

  return (
    <>
      <Header
        urlEdit={`/base/${data?._id}/editar`}
        name={data?.name}
        editable
        user={data?.user?.toString()}
      />

      <Card title="Informações">
        <div className="flex items-center gap-2">
          <Building size={20} className="text-gray-11" />
          <span className="text-gray-11">Estrutura utilizada:</span>
          <span className="text-gray-12">{data.type?.name ?? "-"}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarPlus size={20} className="text-gray-11" />
          <span className="text-gray-11">Criado em:</span>
          <span className="text-gray-12">
            {dayjs(data.createdAt).format("DD/MM/YYYY")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarClock size={20} className="text-gray-11" />
          <span className="text-gray-11">Última atualização:</span>
          <span className="text-gray-12">
            {dayjs(data.updatedAt).format("DD/MM/YYYY")}
          </span>
        </div>
      </Card>
      <div className="flex flex-col gap-2 rounded-2xl border border-solid border-gray-4 p-4">
        <span className="text-2xl font-bold text-gray-12">Dados</span>
        <ParametersTable
          parameters={data?.parameters}
          structureParameters={data?.type?.parameters}
        />
      </div>
    </>
  );
}
