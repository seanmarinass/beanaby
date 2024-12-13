"use client";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Cell, Label, Pie, PieChart } from "recharts";
import { format } from "d3-format";
import { Card, CardDescription } from "@/components/ui/card";

export interface PieChartSegment {
  name: string;
  color: string;
  value: number;
}

interface PieChartSegmentWithPercentage {
  name: string;
  color: string;
  value: number;
  percentage: number;
}

interface PieChartProps {
  segments: PieChartSegment[];
}

function createChartConfig(segments: PieChartSegment[]): ChartConfig {
  const chartConfig = segments.reduce((config, segment) => {
    config[segment.name] = {
      label: segment.name,
      color: segment.color,
    };
    return config;
  }, {} as ChartConfig);

  return chartConfig;
}

function createChartData(
  segments: PieChartSegment[],
  totalAmount: number
): PieChartSegmentWithPercentage[] {
  return segments.map((segment) => ({
    ...segment,
    percentage: (segment.value / totalAmount) * 100,
  }));
}

function calculateTotalAmount(segments: PieChartSegment[]): number {
  return segments.reduce((acc, segment) => acc + segment.value, 0);
}

export default function PieChartWithLegend({ segments }: PieChartProps) {
  const chartConfig = createChartConfig(segments);
  const totalAmount = calculateTotalAmount(segments);
  const chartData = createChartData(segments, totalAmount);

  return (
    <ChartContainer config={chartConfig} className="max-h-full">
      <div className="grid grid-cols-3 gap-4 h-full w-full justify-center items-center">
        <PieChart width={400} height={300} className="col-span-2">
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            innerRadius={100}
            className="max-h-full"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        ${format(".2f")(totalAmount)}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Total Amount
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>

        <div className="flex flex-col gap-2">
          {chartData.map((data, index) => (
            <Card
              className="flex w-full p-2 shadow-none border-none justify-center items-center"
              key={index}
            >
              <span
                className="w-4 h-4 mr-2 rounded-full"
                style={{ backgroundColor: data.color }}
              />
              <CardDescription className="font-bold flex-1">
                {data.name}
              </CardDescription>
              <CardDescription>
                {format(".2f")(data.percentage)}%
              </CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </ChartContainer>
  );
}
