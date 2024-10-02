import { useState, useEffect } from "react"
import { getCars } from "../API/cars"
import { useNavigate } from "react-router-dom";
import Navbar from "../global/navbar";
import React from "react";
//Home Page 
export const Home = () => {

  const style = {
    homeImageContainer: {
      width: '500px',
      height:'300px',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      overflow: 'hidden'
    },
    homeImage:{
      width:'100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '12px',      
    },
    browseContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginBottom: '2rem',
    },

    browseSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },

    browseTitle: {
      marginBottom: '1rem',
      textDecoration:'underline',
      textDecorationColor:'#333333',
    },
    button: {
      fontWeight: 'bold',
      color: 'black',
      border: 'none',
      fontSize: '16px',
      borderRadius: '12px',
      padding: '10px 20px',
      textAlign: 'center',
      display: 'inline-block',
      backgroundColor: 'yellow',
      
    },
  }


  const [cars, setCars] = useState([])

  useEffect(() => {
    getCars().then((response) => {
      setCars(response)
    })
  }, [cars])
  const navigate = useNavigate()


  return (
    <div>
      <Navbar/>
      <div style={{textAlign:'center', fontSize:'30px', marginTop: '2%', fontWeight:'bold'}}>
          Drive in Comfort<br/>
      </div>
      <div style={style.browseContainer}>
        <div style={style.browseSection}>
            <h2 style={style.browseTitle}>Browse by Make</h2>

              <h3>Toyota</h3>
              <div style={style.homeImageContainer}><img style={style.homeImage} onClick={() => navigate('/make', {"state": {"make": "Toyota", 'allCars': cars}})} src={require('../toyota.png')} alt='Toyota Logo'/></div>
              <h3>BMW</h3>
              <div style={style.homeImageContainer}><img style={style.homeImage} onClick={() => navigate('/make', {"state": {"make": "BMW", 'allCars': cars}})} src={require('../bmw.png')} alt='bmw Logo'/></div>               
              <h3>Tesla</h3>
              <div style={style.homeImageContainer}><img style={style.homeImage} onClick={() => navigate('/make', {"state": {"make": "Tesla", 'allCars': cars}})} src={require('../tesla.png')} alt='tesla Logo' /></div>               
              <br/>
              <button style={{...style.button, flexGrow: 0}} onClick={()=> navigate('/users', {"state":{'allCars': cars}})}>View Users</button>
      </div>
        <div style={style.browseSection}>
            <h2 style={style.browseTitle}>Browse by Type</h2>
            <h3>Gas Cars</h3>
            <div style={style.homeImageContainer}><img style={style.homeImage} onClick={() => navigate('/type', {"state": {"engineType":"Gas", 'allCars': cars}})} src={require('../mustang.png')} alt='gas car'/></div>
            <h3>Electric Cars</h3>
            <div style={style.homeImageContainer}><img style={style.homeImage} onClick={() => navigate('/type', {"state": {"engineType":"Eletric", 'allCars': cars}})} src={require('../electric.png')} alt='electric car'/></div>
            <h3>Hybrid Cars</h3>
            <div style={style.homeImageContainer}><img style={style.homeImage} onClick={() => navigate('/type', {"state": {"engineType":"Hybrid", 'allCars': cars}})} src={require('../hybrid.png')} alt='hybrid car'/></div>
            <br/>
            <button style={{...style.button, flexGrow:0 }} onClick={()=> navigate('/view-cars')}> List of Cars</button>
        </div>
        </div>
        {/* <div style={{display:'flex', justifyContent:'space-between'}}>
          <button style={{...style.button, flexGrow: 0}} onClick={()=> navigate('/users', {"state":{'allCars': cars}})}>View Users</button>
          <button style={{...style.button, flexGrow:0 }} onClick={()=> navigate('/view-cars')}> List of Cars</button>
        </div> */}
    </div>
  )
}