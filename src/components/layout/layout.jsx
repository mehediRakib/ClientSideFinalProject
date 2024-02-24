import React from 'react';
import AppNavbar from "./appNavbar.jsx";
import Footer from "./footer.jsx";
import {Toaster} from "react-hot-toast";

const Layout = (props) => {
    return (
        <>
           <AppNavbar/>
            {props.children}
            <Toaster position="bottom-center"/>
            <Footer/>
        </>
    );
};

export default Layout;