import Navbar from "../global/navbar";
import { getUsers} from "../API/cars";
import { useState, useEffect } from "react";
// This is solely a list of all registered users.
export const ViewUsers = () =>{

    const style = {
        container: {
            backgroundColor: '#fff',
            padding: '1em',
            marginTop: '1em',
            border: '2px solid #ddd',
            borderColor: '#222222',
            textAlign:'center',
            borderRadius: '18px',
            maxWidth: '50%',
            fontFamily: 'RlBasisGrotesque, Avenir, Helvetica Neue, Helvetica, sans-serif'
          }
    }

    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        getUsers().then((response) => {
            setUsers(response)
        })
        
    })

    const displayUsers = () =>{
        return(
            <div>
                {users.map((host, index) => {
                    return(
                    
                        <div key={index}>
                            <div style={{fontSize: '20px', fontWeight: 'bold', display:'flex', alignItems: 'center', justifyContent:'center'}}>
                          <img style={{width:'50px',height:'45px', borderRadius:'50%', marginRight:'7px'}} src={host.userProfileURL} alt='user pfp'></img>{host.realName}
                          </div>
                        
                        
                        <div style={{fontSize: '18px', fontWeight: 'bold', color: 'grey'}}>@{host.username}</div> 
                        <div style={{fontSize: '16px'}}>Joined: {host.joinDate}</div>
                        <div style={{fontSize:'16px'}}>Contact: {host.email}</div>
                        <hr/>
                        </div>
                    )
                })}
            </div>
        )
    }

    return(
        <div>
            <Navbar/>
            <div style={{display:'flex', justifyContent:'center'}}>
                <div style={style.container}>
                    <h2>All Registered Users</h2><hr/>
                    {displayUsers()}
                </div>

            </div>
        </div>
    )

}