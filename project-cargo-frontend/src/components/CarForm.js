import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const CarForm = ({ handleSubmit, handleCancel }) => {
  const [car, setCar] = useState({
    make: '',
    model: '',
    year: '',
    engineType: '',
    doorType:'',
    seats: '',
    features:'',
    pricePerDay: '',
    location: '',
  });
  const [carProfileURL, setCarProfileURL] = useState(null);

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setCarProfileURL(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setCar({
      make: '',
      model: '',
      year: '',
      engineType: '',
      doorType:'',
      seats: '',
      features:'',
      pricePerDay: '',
      location: '',
    });
    setCarProfileURL(null);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const carData = { ...car, carProfileURL, booked: 0 };
    handleSubmit(carData);
    resetForm();
    console.log(car);
  };

  const onCancel = () => {
    handleCancel();
    resetForm();
  };

  return (
    <form onSubmit={onSubmit}>
      <TextField
        label="Make"
        name="make"
        value={car.make}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Model"
        name="model"
        value={car.model}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Year"
        name="year"
        value={car.year}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <FormControl fullWidth margin="normal" required>
        <InputLabel>Engine</InputLabel>
        <Select
          name="engineType"
          value={car.engineType}
          onChange={handleChange}
        >
          <MenuItem value="Electric">Electric</MenuItem>
          <MenuItem value="Hybrid">Hybrid</MenuItem>
          <MenuItem value="Gas">Gas</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal" required>
        <InputLabel>Door Type</InputLabel>
        <Select
          name="doorType"
          value={car.doorType}
          onChange={handleChange}
        >
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="4">4</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Seats"
        name="seats"
        value={car.seats}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Price"
        name="pricePerDay"
        value={car.pricePerDay}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Features"
        name="features"
        value={car.features}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Zip Code"
        name="location"
        value={car.location}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: '16px' }}>
        <label htmlFor="carImage">Upload a picture of your car here. (OPTIONAL)</label>
        <input
          id="carImage"
          type="file"
          accept="image/jpeg, image/jpg, image/png"
          onChange={handleImageUpload}
          style={{ marginTop: '8px' }}
        />
        {carProfileURL && <img src={carProfileURL} alt="Car" style={{ maxWidth: '100%', marginTop: '10px' }} />}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="text" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </div>
      
    </form>
  );
};

export default CarForm;

