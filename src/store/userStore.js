import {create} from "zustand";
import Cookies from 'js-cookie'
import axios from "axios";
import {getEmail, setEmail, unauthorized} from "../utility/utility.js";
import profileForm from "../components/users/Profile-Form.jsx";


const userStore=create((set)=>({

        isLogin:()=>{
            return !! Cookies.get('token')
        },

        isFormSubmit:false,

         loginFormData:{name:"",email:"",mobile:"",password:""},
    loginFormOnChange:(name,value)=>{
            set((state)=>({
                loginFormData:{
                    ...state.loginFormData,
                    [name]:value
                }
            }))
    },

        userOtpRequest:async (email)=>{
            set({isFormSubmit:true})
            let res=await axios.get(`/api/v1/userOTP/${email}`)
            setEmail(email);
            set({isFormSubmit:false})
            return res.data['status']
        },

    otpFormData:{otp:""},
    otpFormOnChange:(name,value)=>{
            set((state)=>({
                otpFormData:{
                    ...state.otpFormData,
                    [name]:value
                }
            }))
    },

    otpVerifyRequest:async (otp,postBody)=>{
            set({isFormSubmit:true});
            let email=getEmail();
            let res=await axios.post(`/api/v1/verifyOTP/${email}/${otp}`,postBody)
            set({isFormSubmit:false});
            return res.data['status']==='success';
    },

     DoLogout:async()=>{
            set({isFormSubmit:true});
            let res=await axios.get('/api/v1/logout');
            set({isFormSubmit:false});
            return res.data['status']==='success';
    },

    DoLogin:async (postBody)=>{
            set({isFormSubmit:true});
            let res=await axios.post('/api/v1/login',postBody);
            set({isFormSubmit:false});
            return res.data['status']==='success';
    }
    ,
     profileDetails:null,
     profileDetailsRequest:async ()=>{
            try{
                let res=await axios.get('/api/v1/profile');
                if(res.data['data'].length>0){
                    set({profileDetails:res.data['data'][0]});
                    set({loginFormData:res.data['data'][0]});
                }
                else{
                    set({profileDetails:[]});
                }
            }
            catch (e) {
                    unauthorized(e.response.status);
            }
     },

    profilePic:null,
    profilePicForm:{img:""},
    profilePicRequest:async ()=>{
        try{
            let res=await axios.get('/api/v1/profileImage')
            console.log("data: ",res.data['data'][0])
            if(res.data['data'].length>0){

                set({profilePic:res.data['data'][0]});
                set({profilePicForm:res.data['data'][0]});
            }
            else{
                set({profilePic:[]});
            }
        }
        catch (e) {
            unauthorized(e.response.status);
        }

    }
    ,
    UpdatePass:async (postBody)=>{
            try{
                set({isFormSubmit:true});
                let res=await axios.post('/api/v1/passwordChange',postBody);
                set({isFormSubmit:false})
                return res.data['status']='success'
            }catch (e) {
                return unauthorized(e.response.status);
            }
    },

    UpdateProfilePic:async (postBody)=>{
            try {
                let res=await axios.post('/api/v1/profileChange',postBody)
                return res.data['status']='success';
            }
            catch (e) {
                    return unauthorized(e.response.status);
            }
    }


}))

export default userStore;