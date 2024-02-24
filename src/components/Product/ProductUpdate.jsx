import React, {useEffect} from 'react';
import productStore from "../../store/productStore.js";
import {useNavigate, useParams} from "react-router-dom";
import UserSubmitButton from "../users/userSubmitButton.jsx";
import toast from "react-hot-toast";



const ProductUpdate = () => {
    const { id } = useParams();
    const navigate=useNavigate();

    const update=async () => {
        const res = await singleProductUpdate(postBody,id);
        if(res==='success'){
            toast.success("Successfully Product Updated.")
        }
        else {
            toast.error("something went wrong");
        }
    }

    const deleteProduct=async () => {
        let res = await ProductDelete(id);
        console.log("res: ",res);
        if(res==='success'){
            toast.success("Successfully Product Deleted.")
            navigate('/product');
        }
        else {
            toast.error("something went wrong");
        }

    }


const {SingleProduct,SingleProductlist,productSingle,productSingleChange,singleProductUpdate,ProductDelete}=productStore();
    useEffect(() => {
        (async () => {
            await SingleProduct(id);
        })()
    }, []);

    const convert64=(e)=>{
        const read=new FileReader();
        read.readAsDataURL(e.target.files[0])
        read.onload=()=>{
            productSingle.img=read.result;
        }
        read.onerror=(e)=>{
            toast("SomeThing went wrong!");
        }

    }
    const postBody={
        name:productSingle.name,
        brand:productSingle.brand,
        category:productSingle.category,
        description:productSingle.description,
        img:productSingle.img

    }


    return (
        <div className="container">
            <div className="row mt-4 justify-content-center d-flex">
                <div className="col-md-6">
                    <div className="card shadow-sm  p-2 rounded-3">
                        {
                            SingleProductlist?(

                               <>
                                   <h3 className="text-center bodyLarge py-3">You can Update/Delete Your Product Here</h3>
                                   <div className="d-flex justify-content-center">
                                       <img src={SingleProductlist.img} className=" rounded-top-2 image" />
                                   </div>
                                   <label className="mx-3">
                                       Product Name:
                                       <input value={productSingle.name} className="form-control " onChange={(e)=>productSingleChange("name",e.target.value)} />
                                   </label>
                                   <label className="mx-3">
                                       Product Brand:
                                       <input value={productSingle.brand} className="form-control " onChange={(e)=>productSingleChange("brand",e.target.value)} />
                                   </label>
                                   <label className="mx-3">
                                       Product Category:
                                       <input value={productSingle.category} className="form-control " onChange={(e)=>productSingleChange("category",e.target.value)}/>
                                   </label>
                                   <label className="mx-3">
                                       Product Descripion:
                                       <input value={productSingle.description} className="form-control " onChange={(e)=>productSingleChange("description",e.target.value)}/>
                                   </label>
                                   <label className="mx-3">
                                       Product img:
                                       <input className="form-control " type="file" accept="image/*" onChange={convert64} />
                                   </label>

                                   <div className="row">
                                       <div className="col-md-6">
                                           <UserSubmitButton className="btn btn-success my-3  w-100 " text="Update" onClick={update}/>
                                       </div>
                                       <div className="col-md-6">
                                           <UserSubmitButton className="btn btn-danger my-3  w-100 " text="Delete" onClick={deleteProduct}/>
                                       </div>
                                   </div>



                               </>

                            ):(
                                <div>
                                    <p>403! Something went wrong</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default ProductUpdate;