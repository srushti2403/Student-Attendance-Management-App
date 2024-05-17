import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

interface Stud {
  maths: number;
  english: number;
  science: number;
  hindi: number;
  sst: number;
}

type PiePercentageProps = {
  stud: Stud;
};

const COLORS: string[] = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
];

const PiePercentage: React.FC<PiePercentageProps> = ({
  stud,
}: PiePercentageProps) => {
  console.log(stud, "s");

  const data: Array<{ name: string; value: number }> = [
    { name: "Maths", value: stud.maths },
    { name: "English", value: stud.english },
    { name: "Science", value: stud.science },
    { name: "Hindi", value: stud.hindi },
    { name: "SST", value: stud.sst },
  ];

  console.log(data, "dddd");

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          dataKey="value"
          isAnimationActive={true}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={110}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend align="center" verticalAlign="bottom" iconType="circle" />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PiePercentage;
