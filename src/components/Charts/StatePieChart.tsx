import React from "react";
import { useAppSelector } from "../../hooks";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const StatePieChart: React.FC = () => {
  const producers = useAppSelector((state) => state.producers.producers);

  const stateCounts = producers.reduce(
    (acc: { [key: string]: number }, producer) => {
      acc[producer.state] = (acc[producer.state] || 0) + 1;
      return acc;
    },
    {}
  );

  const data = {
    labels: Object.keys(stateCounts),
    datasets: [
      {
        data: Object.values(stateCounts),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#66BB6A",
          "#FFA726",
          "#AB47BC",
          "#26C6DA",
          "#D4E157",
          "#FF7043",
          "#8D6E63",
        ],
      },
    ],
  };

  return (
    <div>
      <h3>Farms by State</h3>
      <Pie data={data} />
    </div>
  );
};

export default StatePieChart;
