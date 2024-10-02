import React, { useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import CarImage from '../../random.png';
import Navbar from "../../global/navbar";

import CarForm from '../../components/CarForm';

import { addCar } from '../../API/cars';

const PostCar = () => {
  const [open, setOpen] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (carData) => {
    (async () => {
      try {
        // Make API call to add car to the database
        const response = await addCar(carData);
  
        if (response.success) {
          setSubmissionStatus('Your car has been submitted!');
        }
      } catch (error) {
        console.error('Error adding car:', error);
        setSubmissionStatus('Failed to submit the car.');
      }
      setSubmissionStatus('Your car has been submitted!');
  
      handleClose();
    })();
  };

  const handleCancel = () => {
    handleClose();
  };

  return (
    <div>
      <Navbar/>
      <h2 style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>Ready to share?</h2>
      <img src={CarImage} alt="Car" style={{ maxWidth: '25%', height: 'auto', margin: '1rem', marginLeft: '10rem' }} />
      <img src={CarImage} alt="Car" style={{ maxWidth: '25%', height: 'auto', margin: '1rem' }} />
      <img src={CarImage} alt="Car" style={{ maxWidth: '25%', height: 'auto', margin: '1rem' }} />
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1px' }}>
        <Button variant="contained" onClick={handleOpen}>
          Add
        </Button>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Car Details</DialogTitle>
        <DialogContent>
          <CarForm handleSubmit={handleSubmit} handleCancel={handleCancel}/>
        </DialogContent>
      </Dialog>

      {submissionStatus && (
        <div style={{ textAlign: 'center', marginTop: '1rem', color: 'green' }}>
          {submissionStatus}
        </div>
      )}
    </div>
  );
};

export default PostCar;



