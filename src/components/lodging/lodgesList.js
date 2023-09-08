import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

import LodgingService from '../../services/lodgeService';
import LodgeCard from "./lodgeCard";

export default function LodgesList() {
  const [lodges, setLodges] = useState([]);

  useEffect(() => {
    LodgingService.getLodgesByHost(1, setLodges);
  }, [])

  useEffect(() => { console.log(lodges); }, [lodges]);

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>Lodges</Typography>
      <Stack>


        {lodges.map((l) => {
          console.log(l);
          return <LodgeCard key={l.id} lodge={l} />
        }
        )}
      </Stack>
    </Box>
  );
}
