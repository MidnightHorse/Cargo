import React, { useEffect, useState } from 'react';
import { Table, Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Navbar from "../../global/navbar";
import { getCars } from '../../API/cars';


const ViewList = () => {
  const [cars, setCars] = useState([]);
  const [showAvailable, setShowAvailable] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getCars().then((response) => {
      setCars(response)
    })
  }, [cars])

  const filterAvailableCars = () => {
    if (showAvailable) {
      return cars.filter((car) => car.booked === 0);
    }
    return cars;
  };

  const handleViewDetails = (id, record) => {
    navigate(`/car/${id}`, {"state":{carDetails: record}});
  };

  // columns for table
  const columns = [
    {
        title: 'Make',
        dataIndex: 'make',
        key: 'make',
    },
    {
        title: 'Model',
        dataIndex: 'model',
        key: 'model',
    },
    {
        title: 'Year',
        dataIndex: 'year',
        key: 'year',
    },
    {
        title: 'Engine Type',
        dataIndex: 'engineType',
        key: 'engineType',
    },
    {
        title: 'Door Type',
        dataIndex: 'doorType',
        key: 'doorType',
    },
    {
        title: 'Seats',
        dataIndex: 'seats',
        key: 'seats',
    },
    {
        title: 'Price Per Day',
        dataIndex: 'pricePerDay',
        key: 'pricePerDay',
    },
    {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
    },
    {
        title: 'Car Image',
        dataIndex: 'carProfileURL',
        key: 'carProfileURL',
        render:(text, record)=>{
            return record.carProfileURL &&
                <Image src={record.carProfileURL}  style={{width:200,height:200}}/>
        }
    },
    {
        title: 'Features',
        dataIndex: 'features',
        key: 'features',
    },
    {
      title: 'Booked',
      dataIndex: 'booked',
      key: 'booked',
      render: (text, record) => (
        <>
          {text === 0 ? 'Not Booked' : 'Booked'}
        </>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record) => (
        <Button
          variant="contained"
          onClick={() => handleViewDetails(record._id, record)}
          style={{ marginLeft: '0.5rem' }}
        >
          View Details
        </Button>
      ),
    },
  ];

return (
    <div>
      <Navbar/>
      <Table dataSource={filterAvailableCars()} columns={columns} />
      <Button
        variant="contained"
        onClick={() => setShowAvailable(!showAvailable)}
        style={{ marginTop: '1rem' }}
      >
        {showAvailable ? 'Show All' : 'Show Available'}
      </Button>
    </div>
  );
};



export default ViewList;
