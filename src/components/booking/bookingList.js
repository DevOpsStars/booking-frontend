import React, { useEffect, useState } from 'react'
import BookingGuestView from './bookingHostView';
import { Typography } from '@mui/material';
import BookingService from '../../services/requestService';
import jwt from 'jwt-decode';

export default function BookingList() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    BookingService.getBookings(jwt(localStorage.getItem("token")).id, setBookings);
  }, [])

  useEffect(() => {console.log(bookings);}, [bookings]);

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
