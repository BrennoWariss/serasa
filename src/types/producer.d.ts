export interface Producer {
  id: number;
  cpfCnpj: string;
  producerName: string;
  farmName: string;
  city: string;
  state: string;
  totalFarmArea: number;
  arableArea: number;
  vegetationArea: number;
  plantedCrops: string[];
}
