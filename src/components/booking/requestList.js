import React, { useEffect, useState } from "react";
import RequestHostView from "./requestHostView";
import { Typography } from "@mui/material";
import RequestService from '../../services/requestService';

export default function RequestList() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    RequestService.getRequests(setRequests);
    // console.log(reqs);
  }, [])

  useEffect(() => {console.log(requests);}, [requests]);

  return (
    <div>
      <Typography variant="h5" sx={{mb: 3}}>Booking Requests</Typography>
        {requests.map((r) => 
          {
            console.log(r);
            return <RequestHostView key={r.id} request={r} />
          }
        )}
    </div>
  );
}
