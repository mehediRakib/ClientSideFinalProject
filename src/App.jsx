import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import CreateAccountPage from "./pages/CreateAccountPage.jsx";
import OtpPages from "./pages/Otp-pages.jsx";
import ProfilePage from "./pages/Profile-page.jsx";
import ProductPage from "./pages/Product-Page.jsx";
import Base64 from "../base64.jsx";
import AddProductPage from "./pages/AddProduct-page.jsx";
import ProductUpdatePage from "./pages/productUpdate-page.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/create-account" element={<CreateAccountPage/>}/>
                <Route path="/otp" element={<OtpPages/>}/>
                <Route path="/Profile" element={<ProfilePage/>}/>
                <Route path="/product" element={<ProductPage/>}/>
                <Route path="/image"element={<Base64/>}/>
                <Route path="/add-product" element={<AddProductPage/>}/>
                <Route path="/details/:id" element={<ProductUpdatePage/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;