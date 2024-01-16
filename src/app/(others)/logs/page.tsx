"use client";

import { Log } from "@models/logs.model";
import dayjs from "dayjs";
import { For } from "million/react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
export default function Page() {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    const actualSocket = io(`${process.env.NEXT_PUBLIC_API}`, {
      path: "/log",
      extraHeaders: {
        "Access-Control-Allow-Origin": "*",
      },
    });

    actualSocket?.emit("log", { isFirstConnection: true }, (data: Log[]) => {
      setLogs(data);
    });

    actualSocket.on("newLog", (data: Log[]) => {
      setLogs((logs) => [...data, ...logs]);
    });

    return () => {
      actualSocket?.disconnect();
    };
  }, []);

  return logs.length === 0 ? (
    <div className="w-full text-center text-gray-4">
      Nenhum registro ou carregando...
    </div>
  ) : (
    <For each={logs} key={(log: Log) => log.id}>
      {(log) => (
        <div key={log.id} className="flex w-max gap-2">
          <div className="text-gray-4">
            ({dayjs(log.date).format("DD/MM/YYYY HH:mm:ss")})
          </div>
          <div
            className={
              log.type === "error"
                ? "text-red-600"
                : log.type === "warn"
                  ? "text-yellow-600"
                  : "text-green-600"
            }
          >
            [{log.type}]
          </div>
          <div className=" text-gray-4">{log.message}</div>
        </div>
      )}
    </For>
  );
}
