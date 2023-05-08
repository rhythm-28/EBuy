import React from 'react';

import AdminCarousel from "./adminCarousel.js";
import Carousel from "../product/Carousel.js";
// import NewCarousel from "../product/newCarousel.js"

function ProductModal(props){
    const description = props.product.description;
    const length = description.length;
    return (
        <div className="row product-modal-main-div">
            <h1 className="admin-product-name"> {props.product.name}</h1>
            <div className="col-lg-7 col-sm-12 modal-img-div">
                <Carousel images={props.product.images}/>
            </div>
            <div className="col-lg-5 col-sm-12 modal-info-div">
                <div className="row">
                    <label className="col-6"> Market Price</label>
                    <p className="col-6 text-align"> {props.product.marketPrice} </p>
                </div>
                <div className="row">
                    <label className="col-6"> DiscountPrice</label>
                    <p className="col-6 text-align"> {props.product.discountPrice} </p>
                </div>
                <div className="row modal-details-div-pad">
                    <label className="col-12 modal-label"> About the Product</label>
                    <p className="col-12 text-align"> {props.product.description} </p>
                </div>
            </div>
        </div>
    );
}

export default ProductModal; 