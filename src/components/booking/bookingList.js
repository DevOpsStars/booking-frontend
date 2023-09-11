import React, { useEffect, useState } from 'react'
import BookingGuestView from './bookingHostView';
import { Typography } from '@mui/material';
import BookingService from '../../services/requestService';
import jwt from 'jwt-decode';
import LodgingService from '../../services/lodgeService';

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [lodges, setLodges] = useState([]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("currentUser")).role == "ROLE_GUEST") {
      BookingService.getBookings(jwt(localStorage.getItem("token")).id, setBookings);
    } else {
      BookingService.getAllBookings(setBookings);
      LodgingService.getLodgesByHost(jwt(localStorage.getItem("token")).id, setLodges);
    }
  }, [])

  useEffect(() => {console.log(bookings);}, [bookings]);
  useEffect(() => {
    console.log(lodges, bookings);
    if (lodges && bookings && bookings.length > 0){
      console.log(bookings.filter(b => lodges.map(l => l.id).includes(b.lodgeId)))
      setBookings(bookings.filter(b => lodges.map(l => l.id).includes(b.lodgeId)))
    }
      
  }, [lodges]);

  return (
    <div>
      <Typography variant="h5" sx={{mb: 3}}>My Bookings</Typography>
        {bookings.map((b) => 
          {
            console.log(b);
            return <BookingGuestView key={b.id} booking={b} />
          }
        )}
    </div>
  );
}
