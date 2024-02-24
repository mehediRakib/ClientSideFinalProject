import {create} from "zustand";
import axios from "axios";


const productStore=create((set)=>({
    productList:null,
    ProductRequest: async()=> {
        const res = await axios.get('/api/v1/readProduct');
        if (res.data['status'] === 'success') {
            set({productList: res.data['data']});
        }
    },

    ProductListForm:{name:"",brand:"",category:"",description:"",img:""},
    productListFormChange:async (name,value)=>{
        set((state)=>({
            ProductListForm:{
                ...state.ProductListForm,
                [name]:value
            }
        }))
    },

    AddProduct:async (postBody)=>{
        let res=await axios.post('/api/v1/createProduct',postBody);
        return res.data['status']
    },

    SingleProductlist:null,
    productSingle:{name:"",brand:"",category:"",description:"",img:""},
    productSingleChange: async (name, value) => {
        set((state) => ({
            productSingle: {
                ...state.productSingle,
                [name]: value
            }
        }));
    },


    SingleProduct:async (id)=>{
        let res=await axios.get(`/api/v1/product/${id}`);
        if(res.data['status']==='success'){
            set({SingleProductlist:res.data['data']});
            set({productSingle:res.data['data']});

        }
    },
    isFormSubmit:false,

    singleProductUpdate:async (postBody,id)=>{

        let res=await axios.post(`/api/v1/updateProduct/${id}`,postBody);
        set({isFormSubmit:false});
        return res.data['status']
    },

    ProductDelete:async (id)=>{
        set({isFormSubmit:true});
        let res=await axios.get(`/api/v1/deleteProduct`,id);
        console.log("res:",res);
        set({isFormSubmit:false});
        return res.data['status']
    }


}))

export default productStore;