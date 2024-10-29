import React from "react";
import { useAppSelector } from "../../hooks";
import { Typography, Grid } from "@mui/material";
import StatePieChart from "../Charts/StatePieChart";
import CropPieChart from "../Charts/CropPieChart";
import LandUsePieChart from "../Charts/LandUsePieChart";

const Dashboard: React.FC = () => {
  const producers = useAppSelector((state) => state.producers.producers);

  const totalFarms = producers.length;
  const totalFarmArea = producers.reduce(
    (sum, producer) => sum + producer.totalFarmArea,
    0
  );

  return (
    <div>
      <Typography variant="h4">Dashboard</Typography>
      <Typography variant="h6">Total Farms: {totalFarms}</Typography>
      <Typography variant="h6">Total Farm Area: {totalFarmArea} ha</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <StatePieChart />
        </Grid>
        <Grid item xs={12} md={4}>
          <CropPieChart />
        </Grid>
        <Grid item xs={12} md={4}>
          <LandUsePieChart />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
