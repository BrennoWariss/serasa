import React from "react";
import { useAppSelector } from "../../hooks";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const LandUsePieChart: React.FC = () => {
  const producers = useAppSelector((state) => state.producers.producers);

  const totalArableArea = producers.reduce(
    (sum, producer) => sum + producer.arableArea,
    0
  );
  const totalVegetationArea = producers.reduce(
    (sum, producer) => sum + producer.vegetationArea,
    0
  );

  const data = {
    labels: ["Arable Area", "Vegetation Area"],
    datasets: [
      {
        data: [totalArableArea, totalVegetationArea],
        backgroundColor: ["#66BB6A", "#FFA726"],
      },
    ],
  };

  return (
    <div>
      <h3>Land Use Distribution</h3>
      <Pie data={data} />
    </div>
  );
};

export default LandUsePieChart;
