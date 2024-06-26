import React, { useRef, useState, useEffect } from "react";
import "./dashboard.css";
import { dashBoardProps } from "../../types"; // Assuming Food interface is defined in types.ts or types.d.ts
import { toast } from "react-toastify";
import { ImCross } from "react-icons/im";
import { MdOutlineDoneOutline } from "react-icons/md";
import QRCode from "qrcode.react";
import * as htmlToImage from "html-to-image";
import { Booking } from "../../pages/dashPage/DashPage";
import GoGoPiginationsComponent from "../gogoPaginations/GoGoPiginationsComponent";

const Dashboard: React.FC<dashBoardProps> = ({
  orderDone,
  bookings,
  loading,
  loadBookings,
  cancelOrder,
  userType,
}) => {
  const qrCodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [qrVisible, setQrVisible] = useState<Record<string, boolean>>({});


  const generateQr = (bookingId: string) => {
    setQrVisible((prevState) => ({ ...prevState, [bookingId]: true }));
    toast.success(`QR Code generated for booking ID: ${bookingId}`);
  };

  const shareBooking = async (booking: Booking) => {
    try {
      // const qrCodeElement = qrCodeRefs.current[booking.$id];
      // if (!qrCodeElement) throw new Error("QR Code element not found");

      // const dataUrl = await htmlToImage.toPng(qrCodeElement);
      // if (!dataUrl) throw new Error("Failed to generate QR code image");

      // Construct the message to share
      const message = `
        Booking ID: ${booking.$id}
        BookedBy: ${booking.bookedBy}
        Phone: ${booking.phoneNumber}
        Location: ${booking.location}
        Total Price: ${booking.totalPrice}
        Location: ${booking.locationUrl}

        Items:
        ${booking.items
          .map(
            (item) => `
          - Restaurant Name: ${item.resturant}
            Item Name: ${item.type} ${item.name}
            Item Price: RS ${item.price.toFixed(2)}
            Quantity: ${item.quantity ?? 1}
            Paid: ${booking.isPaid ? "Paid" : "Not Paid"}
        `
          )
          .join("\n")}

      `;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;

      // Open WhatsApp with pre-filled message
      window.open(whatsappUrl, "_blank");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error sharing booking details"
      );
    }
  };

  useEffect(() => {
    console.log("QR Codes Refs:", qrCodeRefs.current);
  }, [qrVisible]);

  const removeQr = (e: React.MouseEvent<HTMLDivElement>, bookingId: string) => {
    const target = e.currentTarget as HTMLDivElement;
    setQrVisible((prevState) => ({ ...prevState, [bookingId]: false }));
    target.style.display = "none"
    e.stopPropagation();
  };

  return (
    <div className="gogo-dashboard-container">
      <h1 className="gogo-dashboard-title">Dashboard</h1>
      <button className="gogo-dashboard-button" onClick={ () =>loadBookings("next")}>
        Load New
      </button>
      <div className="gogo-dashboard-bookings">
        {bookings.length >= 1
          ? [...bookings].reverse().map((booking: Booking) => (
              <div key={booking.$id} className="gogo-booking-card">
                <h2 className="gogo-booking-user">
                  BookedBy: {booking.bookedBy}
                </h2>
                <p className="gogo-booking-phone">
                  <strong>Phone:</strong> {booking.phoneNumber}
                </p>
                <p className="gogo-booking-location">
                  <strong>Location:</strong> {booking.location}
                  <br />
                  <strong>Location: </strong>{" "}
                  <a
                    href={`${booking.locationUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    See Location
                  </a>
                </p>
                <p className="gogo-product-booked-time">
                 <strong>Booked At</strong> { new Date(booking.$createdAt).toLocaleDateString().toString()}
                </p>

                <table className="gogo-booking-table">
                  <thead>
                    <tr>
                      <th>Restaurant Name</th>
                      <th>Item Name</th>
                      <th>Item Price</th>
                      <th>Quantity</th>
                      <th>Paid</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...booking.items].reverse().map((item) => (
                      <tr key={item.id}>
                        <td>{item.resturant}</td>
                        <td>
                          {item.type} {item.name}
                        </td>
                        <td>RS: {item.price.toFixed(2)}</td>
                        <td>{item.quantity ?? 1}</td>
                        <td
                          className={`${booking.isPaid ? "paid" : "not-paid"}`}
                        >
                          {booking.isPaid ? (
                            <MdOutlineDoneOutline />
                          ) : (
                            <ImCross />
                          )}{" "}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="gogo-booking-total">
                  <strong>Total Price: {booking.totalPrice}</strong>
                </p>
                {booking.done ? (
                  ""
                ) : booking.isOrderCancel ? (
                  ""
                ) : (
                  <div className="gogo-admin-controls">
                    {qrVisible[booking.$id] && (
                      <div
                        ref={(el) => (qrCodeRefs.current[booking.$id] = el)}
                        className="gogo-qr-code-container"
                        onClick={(e) => removeQr(e, booking.id)}
                      >
                        <QRCode
                          value={`http://localhost:5173/booking/${booking.$id}`}
                          size={256}
                        />
                      </div>
                    )}
                    {userType && userType === "admin" ? (
                      <div className="gogo-admin-level-buttons">
                        <button
                          className="gogo-order-done-button"
                          onClick={() => orderDone(booking.$id)}
                        >
                          Order Done
                        </button>
            
                        <button
                          className="gogo-order-done-button"
                          onClick={() => shareBooking(booking)}
                        >
                          Share Booked Data
                        </button>
                        <button
                          className="gogo-order-done-button"
                          onClick={() => generateQr(booking.$id)}
                        >
                          Generate QR
                        </button>
                        <button
                          className="gogo-order-done-button"
                          onClick={() => cancelOrder(booking.$id)}
                        >
                          Cancel Order
                        </button>
                    
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                )}
              </div>
            ))
          : "No items booked"}
      </div>

      <div className="gogo-item-paginations">
        <GoGoPiginationsComponent/>
      </div>
    </div>
  );
};

export default React.memo(Dashboard);




