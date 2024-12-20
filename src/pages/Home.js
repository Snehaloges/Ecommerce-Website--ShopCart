import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/home.css";
import { FaStar } from "react-icons/fa";
import ProductDetail from "./productDetail.js";

function Home() {
  const [products, setProducts] = useState([]); // State for products
  const [reviews, setReviews] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null); // State to track the selected product for the popup
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to track whether popup is open or not

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Fetch Reviews Data
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/reviews");
        console.log("Fetched Reviews:", response.data);
        setReviews(response.data || []); // Ensure reviews is an array
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  // Handle Star Click (Update rating)
  const handleStarClick = async (reviewId, newRating) => {
    try {
      await axios.put(`http://localhost:5000/api/reviews/${reviewId}/stars`, {
        reviewStars: newRating,
      });

      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review._id === reviewId ? { ...review, reviewStars: newRating } : review
        )
      );
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };

  // Handle Scrolling Logic
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    const scrollWidth = container.scrollWidth;
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.offsetWidth;
    const newIndex = Math.round(
      (scrollLeft / (scrollWidth - containerWidth)) * (Math.ceil(products.length / 2) - 1)
    );
    setActiveIndex(newIndex);
  };

  // Set Body Background Color
  useEffect(() => {
    document.body.style.backgroundColor = "white";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  // Handle Product Click to open popup
  const handleProductClick = async (productId) => {
    try {
      const response = await axios.get(`/api/products/${productId}`);
      setSelectedProduct(response.data); // Pass product data to the modal
      setIsPopupOpen(true); // Open the popup
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  // Close the Product Detail Modal
  const closeModal = () => {
    setIsPopupOpen(false); // Close the popup
    setSelectedProduct(null); // Clear the selected product
  };

  return (
    <div>
      <Header />

      {/* First Section */}
      <div className="home-container">
        <div className="home-first-section">
          <h1 className="section-heading">
            We picked some <span className="color-container"><br />cool things</span> for you!<b>*</b>
          </h1>
          <div className="highlight-image-container">
            <img
              src="/assets/images/First-sec-img.png"
              alt="Cool Picks"
              className="highlight-image"
            />
          </div>
        </div>

        {/* Hot Deals Section */}
        <div
          className="hot-deals-container"
          ref={scrollContainerRef}
          onScroll={handleScroll}
        >
          <div className="hot-deals-header">
            <h2 className="sub-heading">Hot Deals for You</h2>
            <div className="heading-underline"></div>
          </div>

          <div className="product-scroll">
            {Array.isArray(products) && products.slice(0, 6).map((product, index) => (
              <div
                key={index}
                className="product-card"
                onClick={() => handleProductClick(product._id)} // Handle product click
              >
                <img
                  src={product.image}
                  alt={product.productName}
                  className="product-image"
                />
                <h3 className="product-name">{product.productName}</h3>
                <div className="product-info">
                  <span className="product-price">{product.price}</span>
                  <span className="product-offer">{product.offer} Off</span>
                </div>
              </div>
            ))}
          </div>

          <div className="scroll-indicator">
            {Array.isArray(products) &&
              Array(Math.ceil(products.length / 2))
                .fill()
                .map((_, index) => (
                  <span
                    key={index}
                    className={`scroll-dot ${index === activeIndex ? "pair-active" : ""}`}
                  ></span>
                ))}
          </div>
        </div>

        {/* Today's Deals Section */}
        <div className="todays-deals-section">
          <h2 className="sub-heading">Today's Hot Deals</h2>
          <div className="heading-underline"></div>
          <div className="todays-deals-container">
            {Array.isArray(products) && products.slice(6, 11).map((product, index) => (
              <div key={index} className="todays-product-card" onClick={() => handleProductClick(product._id)}>
                <img
                  src={product.image}
                  alt={product.productName}
                  className="todays-product-image"
                />
                <h3 className="todays-product-name">{product.productName}</h3>
                <div className="todays-product-info">
                  <div className="todays-product-price">
                    {product.price}
                    <button className="add-to-cart-button">Add to Cart</button>
                  </div>
                  <span className="todays-product-offer">{product.offer} Off</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Review Your Purchase Section */}
        <div className="review-purchase-section">
          <h2 className="sub-heading">Review Your Purchase</h2>
          <div className="heading-underline"></div>
          <div className="review-product-container">
            {Array.isArray(reviews) && reviews.map((review, index) => (
              <div key={index} className="product-card">
                <img
                  src={review.image}
                  alt={review.productName}
                  className="product-image"
                />
                <div className="product-review-info">
                  <h3 className="product-name">{review.productName}</h3>
                  <p className="product-info">{review.productInfo}</p>
                  <p className="product-price">₹{review.price}</p>

                  <div className="star-rating">
                    {Array(5)
                      .fill()
                      .map((_, i) => (
                        <FaStar
                          key={i}
                          size={20}
                          className={`star ${i < review.reviewStars ? "filled" : ""}`}
                          onClick={() => handleStarClick(review._id, i + 1)}
                        />
                      ))}
                    <p className="number-review">{review.reviewStars} rating</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Detail Modal */}
        {selectedProduct && isPopupOpen && (
          <ProductDetail product={selectedProduct} closeModal={closeModal} />
        )}
      </div>

      {/* Footer - Will be hidden when popup is open */}
      <Footer hide={isPopupOpen} />
    </div>
  );
}

export default Home;
