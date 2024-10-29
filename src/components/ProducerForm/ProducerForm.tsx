import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addProducer, updateProducer } from "../../redux/producersSlice";
import { Producer } from "../../types/producer";

interface ProducerFormProps {
  selectedProducer?: Producer;
  onCancelEdit?: () => void;
}

const ProducerForm: React.FC<ProducerFormProps> = ({
  selectedProducer,
  onCancelEdit,
}) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<Producer>(
    selectedProducer || {
      id: Date.now(),
      cpfCnpj: "",
      producerName: "",
      farmName: "",
      city: "",
      state: "",
      totalFarmArea: 0,
      arableArea: 0,
      vegetationArea: 0,
      plantedCrops: [],
    }
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const cropOptions = ["Soja", "Milho", "Algodão", "Café", "Cana de Açúcar"];
  const stateOptions = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];

  useEffect(() => {
    if (selectedProducer) {
      setFormData(selectedProducer);
    }
  }, [selectedProducer]);

  const validateCpfCnpj = (value: string) => {
    if (value.length !== 11 && value.length !== 14) {
      return "CPF must be 11 digits and CNPJ must be 14 digits";
    }
    return "";
  };

  const validateAreas = () => {
    console.log(formData, formData.arableArea + formData.vegetationArea);
    if (
      formData.arableArea + formData.vegetationArea >
      formData.totalFarmArea
    ) {
      return "Arable area and vegetation area cannot exceed total farm area";
    }
    return "";
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any
  ) => {
    const { name, value } = e.target;

    let newValue: any = value;

    // Convert numerical fields to numbers
    if (["totalFarmArea", "arableArea", "vegetationArea"].includes(name)) {
      newValue = parseFloat(value);
      // Handle NaN cases if necessary
      if (isNaN(newValue)) {
        newValue = 0;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: name === "plantedCrops" ? value : newValue,
    }));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    const cpfCnpjError = validateCpfCnpj(formData.cpfCnpj);
    if (cpfCnpjError) newErrors.cpfCnpj = cpfCnpjError;

    const areaError = validateAreas();
    if (areaError) newErrors.arableArea = areaError;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (selectedProducer) {
        dispatch(updateProducer(formData));
        if (onCancelEdit) onCancelEdit();
      } else {
        dispatch(addProducer(formData));
        setFormData({
          id: Date.now(),
          cpfCnpj: "",
          producerName: "",
          farmName: "",
          city: "",
          state: "",
          totalFarmArea: 0,
          arableArea: 0,
          vegetationArea: 0,
          plantedCrops: [],
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="CPF/CNPJ"
        name="cpfCnpj"
        value={formData.cpfCnpj}
        onChange={handleChange}
        error={!!errors.cpfCnpj}
        helperText={errors.cpfCnpj}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Producer Name"
        name="producerName"
        value={formData.producerName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Farm Name"
        name="farmName"
        value={formData.farmName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="City"
        name="city"
        value={formData.city}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="state-label">State</InputLabel>
        <Select
          labelId="state-label"
          name="state"
          value={formData.state}
          onChange={handleChange}
          label="State"
        >
          {stateOptions.map((state) => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Total Farm Area (ha)"
        name="totalFarmArea"
        type="number"
        value={formData.totalFarmArea}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Arable Area (ha)"
        name="arableArea"
        type="number"
        value={formData.arableArea}
        onChange={handleChange}
        error={!!errors.arableArea}
        helperText={errors.arableArea}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Vegetation Area (ha)"
        name="vegetationArea"
        type="number"
        value={formData.vegetationArea}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="plantedCrops-label">Planted Crops</InputLabel>
        <Select
          labelId="plantedCrops-label"
          name="plantedCrops"
          multiple
          value={formData.plantedCrops}
          onChange={handleChange}
          input={<OutlinedInput label="Planted Crops" />}
          renderValue={(selected) => (selected as string[]).join(", ")}
        >
          {cropOptions.map((crop) => (
            <MenuItem key={crop} value={crop}>
              <Checkbox checked={formData.plantedCrops.includes(crop)} />
              <ListItemText primary={crop} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        {selectedProducer ? "Update Producer" : "Add Producer"}
      </Button>
      {selectedProducer && onCancelEdit && (
        <Button
          onClick={onCancelEdit}
          variant="outlined"
          color="secondary"
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </Button>
      )}
    </form>
  );
};

export default ProducerForm;
