import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import service from '../../service/config';
import { Booking } from '../dashPage/DashPage';
import { Dashboard } from '../../components';

const FetchByBookingReceived = () => {
  const [bookingRecevingData, setBookingRecevingData] = useState<Booking[]>()
  const {receivedId} = useParams(); 
  useEffect(() => {
    if (!receivedId) return;
    ;( async () => {
      const data:any = await service.getBookedItemsWhichIsJustReceiving(receivedId);
      // console.log(data);
      setBookingRecevingData((prev:any) => prev?.push(data));
    })()

  }, [])
  // orderDone,
  // bookings,
  // loading,
  // loadBookings,
  // cancelOrder,
  // userType
  return (
    <h1></h1> 
    // <Dashboard orderDone={}/>
  )
}

export default FetchByBookingReceived