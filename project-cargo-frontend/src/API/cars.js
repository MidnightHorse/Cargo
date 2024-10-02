import axios from 'axios'

//for API calls to the backend 
export const getCars = async() => {
  let response = await axios.get('http://173.254.240.202:3000/car/')
  if(response.data.success) {
    const cars = response.data.data.map(car => ({ ...car, id: car._id }));
    return cars
  } else {
    return {}
  }
}
export const getComments = async() => {
  let response = await axios.get('http://173.254.240.202:3000/comment/')
  if(response.data.success) {
    return response.data.data
  } else {
    return {}
  }
}

export const getUsers = async() => {
  let response = await axios.get('http://173.254.240.202:3000/user/')
  if(response.data.success){
    return response.data.data
  }
  else{
    return{}
  }
}

export const postOrder = async(uid, cid, orderDate, orderLength, totalPrice, active) => {
  let response = await axios.post('http://173.254.240.202:3000/order/', {
    uid,
    cid,
    orderDate,
    orderLength,
    totalPrice,
    active
  })
  if(response.data.success){
    return response.data.data
  }
  else{
    return{}
  }
}

export const postComment = async(uid, cid, comment, rating) => {
  let response = await axios.post('http://173.254.240.202:3000/comment/',{
    uid,
    cid,
    comment,
    rating
  })
  
  if(response.data.success){
    return response.data.data
  }
  else{
    return{}
  }
}

export const addCar = async (carData) => {
  let response = await axios.post('http://173.254.240.202:3000/car/', carData);
  if (response.data.success) {
    return response.data.data;
  } else {
    return {};
  }
};