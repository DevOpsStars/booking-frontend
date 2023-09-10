
import React, { useEffect, useState } from 'react';
import { Box, Button } from "@mui/material";
import LodgeCard from './lodgeCard';
import ResultsCard from './resultsCard';
import { useNavigate } from 'react-router-dom';
import BookingService from '../../services/requestService';
import jwt from 'jwt-decode';

export default function LodgeSearchResult({lodge, start, end, numOfGuests}) {

  const navigate = useNavigate();
  const [count, setCount] = useState(-1);

  useEffect(() => {
    console.log("*****************", lodge)
    console.log("*****************", start)
    console.log("*****************", end)
    console.log("*****************", numOfGuests)
    BookingService.getReservationsCount(lodge.lodgeId, start, end, setCount)
  }, []);

  const makeReservation = (lodgeId, totalPrice) => {
    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: localStorage.getItem("token") ? jwt(localStorage.getItem("token")).id : 1, // TODO SKLONITI 1
        lodgeId: lodgeId,
        guestNumber: numOfGuests,
        reservationStart: start,
        reservationEnd: end,
        totalPrice: totalPrice
      })
    }
    alert(requestOptions.body);
    BookingService.newRequest(requestOptions);
    navigate("/requests")
  }


  return (
    <Box sx={{ display: 'flex', direction: 'row' }}>
    <LodgeCard lodge={lodge} />
    <ResultsCard result={lodge.result} />

    {count === 0 &&
      <Button
        variant="contained"
        color="warning"
        sx={{ height: '50px', mt: 3, mb: 2 }}
        onClick={() => makeReservation(lodge.lodgeId, lodge.result.totalPrice)}
      >Make a reservation</Button>
    } 

  </Box>
  )
}
