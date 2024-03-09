"use client";

import { ChartData } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export function Overview() {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  useEffect(() => {
    const chart = async () => {
      try {
        const { data }: { data: ChartData[] } = await axios.get(
          "tasks/getChartData"
        );
        data.sort((a, b) => {
          if (a._id < b._id) {
            return -1;
          }
          if (a._id > b._id) {
            return 1;
          }
          return 0;
        });
        setChartData(data);
      } catch (error) {
        console.error("Error fetching chart details:", error);
      }
    };
    chart();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <XAxis
          dataKey="_id"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey="count"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-[#9584FF]"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
