"use client";
import { AgentStructure } from "@models/structure.model";
import { FC } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ChartSimulationProps = {
  data: Array<AgentStructure & { stats: number[] }>;
};

export const ChartSimulation: FC<ChartSimulationProps> = ({ data }) => {
  return (
    <ResponsiveContainer
      className="h-full w-full"
      minWidth="50dvw"
      minHeight="50dvh"
    >
      <LineChart data={data}>
        <XAxis
          name="Ciclo"
          type="number"
          dataKey="cycle"
          label={{ value: "Ciclo", position: "bottom" }}
        />
        <YAxis
          label={{ value: "Nº de agentes", angle: -90, position: "insideLeft" }}
        />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        {data.map((agentData, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey="stats"
            data={agentData.stats.map((stat, cycle) => ({
              cycle,
              stats: stat,
            }))}
            stroke={agentData.color}
            name={agentData.name}
            fontWeight={600}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
