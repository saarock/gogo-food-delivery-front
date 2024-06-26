import React, { useCallback, useEffect, useReducer, useState } from "react";
import "./addToCartPage.css";
import { AddtoCartSideNav, Button, DeleveryForm } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { addToCardCardProps, Food } from "../../types";
import { RootState } from "../../types/rootState";
import { MdDelete } from "react-icons/md";
import { deleteFood } from "../../features/productSlice";
import localStore from "../../utils/localStore";
import { PRODUCT_STORE_NAME } from "../../constant";
import { toast } from "react-toastify";
import { initialState, reducer } from "../../reducer/deliveryForm";
import service from "../../service/config";
import { ID } from "appwrite";
import { useNavigate } from "react-router-dom";
import useLocationTrack from "../../hooks/useLocationTrack";
import QRCode from "qrcode.react";
import useScreenshot from "../../hooks/useScreenshot";

const AddToCartPage: React.FC<addToCardCardProps> = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const cart = useSelector((state: RootState) => state.foodProducts);
  const dispatch = useDispatch();
  const [bookedItemId, setBookedItemId] = useState<string>("");
  // const [location, setLocation] = useState({ latitude: null, longitude: null });
  const navigate = useNavigate();
  const { location, error, isDenied } = useLocationTrack();
  const { takeScreenshot } = useScreenshot();
  // take the screen sort
  useEffect(() => {
    (async () => {
      if (bookedItemId) {
        await takeScreenshot();
        setBookedItemId("");
      }
    })();
  }, [bookedItemId]);

  const [state, deliveryDispatch] = useReducer(reducer, initialState);

  const onUserNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      deliveryDispatch({ type: "SET_USER_NAME", payload: e.target.value });
    },
    [state]
  );

  const onNumberChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      deliveryDispatch({ type: "SET_PHONE_NUMBER", payload: e.target.value });
    },
    [state]
  );

  const onAddressChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      deliveryDispatch({ type: "SET_ADDRESS", payload: e.target.value });
    },
    [state]
  );

  const onDeliveryFormSubmit = useCallback(
    async (e: React.MouseEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        if (!location.latitude || !location.longitude)
          throw new Error("We need your location so pleased trun on location");
        const googleMapsUrl = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
        const createdBookedItems = await service.createBookedItemsWithUser(
          state.userName,
          state.phoneNumber,
          false,
          cart,
          Number(subtotal.toFixed(2)),
          ID.unique(),
          "",
          state.address,
          googleMapsUrl
          // openStreetMapUrl
        );
        setBookedItemId(createdBookedItems.$id);
        setIsFormOpen(false);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Unknow error while booking items refresh and try again or contact us"
        );
      }
    },
    [state]
  );

  const removeForm = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsFormOpen(false);
    e.stopPropagation();
  };

  if (!cart) return <h1>No Cart available</h1>;
  const subtotal = cart.reduce(
    (acc: number, product: Food) => acc + product.price * product.quantity,
    0
  );
  const openForm = () => {
    setIsFormOpen(true);
  };

  function deleteFromCart(id: number) {
    localStore.deleteById(PRODUCT_STORE_NAME, id);
    dispatch(deleteFood(id));
    toast.info("Item deleted");
  }

  return (
    <div className="gogo-add-to-cart-page">
      {bookedItemId && (
        <div className="gogo-booked-item-qr">
          <QRCode
            value={`http://localhost:5173/booking/${bookedItemId}`}
            size={356}
          />
        </div>
      )}

      {isFormOpen && (
        <div className="gogo-delivery-details-form" onClick={removeForm}>
          {" "}
          <DeleveryForm
            onFormSubmit={onDeliveryFormSubmit}
            onUserNameChange={onUserNameChange}
            onNumberChange={onNumberChange}
            onAddressChange={onAddressChange}
            phoneNumber={state.phoneNumber}
            address={state.address}
            userName={state.userName}
          />{" "}
        </div>
      )}
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="gogo-addto-cart-nav">
            <AddtoCartSideNav></AddtoCartSideNav>
          </div>
          <div className="gogo-cart-items">
            {cart.map((product) => (
              <div key={product.id} className="gogo-cart-item">
                <img
                  src={product.image}
                  alt={product.name}
                  className="gogo-cart-item-image"
                />
                <div className="gogo-cart-item-details">
                  <h3 className="gogo-cart-item-name">{product.name}</h3>
                  <p className="gogo-cart-item-price">${product.price}</p>
                  <p className="gogo-cart-item-quantity">
                    Quantity: {product.quantity}
                  </p>
                </div>
                <div className="gogo-card-middle">
                  <div className="gogo-addto-cart-details">
                    <p>Resturant: {product.resturant}</p>
                  </div>
                  <div className="gogo-card-delete">
                    <Button
                      onClick={() => deleteFromCart(product.id)}
                      icon={<MdDelete /> && ""}
                      text={`delete`}
                    ></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="gogo-cart-summary">
            <h3>Order Summary</h3>
            <div className="gogo-summary-subtotal">
              <p>Subtotal: RS: {subtotal.toFixed(2)}</p>
            </div>
            <button className="gogo-checkout-btn" onClick={openForm}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AddToCartPage;
