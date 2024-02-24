import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import logo from '../../assets/images/logo.jpg'
import userStore from "../../store/userStore.js";
import button from "bootstrap/js/src/button.js";
import UserSubmitButton from "../users/userSubmitButton.jsx";


const AppNavbar = () => {
    const navigate=useNavigate();
    const {DoLogout}=userStore()
    const onLogout=async ()=>{
        await DoLogout();
        sessionStorage.clear();
        localStorage.clear()
        navigate('/');
    }

    const {isLogin}=userStore();
    return (
        <>
            <div className="container-fluid p-2 text-white bg-success">
                <div className="container">
                    <div className="row justify-content-around">
                        <div className="col-md-6">
                        <span>
                            <span className="f-12">
                               <i className="bi bi-envelope"></i> support@MHR.com
                            </span>
                            <span className="f-12 mx-2">
                               <i className="bi bi-telephone"></i>01611650721
                            </span>
                        </span>
                        </div>
                        <div className="col-md-6">
                        <span className="float-end">
                            <span className="mx-2">
                                <i className="bi bi-whatsapp"></i>
                            </span>
                            <span className="mx-2">
                                <i className="bi bi-facebook"></i>
                            </span>
                             <span className="mx-2">
                                    <i className="bi bi-linkedin"></i>
                             </span>

                        </span>

                        </div>
                    </div>
                </div>
            </div>

            <div className="navbar sticky-top bg-white navbar-expand-lg navbar-light py-2 shadow-sm">
                <div className="container">
                    <Link  className="navbar-brand" to="/"><img className="img-fluid" src={logo} width="70px"/> </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav06" aria-controls="nav06" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="nav06">
                      <ul className="navbar-nav mt-3 mt-lg-0 mb-3 mb-lg-0 ms-lg-3">
                          <span className="nav-item me-4">
                              <Link className="nav-link" to="/">Home</Link>
                          </span>
                          {
                              isLogin()?(
                                  <span className="nav-item me-4">
                              <Link className="nav-link" to="/product">Product</Link>
                          </span>
                              ):(
                                  <span className="nav-item me-4">
                              <Link className="nav-link" to="/login">Product</Link>
                          </span>
                              )
                          }
                      </ul>
                    </div>
                    {
                        isLogin()?(
                            <>
                                <Link to="/Cartlist" type="button" className="mx-2 btn btn-light position-relative">
                                    <i className="bi bi-cart"></i>
                                </Link>
                                <Link to="/Wishlist" className="btn btn-light ms-3 position-relative">
                                    <i className="bi bi-heart"></i>
                                </Link>
                                <UserSubmitButton onClick={onLogout} className="btn btn-success ms-3 d-flex"  text="Logout"/>
                                <Link to="/Profile" className="btn btn-light ms-3 position-relative">
                                    <i className="bi bi-person-circle"></i>
                                </Link>

                            </>
                        ):(
                            <>
                                <Link to="/login" type="button" className="btn mx-2 btn-light position-relative">
                                    <i className="bi bi-cart"></i>
                                </Link>
                                <Link to="/login" type="button" className="btn btn-light mx-2 position-relative">
                                    <i className="bi bi-heart"></i>
                                </Link>
                                <Link to="/login" type="button" className="btn btn-success ms-3 d-flex">Login</Link>
                            </>
                        )
                    }

                </div>
            </div>
        </>
    );
};

export default AppNavbar;