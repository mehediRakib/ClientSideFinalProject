import React from 'react';
import {Link} from "react-router-dom";
import userStore from "../../store/userStore.js";
import toast, {Toaster} from "react-hot-toast";

const HomePageComponent = () => {
    const {isLogin}=userStore();
    return (
        <div className="bgImage">
            <div className="container py-5">
                <div className="row d-flex justify-content-center ">
                    <div className="col-md-6">
                        <h3 className="text-center color my-4">Lets Explore Our Product</h3>
                    </div>
                </div>
                <div className=" mx-5 row p-5">
                    <div className="col-md-6 bodyLarge">
                        <span>This is a simple E-commerce website under development process.Here a buyer can see our product.But one thing must be know the user that,
                            user must be logged in to see the product.
                        </span>

                    </div>

                    {
                        isLogin()?(
                            <div className="col-md-6 py-4">
                                <Link type="button" className="btn btn-success w-50 p-2" to="/product">See Our Product</Link>
                            </div>
                        ):(
                          <>
                              <div className="col-md-6 py-4">

                                  <Link type="button" className="btn btn-success w-50 p-2" to="/login">See Our Product</Link>

                              </div>
                          </>

                        )
                    }

                </div>
            </div>
            <Toaster position="bottom-center"/>
        </div>
    );
};

export default HomePageComponent;