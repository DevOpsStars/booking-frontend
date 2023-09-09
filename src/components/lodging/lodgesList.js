import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

import LodgingService from '../../services/lodgeService';
import LodgeCard from "./lodgeCard";
import { useNavigate } from "react-router-dom";

export default function LodgesList() {
  const [lodges, setLodges] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    LodgingService.getLodgesByHost(1, setLodges);
  }, [])

  useEffect(() => { console.log(lodges); }, [lodges]);

  const deleteLodge = (lodgeId) => {
    let requestOptions = {
      method: 'DELETE'
    }
    LodgingService.deleteLodge(requestOptions, lodgeId);
    LodgingService.getLodgesByHost(1, setLodges);
    window.location.reload(true)
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>Lodges</Typography>
      <Stack>


        {lodges.map((l) => {
          console.log(l);
          return (
            <Box key={crypto.randomUUID()} sx={{ display: 'flex', direction: 'row' }}>
              <LodgeCard key={l.id} lodge={l} />
              <Stack sx={{ display: 'flex', direction: 'column', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ mb: 2 }}
                  onClick={() => deleteLodge(l.id)}>
                  Delete</Button>
                <Button
                  variant="contained"
                  sx={{ mb: 2 }}
                  onClick={() => navigate(`/lodge-dates/${l.id}`)}>Update</Button>
              </Stack>
            </Box>
          )
        }
        )}
      </Stack>
    </Box>
  );
}
