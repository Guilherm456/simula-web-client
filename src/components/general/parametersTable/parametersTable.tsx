"use client";
import Tabela from "@components/general/Datatable";
import { ParameterDB } from "@models/parameters.model";
import { StructureParameters } from "@models/structure.model";
import { getParameter } from "@services/parameters";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { FC, Suspense, useEffect, useMemo, useState } from "react";
import { Socket, io } from "socket.io-client";
import { Tabs } from "./tabs";

interface Props {
  parameters: ParameterDB;
  structureParameters: StructureParameters[];
  editable?: boolean;
}
export const ParametersTable: FC<Props> = ({
  parameters,
  structureParameters,
  editable,
}) => {
  const [activeTab, setActiveTab] = useState<StructureParameters | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<StructureParameters | null>(
    null,
  );
  const [parameterId, setParameterId] = useState<string | null>(null);

  const [page, setPage] = useState(0);

  const { data: parameter, isPending } = useQuery({
    queryKey: ["parameter", parameterId, page],
    queryFn: async () =>
      await getParameter(parameterId!, {
        offset: page,
      }),
    enabled: !!parameterId, // A busca só ocorre se parameterId não for nulo
  });

  const columns = useMemo(() => {
    if (!activeTab && !activeSubTab) return [];

    const index = structureParameters.findIndex(
      (key) => key.name === activeTab?.name,
    );

    if (activeSubTab) {
      const subIndex = structureParameters[index].subParameters.findIndex(
        (key) => key.name === activeSubTab?.name,
      );
      return structureParameters[index].subParameters[subIndex].values.map(
        (value) => ({
          header: value.name,
          accessorKey: value.name,
        }),
      );
    } else {
      return structureParameters[index].values.map((value) => ({
        header: value.name,
        accessorKey: value.name,
      }));
    }
  }, [activeSubTab, activeTab, parameterId, structureParameters]);

  console.debug("columns", columns, parameter?.content);

  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (socket || !editable) return;

    const token = getCookie("access_token");
    setSocket(
      io(`${process.env.NEXT_PUBLIC_API}`, {
        extraHeaders: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },

        path: "/edit-parameters",
      }),
    );

    socket?.on("connect", () => {
      console.log("conectado");
    });
  });

  return (
    <div>
      <Tabs
        onChange={setParameterId}
        activeTab={activeTab}
        activeSubTab={activeSubTab}
        setActiveTab={setActiveTab}
        setActiveSubTab={setActiveSubTab}
        tabs={structureParameters}
        value={parameters}
      />
      {!parameterId ? (
        <div className="text-center">Selecione um dado para carregar</div>
      ) : isPending ? (
        <div className="text-center">Carregando...</div>
      ) : !parameter ? (
        <div className="text-center">Nenhum dado encontrado</div>
      ) : (
        <Suspense fallback={<div>Carregando...</div>}>
          <Tabela
            columns={columns ?? []}
            data={parameter?.content ?? []}
            editable={editable}
            onRowChange={(index, column, value) =>
              socket?.emit("edit", {
                op: "u",
                details: [
                  {
                    index,
                    field: column,
                    value,
                  },
                ],
                id: parameterId,
              })
            }
            onRowCreate={() =>
              socket?.emit("edit", {
                op: "a",
                details: [
                  {
                    index: 0,
                  },
                ],
                id: parameterId,
              })
            }
            onRowsDelete={(rows) =>
              socket?.emit("edit", {
                op: "d",
                details: rows.map((row) => ({ index: row })),
                id: parameterId,
              })
            }
          />
        </Suspense>
      )}
    </div>
  );
};
