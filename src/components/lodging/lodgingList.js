import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";

import LodgingService from '../../services/lodgeService';

export default function RequestList() {
  const [lodges, setLodges] = useState([]);

  useEffect(() => {
    LodgingService.getLodges(setLodges);
  }, [])

  useEffect(() => {console.log(lodges);}, [lodges]);

  return (
    <div>
      <Typography variant="h5" sx={{mb: 3}}>Lodges</Typography>
        {lodges.map((lodge) => 
          {
            console.log(lodge);
            return <h1>${lodge.title}</h1>
            // return <RequestHostView key={r.id} request={r} />
          }
        )}
    </div>
  );
}
