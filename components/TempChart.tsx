"use client";

import { Card, AreaChart, Title } from "@tremor/react";
import { RiTempColdLine } from "react-icons/ri";
type Props = {
  results: Root;
};

function TempChart({ results }: Props) {
  const hourly = results?.hourly.time
    .map((time) =>
      new Date(time).toLocaleString("en", { hour: "numeric", hour12: false })
    )
    .slice(1, 25);

  const data = hourly.map((hour, i) => ({
    time: Number(hour),
    "Temperature (C)": results.hourly.temperature_2m[i],
  }));

  const dataFormatter = (number: number) => `${number} `;

  return (
    <Card className="">
      <Title
        style={{ display: "flex", alignItems: "center" }}
        className="gap-2"
      >
        <RiTempColdLine /> 24 Hours Temperature chart
      </Title>

      <AreaChart
        className="mt-6"
        data={data}
        showLegend
        index="time"
        categories={["Temperature (C)"]}
        colors={["cyan", "yellow"]}
        minValue={0}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
  );
}

export default TempChart;
