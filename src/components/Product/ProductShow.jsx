import React, {useEffect} from 'react';
import productStore from "../../store/productStore.js";
import {Link} from "react-router-dom";

const ProductShow = () => {
    const {productList}=productStore();
    const {ProductRequest}=productStore();
    useEffect(() => {
        (async () => {
            await ProductRequest();
        })()
    }, []);
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 p-2">
                    <div className="card shadow-sm p-3 vh-100">
                      <div className="row my-5">
                          <div className="col-md-9">
                              <input type="search" className="form-control" placeholder="search"/>
                          </div>
                          <div className="col-md-2 ">
                              <button className="p-1"><i className="bi bi-search btn-light"></i></button>
                          </div>
                          <div className="my-5">
                              <Link to='/add-product' type="button" className="btn btn-danger w-100">Add Product</Link>
                          </div>
                      </div>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="container">
                        <div className="row my-4">
                            {
                               productList?(
                                   productList.map((item,i)=>{
                                       return(
                                           <div className="col-md-3 col-lg-3 col-sm-6 p-2">
                                               <Link to={`/details/${item['_id']}`} className="card shadow-sm h-100 rounded-3 bg-white" style={{textDecoration:"none"}}>
                                                   <img src={item['img']} className="w-100 rounded-top-2 "/>
                                                   <div className="card-body">
                                                       <p className="bodySmall text-secondary my-2">{item['name']}</p>
                                                       <p><span className="bodyMedium">Brand: </span> {item['brand']}</p>
                                                       <p><span className="">Category: </span>{item['category']}</p>
                                                       <p><span>Description: </span>{item['description']}</p>
                                                   </div>
                                               </Link>
                                           </div>

                                       )
                                   })
                               ):(
                                   <div>loading...</div>
                               )
                            }

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProductShow;