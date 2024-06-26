import React from "react";
import "./productCard.css";
import { ProductCardProps } from "../../types";
import Button from "../button/Button";

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  type,
  availableOn,
  image,
  addToCard,
  id,
  selectRes,
  increase,
  decrease,
  quantity,
  actualPrice
}) => {


  if (!quantity) quantity = 1
  return (
    <div className="gogo-product-card">
      <img src={image} alt={name} className="gogo-product-image" />
      <div className="gogo-choose-rest">
  <h1 className="choose-rest-title">Choose Restaurant</h1>
  <select name="restaurant" id="restaurant" className="restaurant-select" onChange={selectRes}>
    {availableOn &&
      availableOn.map((currentRes, index) => (
        <option key={index} value={currentRes}>
          {currentRes}
        </option>
      ))}
  </select>
</div>

      <div className="gogo-item-quantity">
        <h3>Quantity</h3>
        <span className="number">{quantity}</span>
        <span className="increase" onClick={increase}>+</span>
        <span className="decrease" onClick={decrease}>-</span>
      </div>
      <div className="gogo-product-details">
        <h3 className="gogo-product-name">
          {type} {name}
        </h3>
        <p className="gogo-product-price"> <del className="actual-price">  {actualPrice}</del> {price} RS</p>
        <div className="gogo-cart-buttons">
        <Button
          className="gogo-add-to-cart-btn"
          text="Add to Cart"
          onClick={() =>
            addToCard({
              name: name,
              id: id,
              price: price,
              quantity: quantity,
              resturant: "GORKHAYAS_RES",
              image: image,
              type: type
            })
          }
        />
          {/* <Button
          className="gogo-book-now-btn"
          text="Book Now"
          onClick={() =>
            addToCard({
              name: name,
              id: id,
              price: price,
              quantity: quantity,
              resturant: "GORKHAYAS_RES",
              image: image,
              type: type
            })
          }
        /> */}
        </div>
 
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
