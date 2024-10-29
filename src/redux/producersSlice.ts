import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Producer } from "../types/producer";

interface ProducersState {
  producers: Producer[];
}

const initialState: ProducersState = {
  //mock data
  producers: [
    {
      id: 1,
      cpfCnpj: "12345678901",
      producerName: "João Silva",
      farmName: "Fazenda São João",
      city: "Ribeirão Preto",
      state: "SP",
      totalFarmArea: 500,
      arableArea: 300,
      vegetationArea: 200,
      plantedCrops: ["Soja", "Milho"],
    },
    {
      id: 2,
      cpfCnpj: "98765432100",
      producerName: "Maria Oliveira",
      farmName: "Sítio das Palmeiras",
      city: "Uberlândia",
      state: "MG",
      totalFarmArea: 300,
      arableArea: 150,
      vegetationArea: 150,
      plantedCrops: ["Café"],
    },
  ],
};

const producersSlice = createSlice({
  name: "producers",
  initialState,
  reducers: {
    addProducer: (state, action: PayloadAction<Producer>) => {
      state.producers.push(action.payload);
    },
    updateProducer: (state, action: PayloadAction<Producer>) => {
      const index = state.producers.findIndex(
        (p) => p.id === action.payload.id
      );
      if (index !== -1) {
        state.producers[index] = action.payload;
      }
    },
    deleteProducer: (state, action: PayloadAction<number>) => {
      state.producers = state.producers.filter((p) => p.id !== action.payload);
    },
    setProducers: (state, action: PayloadAction<Producer[]>) => {
      state.producers = action.payload;
    },
  },
});

export const { addProducer, updateProducer, deleteProducer, setProducers } =
  producersSlice.actions;

export default producersSlice.reducer;
