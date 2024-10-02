import React,{useState} from 'react';
import Navbar from "./navbar";
import Statistic from "./statistic";
import UserList from "./userList";
import OrderList from "./orderList";
import CarList from "./carList";
import CommentList from "./comment";

function App() {
    const [linkKey, setLinkKey] = useState("statistic");
    const onLinkChange=(key)=>{
        setLinkKey(key);
    };
    return (
        <div>
            <Navbar
                onLinkChange={onLinkChange}
            />
            {linkKey==="statistic" && <Statistic/>}
            {linkKey==="userList" && <UserList/>}
            {linkKey==="orderList" && <OrderList/>}
            {linkKey==="carList" && <CarList/>}
            {linkKey==="commentList" && <CommentList/>}
        </div>
    );
}

export default App;
