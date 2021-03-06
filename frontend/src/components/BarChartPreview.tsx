import React from "react";
import {
  XAxis,
  YAxis,
  BarChart,
  Bar,
  Legend,
  LabelList,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useColors } from "../hooks";

type Props = {
  title: string;
  summary: string;
  bars: Array<string>;
  data?: Array<object>;
};

const BarChartPreview = (props: Props) => {
  const colors = useColors(props.bars.length);
  return (
    <div>
      <h2 className="margin-left-1 margin-bottom-1">{props.title}</h2>
      <p className="margin-left-1 margin-top-0 margin-bottom-3">
        {props.summary}
      </p>
      <ResponsiveContainer
        width="100%"
        height={props.data && props.data.length > 15 ? 600 : 300}
      >
        <BarChart
          data={props.data}
          layout="vertical"
          margin={{ right: 0, left: 0 }}
        >
          <CartesianGrid horizontal={false} />
          <XAxis type="number" />
          <YAxis
            dataKey={props.bars.length ? props.bars[0] : ""}
            type="category"
            width={
              (props.data
                ?.map((d) => (d as any)[props.bars.length ? props.bars[0] : ""])
                .map((c) => (c as string).length)
                .reduce((a, b) => (a > b ? a : b), 0) || 0) *
                8 +
              16
            }
            minTickGap={0}
          />
          <Legend margin={{ top: 50, left: 50, right: 50 }} />
          {props.bars.length &&
            props.bars.slice(1).map((bar, index) => {
              return (
                <Bar dataKey={bar} fill={colors[index]} key={index}>
                  {props.bars.length <= 3 ? (
                    <LabelList dataKey={bar} position="right" />
                  ) : (
                    ""
                  )}
                </Bar>
              );
            })}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartPreview;
