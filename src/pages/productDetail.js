import React, { useState, useEffect } from "react";
import {
  FaStar,
  FaShippingFast,
  FaShareAlt,
  FaBalanceScale,
  FaQuestionCircle,
  FaTruck,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Add this import

import "../styles/productDetail.css";

function ProductDetail({ product, closeModal, hideAddToCart = false  }) {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    // Prevent scrolling on the background and add dim background effect
    document.body.classList.add("popup-active");

    // Hide the footer when the popup is active
    const footer = document.querySelector("Footer");
    if (footer) {
      footer.classList.add("footer-hidden");
    }

    return () => {
      document.body.classList.remove("popup-active");

      // Show the footer when the popup is closed
      if (footer) {
        footer.classList.remove("footer-hidden");
      }
    };
  }, []);

  // Use colors from the schema with a fallback to default colors
  const defaultColors = ["#FF0000", "#00FF00", "#0000FF"];
  const colors = product.colors || defaultColors;
  const navigate = useNavigate(); // Define navigate here

  const handleAddToCart = () => {
    navigate("/checkout", { state: { product, initialQuantity:1 } });
  };
  

  return (

    <>
      {/* Dim background */}
      <div className="dim-background" onClick={closeModal}></div>
    <div className="product-detail-container">
      <div className="product-detail-left">
        <div className="product-image-column">
          {product.reviewImages &&
            product.reviewImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product ${index + 1}`}
                className="product-image-item"
              />
            ))}
        </div>
      </div>
      <div className="product-detail-right">
        <div className="product-header">
          <img
            src={product.Companylogo}
            alt={product.companyName}
            className="company-logo"
          />
          <p className="product-desc">{product.productDetail}</p>
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                size={20}
                className={`star ${i < product.reviewStars ? "filled" : ""}`}
              />
            ))}
            <p className="num-rate">{product.reviewStars}★</p>
          </div>
        </div>
        <div className="product-image-container">
          <img
            src={product.image}
            alt={product.productName}
            className="product-image-detail"
          />
        </div>
        <div className="color-container">
          <h4 style={{fontWeight:200,color:"black"}}>Color:</h4>
          <div className="colors">
            {colors.map((color, idx) => (
              <div
                key={idx}
                className="color-circle"
                style={{ backgroundColor: color }}
                title={`Color ${color}`}
              ></div>
            ))}
          </div>
        </div>
        <div className="quantity-container">
          <button onClick={decreaseQuantity} style={{border:"none", backgroundColor:"white", maxHeight:"40px", paddingLeft:"10px"}}>-</button>
          <span style={{paddingLeft:"20px"}}>{quantity}</span>
          <button onClick={increaseQuantity} style={{border:"none", backgroundColor:"white", maxHeight:"40px",paddingLeft:"30px"}}>+</button>
        </div>
         
          <button className="add-to-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>
                
        <div className="action-buttons">
          <button >
            <FaBalanceScale />         
            Compare 
          </button>
          <button>
            <FaQuestionCircle />
            Ask a Question
          </button>
          <button>
            <FaShareAlt />
             Share
          </button>
        </div>
        <div className="shipping-info">
          <p>
            <FaTruck /> <strong>Estimated Delivery:</strong>{" "}
            {product.shippingInfo?.estimatedDelivery || "N/A"}
          </p>
          <p>
            <FaShippingFast />
            <strong>Free Shipping:</strong>{" "}
            {product.shippingInfo?.freeShipping || "N/A"}
          </p>
        </div>
        <button className="close-modal" onClick={closeModal}>
          X
        </button>
      </div>
    </div>
    </>
  );
}

export default ProductDetail;
