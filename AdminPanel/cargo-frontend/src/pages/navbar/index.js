import React from 'react';
import './index.css'; //

const Navbar = ({onLinkChange}) => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <ul className="nav-menu">
                    <li className="nav-item">
                        <span onClick={()=>{onLinkChange("statistic")}} className="nav-links">
                            Overview
                        </span>
                    </li>
                    <li className="nav-item">
                        <span onClick={()=>{onLinkChange("userList")}} className="nav-links">
                            Users
                        </span>
                    </li>
                    <li className="nav-item">
                        <span onClick={()=>{onLinkChange("orderList")}} className="nav-links">
                            Orders
                        </span>
                    </li>
                    <li className="nav-item">
                        <span onClick={()=>{onLinkChange("carList")}} className="nav-links">
                            Cars
                        </span>
                    </li>
                    <li className="nav-item">
                         <span onClick={()=>{onLinkChange("commentList")}} className="nav-links">
                            Comments
                        </span>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
