
import React, { useEffect, useState } from 'react';
import { Box, Button } from "@mui/material";
import LodgeCard from './lodgeCard';
import ResultsCard from './resultsCard';
import { useNavigate } from 'react-router-dom';
import BookingService from '../../services/requestService';
import jwt from 'jwt-decode';
import LodgingService from '../../services/lodgeService';

export default function LodgeSearchResult({lodge, start, end, numOfGuests}) {

  const navigate = useNavigate();
  const [count, setCount] = useState(-1);
  const [l, setL] = useState({})
  const [user, setUser] = React.useState({});

  useEffect(() => {
    console.log("*****************", lodge)
    console.log("*****************", start)
    console.log("*****************", end)
    console.log("*****************", numOfGuests)
    BookingService.getReservationsCount(lodge.lodgeId, start, end, setCount)
    
    if (lodge && lodge.lodgeId) {
      console.log("searchResult",lodge.lodgeId)
      LodgingService.getLodge(lodge.lodgeId, setL)
    }
    if (localStorage.getItem("currentUser")) {
      setUser(JSON.parse(localStorage.getItem("currentUser")))
    }
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
    console.log(requestOptions.body);
    if (l.isAutoApproved) {
      console.log("auto");
      BookingService.newRequestAuto(requestOptions);
      // navigate("/my-bookings")
    }
    else {
      console.log("no auto");
      BookingService.newRequest(requestOptions);
      // navigate("/requests")
    }
  }

  useEffect(() => {
		console.log(l)
    console.log("is auto:", l.isAutoApproved)
	}, [l])


  return (
    <Box sx={{ display: 'flex', direction: 'row' }}>
    <LodgeCard lodge={lodge} />
    <ResultsCard result={lodge.result} />

    {count === 0 && user && user.role == "ROLE_GUEST" &&
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
