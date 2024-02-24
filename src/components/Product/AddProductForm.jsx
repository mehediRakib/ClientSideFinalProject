import React from 'react';
import productStore from "../../store/productStore.js";
import UserSubmitButton from "../users/userSubmitButton.jsx";
import toast, {Toaster} from "react-hot-toast";

const AddProductForm = () => {
    const {ProductListForm,productListFormChange,AddProduct}=productStore();

    const convertBase64=(e)=>{
        let reader=new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload=()=>{
            ProductListForm.img=reader.result;
        }
    }
    
     const saveProduct=async () => {
         const postBody = {
             name: ProductListForm.name,
             brand: ProductListForm.brand,
             category: ProductListForm.category,
             description: ProductListForm.description,
             img: ProductListForm.img
         }

         let res=await AddProduct(postBody);
         if(res==='success'){
             toast.success('Product Added Successfully')
         }
         else{
             toast.error("Something went wrong!");
         }

     }


    return (
        <div className="container">
            <div className="row d-flex justify-content-center my-5 ">
                <div className="col-md-6 col-lg-6 col-12">

                    <div className="card  shadow-sm bg-white p-5">
                        <div>
                            <p className="text-center bodyLarge">Add a new product</p>
                        </div>
                        <label>
                            Product Name:
                            <input value={ProductListForm.name} onChange={(e)=>productListFormChange("name",e.target.value)} className="form-control my-2" type="text" placeholder="Product Name:"/>
                        </label>
                        <label>
                            Brand:
                            <input value={ProductListForm.brand} onChange={(e)=>productListFormChange("brand",e.target.value)} className="form-control my-2" type="text" placeholder="Brand:"/>
                        </label>
                       <label>
                           Category:
                           <input value={ProductListForm.category} onChange={(e)=>productListFormChange("category",e.target.value)} className="form-control my-2" type="text" placeholder="Category:"/>
                       </label>
                        <label>
                            Description:
                            <input value={ProductListForm.description} onChange={(e)=>productListFormChange("description",e.target.value)} className="form-control my-2" type="text" placeholder="Description:"/>
                        </label>
                        <label>
                            Choose an image:
                            <input className="form-control" type="file" placeholder="Product Image:" accept="image/*" onChange={convertBase64}/>
                        </label>
                        <label>
                            <UserSubmitButton onClick={saveProduct} className="btn btn-danger my-3 w-100" text="Add"/>
                        </label>
                    </div>
                </div>
            </div>
                <Toaster position="bottom-center"/>
        </div>
    );
};

export default AddProductForm;