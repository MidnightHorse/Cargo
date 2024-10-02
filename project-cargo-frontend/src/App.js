import React from 'react';
// import Navbar from "./global/navbar";
import { Home } from './Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { BrowseByMake } from './Home/BrowseByMake';
import { BookACar } from './Home/BookACar';
import { BrowseByType } from './Home/BrowseByType';
import { Register} from './Register/Register';
import PostCar from './Pages/postCar/PostCar';
import ViewList from './Pages/viewList/ViewList';
import CarDetails from './Pages/carDetails/CarDetails';
import { ViewUsers } from './Home/ViewUsers';
function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path='' element={<Home />} />
                    <Route path="make" element={<BrowseByMake />} />
                    <Route path="make/book" element={<BookACar />} />
                    <Route path="type" element={<BrowseByType />} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/post-car" element={<PostCar />} />
                    <Route path="/view-cars" element={<ViewList />} />
                    <Route path="/users" element={<ViewUsers />} />
                    <Route path="/car/:_id" element={<CarDetails />} />
                    {/* <Route path="/login" component={Login} /> */}
                </Routes>
            </Router>
        </div>
    );
}

export default App;