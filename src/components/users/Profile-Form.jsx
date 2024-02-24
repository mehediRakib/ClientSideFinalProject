import React, {useEffect, useState} from 'react';
import UserSubmitButton from "./userSubmitButton.jsx";
import userStore from "../../store/userStore.js";
import profile from '../../assets/images/profile.png'
import toast from "react-hot-toast";
const ProfileForm = () => {
    const [image,setImage]=useState("");
    const {loginFormData,loginFormOnChange,profileDetailsRequest,profilePic,profilePicForm,profilePicRequest,UpdatePass,UpdateProfilePic}=userStore();
    useEffect(() => {
        (async ()=>{
            await profileDetailsRequest();
            await profilePicRequest();
        })()
    }, []);

    const UpdateProfile=async () => {
        let res = await UpdatePass({password:loginFormData.password});
        let pp=await UpdateProfilePic({img:image});
        console.log(res);
        res?toast.success("Profile Updated"):toast.error("Something went wrong")
    }

    const convert64=(e)=>{
        const read=new FileReader();
        read.readAsDataURL(e.target.files[0])
        read.onload=()=>{
            setImage(read.result);
        }
        read.onerror=(e)=>{
            toast("SomeThing went wrong!");
        }

    }

    return (
        <div className="container mt-4">
            <div className="row d-flex justify-content-center">
                <div className="col-md-6">
                    <h5 className="px-4">Profile</h5>
                    <div className="card shadow-sm p-5 bg-white">
                        <div className="justify-content-center d-flex overflow-hidden ">
                            {
                                image===""||image===null?(
                                        <img src={profile} alt="profile picture" className=" profilePic"/>
                                ):(
                                        <img src={image} alt="profile picture" className=" profilePic"/>
                                )
                            }
                            <label className="fileInput">
                                <input type="file" accept="image/*" onChange={convert64} />
                            </label>


                        </div>


                        <label className="my-3">Full Name</label>
                        <input value={loginFormData.name} className="form-control my-1"/>
                        <label className="my-1">Contact Number</label>
                        <input value={loginFormData.mobile} className="form-control my-1" type="tel"/>
                        <label className="my-1">Password</label>
                        <input value={loginFormData.password} onChange={(e)=>{loginFormOnChange("password",e.target.value)}} className="form-control my-1" type="password"/>

                        <UserSubmitButton onClick={UpdateProfile} className="btn btn-success p-2 my-3" text="Update Profile"/>



                    </div>
                </div>
            </div>

            
        </div>
    );
};

export default ProfileForm;