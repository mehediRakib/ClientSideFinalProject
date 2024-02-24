import React, {useState} from 'react';

const Base64 = () => {
    const [image,setImage]=useState("");
    const convert=(e)=>{


        var reader=new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload=()=>{
            console.log(reader.result);
            setImage(reader.result);
        }
        reader.onerror=error=>{
            console.log("error: ",error)
        }
    }
    return (
        <div>
            <input
                accept="image/*"
             type="file"
            onChange={convert}/>

            {
                image===""||image===null?"":(
                    <img src={image} width={100} height={100} alt="upload"/>
                )
            }


        </div>
    );
};

export default Base64;