import React from 'react';
import UserSubmitButton from "./userSubmitButton.jsx";
import ValidationHelper from "../../utility/ValidationHelper.js";
import toast from "react-hot-toast";
import userStore from "../../store/userStore.js";
import {useNavigate} from "react-router-dom";

const CreateAccountForm = () => {
    const navigate=useNavigate()

    const {loginFormData,loginFormOnChange,userOtpRequest}=userStore()

    const onFormSubmit=async ()=>{

     if(!ValidationHelper.isEmail(loginFormData.email)){
         toast.error("Valid email address required")
     }

        const mobileNumber = loginFormData.mobile.replace(/\D/g, ''); // Remove non-numeric characters
        if (mobileNumber.length !== 11) {
            toast.error("Mobile number must be 11 digits");
           // Stop the submission if the mobile number is not 11 digits
        }
       else if(loginFormData.name.length===0){
            toast.error("Name required!")
        }

     else if(loginFormData.email.length===0){
         toast.error("Email required!")
     }

     else if(loginFormData.mobile.length===0){
         toast.error("Contact Number required!")
     }

        else if(loginFormData.password.length===0){
            toast.error("Password required!")
        }

     else{
         let result=await userOtpRequest(loginFormData.email);
         if(result==='success'){
             navigate('/otp')
         }
         else if(result==='exist'){
             toast.error("Already have an account!")
         }
         else{
             toast.error("Something went wrong!")
         }
     }
    }




    return (
        <div className="container mt-4">
            <div className="row d-flex justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm p-5">
                        <h4 className="text-center my-2 ">Sign Up</h4>
                        <input value={loginFormData.name} onChange={(e)=>{loginFormOnChange("name",e.target.value)}} className="form-control my-2" placeholder="Name" type="text"/>
                        <input value={loginFormData.email} onChange={(e)=>{loginFormOnChange("email",e.target.value)}} className="form-control my-2 " placeholder="Email Address" type="email"/>
                        <input value={loginFormData.mobile} onChange={(e)=>loginFormOnChange("mobile",e.target.value)} className="form-control my-2 " placeholder="Contact Number" type="tel"/>
                        <input value={loginFormData.password} onChange={(e)=>{loginFormOnChange("password",e.target.value)}} className="form-control my-2 " placeholder="Password" type="password"/>

                        <UserSubmitButton onClick={onFormSubmit} className="btn btn-success my-2 p-2" text="Sign Up"/>


                    </div>
                </div>
            </div>

            
        </div>
    );
};

export default CreateAccountForm;