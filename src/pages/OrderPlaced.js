import React from "react";
import { useNavigate } from "react-router-dom";

function OrderPlaced() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Order Placed Successfully!</h1>
      <p>Thank you for shopping with us.</p>
      <button
        onClick={() => navigate("/home")}
        style={{
          backgroundColor: "#ffae5d",
          color: "black",
          padding: "10px 20px",
          width:"150px",
          height:"50px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Keep Shopping
      </button>
    </div>
  );
}

export default OrderPlaced;
