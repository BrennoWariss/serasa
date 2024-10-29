import React from "react";
import { useAppSelector } from "../../hooks";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const CropPieChart: React.FC = () => {
  const producers = useAppSelector((state) => state.producers.producers);

  const cropCounts = producers.reduce(
    (acc: { [key: string]: number }, producer) => {
      producer.plantedCrops.forEach((crop) => {
        acc[crop] = (acc[crop] || 0) + 1;
      });
      return acc;
    },
    {}
  );

  const data = {
    labels: Object.keys(cropCounts),
    datasets: [
      {
        data: Object.values(cropCounts),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#66BB6A",
          "#FFA726",
        ],
      },
    ],
  };

  return (
    <div>
      <h3>Farms by Crop</h3>
      <Pie data={data} />
    </div>
  );
};

export default CropPieChart;
