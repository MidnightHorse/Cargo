import { useState } from 'react';
import Navbar from "../../global/navbar";
import { getComments, getUsers, postOrder, postComment } from '../../API/cars'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Rate} from 'antd'
//browse by type page 
export const CarDetails = () => {
  const location = useLocation();
  const carDetails = location.state.carDetails;

  const style = {
    productsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'spaceBetween',
      backgroundColor: '#F9F9F9'
    },
    products: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '45%',
      margin: '0 0 1em 0',
      padding: '1em',
      backgroundColor: '#F9F9F9'
    },
    ImageContainer: {
      width: '100%',
      height:'auto',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      overflow: 'hidden',
      border:'5px solid',
      borderColor:'#222222',
      borderRadius: '12px',  
    },
    Image:{
      width:'100%',
      height: '100%',
      objectFit: 'cover',
          
    },
    but: {
      backgroundColor: '#F9F9F9',
      color: 'white',
      padding: '10px 20px',
      textAlign: 'center',
      alignSelf: 'center',
      fontSize: '16px',
      justifyContent: 'center'
    },
    wrap: {
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      display: 'flex',
      width: '100%',
      margin: 'auto',
    },
    form: {
      // marginLeft: 12,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      backgroundColor: '#F9F9F9',
      flex: 1,
      width: '100%'
    },
    sub: {
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
    
    commentContainer: {
      backgroundColor: '#fff',
      padding: '1em',
      marginBottom: '1em',
      border: '2px solid #ddd',
      borderColor: '#222222',
      textAlign:'center',
      borderRadius: '18px',
      fontFamily: 'RlBasisGrotesque, Avenir, Helvetica Neue, Helvetica, sans-serif'
    },
    commentUser: {
      fontWeight: 'bold',
      marginBottom: '0.5em',
      fontSize: '18px',
      fontFamily: 'RlBasisGrotesque, Avenir, Helvetica Neue, Helvetica, sans-serif'
    },
    commentContent: {
      marginBottom: '0.5em',
      fontSize: '16px',
      fontFamily: 'RlBasisGrotesque, Avenir, Helvetica Neue, Helvetica, sans-serif'
    },

    
  }
  const CarEmoji = () => <span role='img' aria-label='car'>🚗</span>
  const MakeEmoji = () => <span role='img' aria-label='make'>🚘</span>
  const YearEmoji = () => <span role='img' aria-label='year'>📅</span>
  const EngineEmoji = () => <span role='img' aria-label='engine'>⚙️</span>
  const PriceEmoji = () => <span role='img' aria-label='price'>💲</span>
  const LocationEmoji = () => <span role='img' aria-label='location'>🌎</span>
  const FeaturesEmoji = () => <span role='img' aria-label='features'>📋</span>
  
  const [date, setDate] = useState('');
  const [length, setLength] = useState('');
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [newComment, setNewComments] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

 

  const setDateHandler = (event) => {
    setDate(event.target.value)
  }
  const setLengthHandler = (event) => {
    setLength(event.target.value)
  }
  const setNewHandler = (event) => {
    setNewComments(event.target.value)
  }

  const handleSubmit = (event) =>{
    event.preventDefault()
    // TODO make the uid a valid user. This is currently the owner of the car.
    postOrder(carDetails.uid, carDetails._id, new Date(date), length, carDetails.pricePerDay * length, 1).then((response) => {
      //console.log('response ', response)
      setDate('')
      setLength('')
      setSubmitted(true);
    })
    //console.log(date)
    //console.log(length)
  }
  const handlePostComment = (event) => {
    event.preventDefault()
    //console.log(newComment);
    //console.log(newRating);
    postComment(carDetails.uid, carDetails._id, newComment, newRating).then((response)=>{
        //console.log('response', response)
      getComments().then((response) => {
        setComments(response)
      })
      setNewComments('')
      setNewRating('')
    })
    
  }

  useEffect(() => {
    getComments().then((response) => {
      setComments(response)
    })
    getUsers().then((response)=>{
      setUsers(response)
    })
  }, []);

  const displayComments = () => {
    // getting comments from server
    // then we got and get cid from props. 
    // we compare the single comment cid to the props cid and display the 
    // comment if they match.
    return (
      <div>
        {comments.map((singleComment, index) => {
          // console.log(singleComment.uid)
          return (
            carDetails._id === singleComment.cid && (

              <div key={index}>
                  <div style={{fontSize: '20px', fontWeight: 'bold', display:'flex', alignItems: 'center', justifyContent:'center'}}>

                
                  <img src={users.find((user) => user._id === singleComment.uid)?.userProfileURL} alt='user pfp' style={{width:'50px',height:'45px', borderRadius:'50%', marginRight:'7px'}}></img>
                    @{users.find((user) => user._id === singleComment.uid)?.username}
                
                  </div><br/>
                  <div style={style.commentContent}>{singleComment.comment}</div>
                <Rate allowHalf value={singleComment.rating} disabled />
                <hr/>
              </div>
            )
          )
        })}
      </div>
    )
  }
  //console.log(location.state)

  const displayHostInfo = () => {
  return (
    <div>
      {users.map((host, index) => {
        return (
          carDetails.uid === host._id && (
            <div key={index}>
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  style={{
                    width: '50px',
                    height: '45px',
                    borderRadius: '50%',
                    marginRight: '7px',
                  }}
                  src={host.userProfileURL}
                  alt='user pfp'
                ></img>
                {host.realName}
              </div>
              <hr />

              <div
                style={{ fontSize: '18px', fontWeight: 'bold', color: 'grey' }}
              >
                @{host.username}
              </div>
              <div style={{ fontSize: '16px' }}>Joined: {host.joinDate}</div>
              <div style={{ fontSize: '16px' }}>Contact: {host.email}</div>
            </div>
          )
        );
      })}
    </div>
  );
};

 

  return (


    <div style={{height: '100vh', backgroundColor: '#F9F9F9'}}>
      <Navbar/>
      <div style={style.productsContainer}>
        <div style={style.products}>
          <div style={style.ImageContainer}><img style={style.Image} src={carDetails.carProfileURL} alt='Toyota Logo'/></div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
            <form onSubmit={handleSubmit} style={style.form}>
            <div style={style.but}>
              <h2 style={{color:'black'}}>Want to Book this Car?</h2>
              <label>
                <div>Start Date</div> 
                <input type="text" value={date} onChange={setDateHandler} placeholder='MM/DD/YYYY' style={{boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",padding: "10px",border: "1px solid #CCCCCC",borderRadius: "5px",}}/>       
              </label>
            </div>
            <div style={style.but}>
              <label>
                <div>Length of Booking(Days)</div> 
                <input type="text" value={length} onChange={setLengthHandler} placeholder='Length of Booking' style={{boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",padding: "10px",border: "1px solid #CCCCCC",borderRadius: "5px",}}/>       
              </label>
            </div>
            <div style={style.but}>
              <button style={style.sub}>Book Car</button>
            </div>
            {submitted && <div style={{color:'#333333', fontSize: '16px', textAlign:'center', border: '5px solid', borderColor:'#222222', borderRadius:'12px'}}>Your order has been received!</div>}
          </form>
          <form onSubmit={handlePostComment} style={style.form}>
            <div style={style.but}>
                <h2 style={{color:'black'}}>Leave a Comment and a Rating!</h2>
                  <input type='text' value={newComment} onChange={setNewHandler} placeholder='Comment' style={{boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",padding: "10px",border: "1px solid #CCCCCC",borderRadius: "5px",}}/>
            </div>
            <div style={style.but}>
              <label>
                  <Rate allowHalf onChange={setNewRating} style={{color:'yellow', outlineColor:'yellow', marginTop:'10px', fontSize:'20px'}}/>
                </label>
            </div>
            <div style={style.but}>
              <button style={style.sub}>Leave Comment</button>
            </div>
            </form>
            </div>           
        </div>
        
        <div style={{textAlign:'center', marginLeft:'12.5%'}}>
          <h1 style={{color:'#333333', textDecoration: 'underline', textDecorationColor: '#222222'}}>Host Info</h1>
          <div style={style.commentContainer}>
            {displayHostInfo()}
          </div>
          <h1 style={{color:'#333333', textDecoration: 'underline', textDecorationColor: '#222222'}}>Car Info</h1>
          <div style={style.commentContainer}>
            <div style={{ display:'flex', fontFamily: 'RlBasisGrotesque, Avenir, Helvetica Neue, Helvetica, sans-serif', justifyContent:'space-evenly'}}>
              <div><b>Brand</b> <CarEmoji/>: {carDetails.make}</div> <div><b>Make</b> <MakeEmoji/>: {carDetails.model}</div>
            </div>
            <div style={{ display:'flex', fontFamily: 'RlBasisGrotesque, Avenir, Helvetica Neue, Helvetica, sans-serif', justifyContent:'space-evenly'}}>
              <div><b>Year</b> <YearEmoji/>: {carDetails.year}</div><div><b>Location</b> <LocationEmoji/>: {carDetails.location}</div>
              </div>
            <div style={{display:'flex', fontFamily: 'RlBasisGrotesque, Avenir, Helvetica Neue, Helvetica, sans-serif', justifyContent:'space-evenly'}}>
              <div><b>Price Per Day</b><PriceEmoji/>:{carDetails.pricePerDay}</div><div><b>Engine</b> <EngineEmoji/>: {carDetails.engineType}</div>
              </div>
            <div style={{display:'flex', fontFamily: 'RlBasisGrotesque, Avenir, Helvetica Neue, Helvetica, sans-serif', justifyContent:'space-evenly'}}>
              <b>Features</b> <FeaturesEmoji/>: {carDetails.features}
              </div>
          </div>
          <h1 style={{color:'#333333', textDecoration: 'underline', textDecorationColor: '#222222'}}>Reviews</h1>
          <div style={style.commentContainer}>
            {displayComments()}
            {/* <form onSubmit={handlePostComment} style={style.form}>
                <label>
                    <div>Leave a Comment</div>
                    <input type='text' value={newComment} onChange={setNewHandler}/>
                    <Rate allowHalf onChange={setNewRating}/>
                </label>
                <button style={style.sub}>Leave Comment</button>
            </form> */}


          </div>
        </div>
        <div>
          
        </div>
      </div>
      {/* <div style={style.wrap}>
        <form onSubmit={handleSubmit} style={style.form}>
          <div style={style.but}>
            <label>
              <div>Start Date</div> 
              <input type="text" value={date} onChange={setDateHandler} placeholder='MM/DD/YYYY'/>       
            </label>
          </div>
          <div style={style.but}>
            <label>
              <div>Length of Booking(Days)</div> 
              <input type="text" value={length} onChange={setLengthHandler}/>       
            </label>
          </div>
          <div style={style.but}>
            <button style={style.sub}>Book Car</button>
          </div>
        </form>
      </div> */}
      <div style={{backgroundColor:'#F9F9F9'}}></div>
    </div>
  )
}
export default CarDetails;