import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaStar,
  FaStarHalfAlt,
  FaShippingFast,
  FaShareAlt,
  FaBalanceScale,
  FaQuestionCircle,
  FaTruck,
} from "react-icons/fa";
import "../styles/LeftcheckoutPage.css";
import Footer from "./Footer";

function LeftProductDetail({ product }) {
  const defaultColors = ["#FF0000", "#00FF00", "#0000FF"];
  const colors = product.colors || defaultColors;

  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const imageRef = useRef(null); // Ref for the image

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Function to handle zoom effect
  const handleMouseMove = (e) => {
    const image = imageRef.current;
    if (!image) return;

    //  the image dimensions and the mouse position
    const { left, top, width, height } = image.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;

    // Calculate percentage position
    const xPercentage = (mouseX / width) * 100;
    const yPercentage = (mouseY / height) * 100;

    setZoomPosition({
      x: xPercentage,
      y: yPercentage,
    });
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);  // Zoom in when hovering
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);  // Zoom out when mouse leaves
  };

  // Function to render stars (full, half, empty)
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} size={20} className="star filled" />
        ))}
        {[...Array(halfStars)].map((_, i) => (
          <FaStarHalfAlt key={`half-${i}`} size={20} className="star filled" />
        ))}
        {[...Array(emptyStars)].map((_, i) => (
          <FaStar key={`empty-${i}`} size={20} className="star" />
        ))}
      </>
    );
  };

  return (
    <div className="Leftproduct-detail-container">
      <div className="Leftproduct-detail-left">
        <div className="Leftproduct-image-column">
          {product.reviewImages &&
            product.reviewImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product ${index + 1}`}
                className="Leftproduct-image-item"
              />
            ))}
        </div>
      </div>
      <div className="Leftproduct-detail-right">
        <div className="linkers">
          <Link to="/home" className="home-link">
            Home
          </Link>
          <Link to="/checkout" className="Your-Cart">
            / Your Cart
          </Link>
        </div>
        <div className="Leftproduct-header">
          <img
            src={product.Companylogo}
            alt={product.companyName}
            className="Leftcompany-logo"
          />
          <p className="Leftproduct-desc">{product.productDetail}</p>
          <div className="Leftstars">
            {renderStars(product.reviewStars)}
            <p className="Leftnum-rate">{product.reviewStars}★</p>
          </div>
        </div>
        <div className="Leftproduct-image-container">
          <div
            className={`zoom-container ${isZoomed ? "active" : ""}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            <img
              src={product.image}
              alt={product.productName}
              className="Leftproduct-image-detail"
              ref={imageRef}
            />
          </div>

          {isZoomed && (
            <div
              className="zoom-preview"
              style={{
                backgroundImage: `url(${product.image})`,
                backgroundSize: "200%",
                backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
              }}
            />
          )}
        </div>

        <div className="Leftcolor-container">
          <h4 style={{ fontWeight: 200, color: "black" }}>Color:</h4>
          <div className="Leftcolors">
            {colors.map((color, idx) => (
              <div
                key={idx}
                className="Leftcolor-circle"
                style={{ backgroundColor: color }}
                title={`Color ${color}`}
              ></div>
            ))}
          </div>
        </div>
        <div className="Leftquantity-container">
          <button
            onClick={decreaseQuantity}
            style={{
              border: "none",
              backgroundColor: "white",
              maxHeight: "40px",
              paddingLeft: "10px",
            }}
          >
            -
          </button>
          <span style={{ paddingLeft: "20px" }}>{quantity}</span>
          <button
            onClick={increaseQuantity}
            style={{
              border: "none",
              backgroundColor: "white",
              maxHeight: "40px",
              paddingLeft: "30px",
            }}
          >
            +
          </button>
        </div>

        <div className="Leftaction-buttons">
          <button>
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
        <div className="Leftshipping-info">
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
      </div>
      <Footer />
    </div>
  );
}

export default LeftProductDetail;
