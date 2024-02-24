import React from 'react';
import UserSubmitButton from "./userSubmitButton.jsx";
import userStore from "../../store/userStore.js";
import validationHelper from "../../utility/ValidationHelper.js";
import toast, {Toaster} from "react-hot-toast";
import {useNavigate} from "react-router-dom";


const OtpForm = () => {
    const navigate=useNavigate();
    const {otpFormData,otpFormOnChange,otpVerifyRequest,loginFormData}=userStore();
    const otpFormSubmit=async ()=>{
        console.log(loginFormData.password);

        const postbody={
            name:loginFormData.name,
            password:loginFormData.password,
            mobile:loginFormData.mobile
        }

        if(validationHelper.isEmpty(otpFormData.otp)){
            toast.error("Valid Pin Required")
        }
        else{
            let result=await otpVerifyRequest(otpFormData.otp,postbody);
            result?navigate('/'):toast.error("Something went wrong!");
        }
    }

    return (
        <div className="container mt-4">
            <div className="row d-flex justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm p-5">
                        <h5 className="text-center">Enter your OTP</h5>
                        <input  value={otpFormData.otp} onChange={(e)=>{otpFormOnChange("otp",e.target.value)}} className="form-control my-2" placeholder="Enter OTP" type="number"/>
                         <UserSubmitButton onClick={otpFormSubmit} className="btn btn-success p-2 my-2" text="Verify"/>
                    </div>
                </div>
            </div>
            <Toaster
                position="bottom-center"/>
            
        </div>
    );
};

export default OtpForm;