import React, { useContext, useState } from "react";
import { CartContext } from "../App";
import CartItem from "./CartItem";
import { btnStyle } from "./ProductCard";
const style = {
  alignItems: "center",
  textAlign: "center",
  color: "hsl(7, 20%, 60%)",
};

export const totalStyle = {
  display: "flex",
  justifyContent: "space-between",
  margin: "0"
};

const CartList = ({ setShowModal }) => {
  const { cartItems, removeItem } = useContext(CartContext);
  const finalTotal = cartItems.reduce((sum, item) => {
    return sum + item.price * item.noOfItem;
  }, 0);
  const formattedTotal = `$${finalTotal.toFixed(2)}`

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <>
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item) => (
            <CartItem
              name={item.name}
              price={item.price}
              itemNum={item.noOfItem}
              removeItem={removeItem}
              finalTotal={finalTotal}
            />
          ))}
          <div style={totalStyle}>
            <p style={{margin: "5px 0", color: "hsl(12, 20%, 44%)"}}>Order Total</p>
            <h2 style={{margin: "5px 0", color: "hsl(14, 65%, 9%)"}}>{formattedTotal}</h2>
          </div>

          <button onClick={openModal} style={{...btnStyle, backgroundColor: "hsl(14, 86%, 42%)", color: "white", marginTop: "8px", width: "300px", }}>Confirm Order</button>
        </>
      ) : (
        <div style={style}>
          <img src="/assets/images/illustration-empty-cart.svg" alt="" />
          <p>Your added items will appear here</p>
        </div>
      )}
    </>
  );
};

export default CartList;
