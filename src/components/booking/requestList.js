import React, { useEffect, useState } from "react";
import RequestHostView from "./requestHostView";
import { Typography } from "@mui/material";
import BookingService from '../../services/requestService';
import jwtDecode from "jwt-decode";
import LodgingService from "../../services/lodgeService";

export default function RequestList() {
  const [requests, setRequests] = useState([]);
  const [lodges, setLodges] = useState([]);

  useEffect(() => {
       if (JSON.parse(localStorage.getItem("currentUser")).role == "ROLE_GUEST") {
        BookingService.getRequestsByUser(setRequests,
          jwtDecode(localStorage.getItem("token")).id);
      } else {
        BookingService.getRequests(setRequests);
        LodgingService.getLodgesByHost(jwtDecode(localStorage.getItem("token")).id, setLodges);
      }
  }, [])

  useEffect(() => {console.log(requests);}, [requests]);
  useEffect(() => {
    console.log(lodges, requests);
    if (lodges && requests && requests.length > 0){
      console.log(requests.filter(b => lodges.map(l => l.id).includes(b.lodgeId)))
      setRequests(requests.filter(b => lodges.map(l => l.id).includes(b.lodgeId)))
    }
      
  }, [lodges]);

  return (
    <div>
      <Typography variant="h5" sx={{mb: 3}}>My Booking Requests</Typography>
        {requests.map((r) => 
          {
            console.log(r);
            return <RequestHostView key={r.id} request={r} />
          }
        )}
    </div>
  );
}
