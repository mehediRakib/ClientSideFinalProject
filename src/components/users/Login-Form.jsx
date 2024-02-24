import React from 'react';
import UserSubmitButton from "./userSubmitButton.jsx";
import {Link, useNavigate} from "react-router-dom";
import userStore from "../../store/userStore.js";
import toast from "react-hot-toast";

const Login = () => {
    const navigate=useNavigate()
    const {loginFormData,loginFormOnChange,DoLogin}=userStore();

    const Login=async ()=>{
        const postBody={
            email:loginFormData.email,
            password:loginFormData.password
        }
        let res=await DoLogin(postBody);
          res?navigate('/'):toast.error("provide valid email and pass");
    }

    return (
        <div className="container mt-4">
            <div className="row d-flex justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm p-5">
                        <h4 className="text-center mb-2">Log into MHR</h4>
                        <input value={loginFormData.email} onChange={(e)=>{loginFormOnChange("email",e.target.value)}} className="form-control my-2" placeholder="Email Address" type="email"/>
                        <input value={loginFormData.password} onChange={(e)=>{loginFormOnChange("password",e.target.value)}} className="form-control my-3" placeholder="Password" type="password"/>
                        <div className="row">
                            <div className="col-md-6 p-3">
                                <UserSubmitButton onClick={Login} className="btn btn-success w-100" text="Log in"/>
                            </div>
                            <div className="col-md-6 p-3">
                                <Link to="/create-account" type="button" className="btn btn-danger w-100">Create new account</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;