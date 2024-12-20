import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/checkoutPage.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LeftProductDetail from "../components/LeftCheckout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags } from "@fortawesome/free-solid-svg-icons";


function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, initialQuantity } = location.state || { product: {}, initialQuantity: 1 };
  const [quantity, setQuantity] = useState(initialQuantity);
  const [shippingOption, setShippingOption] = useState("Free Shipping");
  const [couponCode, setCouponCode] = useState("");
  const [cartVisible, setCartVisible] = useState(true);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const removeProduct = () => {
    setCartVisible(false);
  };

  const handleCheckout = () => {
    toast.success("Order placed successfully!", {
      onClose: () => navigate("/order-placed"), // Redirect after toast message
    });
  };

  // Shipping cost logic
  const shippingCost =
    shippingOption === "Express Shipping"
      ? 15
      : shippingOption === "Pickup"
      ? 21
      : 0;

      const pricePerUnit = product.price ? parseFloat(product.price) : 0;
      const subtotal = cartVisible ? pricePerUnit * quantity : 0;
      const total = subtotal + (cartVisible ? shippingCost : 0);
      

  return (
    <div>
      <Header />
      <div className="checkout-container">
        <div className="left-container">
          <div className="checkout-header">
            <LeftProductDetail product={product} />
          </div>
        </div>
        {/* Vertical Divider */}
        <div className="divider"></div>

        <div className="right-container" style={{width:"100%"}}>
          {cartVisible ? (
            <>
              <div className="cart-headings">
                <span>Product</span>
                <span>Quantity</span>
                <span>Price</span>
                <span>Subtotal</span>
              </div>

              <div className="Cart-Container">
                <img src={product.image} alt={product.productName} className="cart-image" />
                <div className="cart-details">
                  <span>Tray Table</span>   
                  <span style={{marginTop:"-15px"}}>Color:Black {product.color}</span>
                  <button className="remove-button" onClick={removeProduct} style={{backgroundColor:"transparent",marginLeft:"-85%",border:"none",marginTop:"-12px" }}>
                    X Remove
                  </button>
                  <div className="Checkquantity-container">
                    <button onClick={decreaseQuantity}>-</button>
                    <span>{quantity}</span>
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                </div>
                <div classname="fix-price">
                {/* Display price with a check for number type*/}
                    <span>{!isNaN(pricePerUnit) ? `$${pricePerUnit.toFixed(2)}` : "Price not available"}</span>
                    </div>
                    <span>{!isNaN(subtotal) ? `$${subtotal.toFixed(2)}` : "Subtotal not available"}</span>
              
              </div>

              <div className="cart-summary-container">
                <div className="cart-summary-header">Cart Summary</div>
                <div className="shipping-options">
                  <div className="Options-div">
                    <input
                      type="radio"
                      name="shipping"
                      value="Free Shipping"
                      checked={shippingOption === "Free Shipping"}
                      onChange={(e) => setShippingOption(e.target.value)}
                    />
                    <h1>Free Shipping</h1>
                  </div>
                  <div className="Options-div" >
                    <input 
                      type="radio"
                      name="shipping"
                      value="Express Shipping"
                      onChange={(e) => setShippingOption(e.target.value)}
                    />
                    <h1>Express Shipping</h1>
                 </div>
                  <div className="Options-div">
                    <input
                      type="radio"
                      name="shipping"
                      value="Pickup"
                      onChange={(e) => setShippingOption(e.target.value)}
                    />
                   <h1> Pick Up</h1>
                  </div>
                </div >
                <div className="cart-prices">
                  <div className="cart-row">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="cart-row total-price">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <button className="checkout-button" onClick={handleCheckout}>
                   Checkout
                </button>
                <div className="coupon-container">
                  <h5>Have a coupon?</h5>
                  <p>Add your code  for an instant cart discount</p>
                  <div className="coupon-input">
                  <FontAwesomeIcon icon={faTags} className="coupon-icon" />
                    <input
                      type="text"
                      placeholder="Coupon Code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <span>Apply</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="empty-cart">
              <p>Your cart is empty.</p>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default CheckoutPage;
