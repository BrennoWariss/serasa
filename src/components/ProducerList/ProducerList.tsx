import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { deleteProducer } from "../../redux/producersSlice";
import { Producer } from "../../types/producer";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import ProducerForm from "../ProducerForm/ProducerForm";

const ProducerList: React.FC = () => {
  const dispatch = useAppDispatch();
  const producers = useAppSelector((state) => state.producers.producers);
  const [editingProducer, setEditingProducer] = useState<Producer | null>(null);

  const handleEdit = (producer: Producer) => {
    setEditingProducer(producer);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteProducer(id));
  };

  const handleCancelEdit = () => {
    setEditingProducer(null);
  };

  return (
    <div>
      <h2>Producer List</h2>
      {editingProducer ? (
        <ProducerForm
          selectedProducer={editingProducer}
          onCancelEdit={handleCancelEdit}
        />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Producer Name</TableCell>
              <TableCell>Farm Name</TableCell>
              <TableCell>City</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Total Farm Area (ha)</TableCell>
              <TableCell>Arable Area (ha)</TableCell>
              <TableCell>Vegetation Area (ha)</TableCell>
              <TableCell>Planted Crops</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {producers.map((producer) => (
              <TableRow key={producer.id}>
                <TableCell>{producer.producerName}</TableCell>
                <TableCell>{producer.farmName}</TableCell>
                <TableCell>{producer.city}</TableCell>
                <TableCell>{producer.state}</TableCell>
                <TableCell>{producer.totalFarmArea}</TableCell>
                <TableCell>{producer.arableArea}</TableCell>
                <TableCell>{producer.vegetationArea}</TableCell>
                <TableCell>{producer.plantedCrops.join(", ")}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleEdit(producer)}
                    variant="outlined"
                    color="primary"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(producer.id)}
                    variant="outlined"
                    color="secondary"
                    style={{ marginLeft: "5px" }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ProducerList;
