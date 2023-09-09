import React, { useEffect, useState } from "react";
import EditCalendarRoundedIcon from "@mui/icons-material/EditCalendarRounded";
import { Box, Container } from "@mui/system";
import {
  Avatar,
  Chip,
  CssBaseline,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import Button from '@mui/material/Button';
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers-pro";
import BookingService from "../../services/requestService";
import jwt from 'jwt-decode';
import { useLocation } from "react-router-dom";

export default function RequestForm({ lodgeId, maxGuests, pricePerPerson, pricePerNight }) {

  const { state } = useLocation();

  useEffect(()=>{
    console.log("LODGE ID: ", state.lodgeId);
    console.log("GUEST NUMBER: ", state.guestNumber);
    console.log("RESERVATION START: ",state.reservationStart);
    console.log("RESERVATION END: ", state.reservationEnd);
    console.log("TOTAL PRICE: ", state.totalPrice);
  })

  const [dates, setDates] = useState([moment(), moment()]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [guestNumber, setGuestNumber] = useState(0);

  useEffect(() => {
    console.log(dates[0], dates[1]);
    console.log("diff " + moment(dates[1]).diff(moment(dates[0]), 'days'))
  }, [dates]);

  useEffect(() => {
    console.log(totalPrice);
  }, [totalPrice]);

  useEffect(() => {
    // TODO: get total price from lodging service instead of this
    if (pricePerNight > 0) {
      setTotalPrice(moment(dates[1]).diff(moment(dates[0]), 'days') * pricePerNight);
      if (pricePerPerson > 0) {

        setTotalPrice(guestNumber * pricePerPerson + moment(dates[1]).diff(moment(dates[0]), 'days'));
      }
    }

  }, [dates, guestNumber]);

  const handleSubmit = (event) => {
    event.preventDefault();
    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: jwt(localStorage.getItem("token")).id,
        lodgeId: lodgeId,
        guestNumber: guestNumber,
        reservationStart: dates[0].format("YYYY-MM-DD"),
        reservationEnd: dates[1].format("YYYY-MM-DD"),
        totalPrice: totalPrice
      })
    }
    alert(requestOptions.body);
    BookingService.newRequest(requestOptions);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ mb: 1, bgcolor: "warning.main" }}>
          <EditCalendarRoundedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Booking Request
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Grid container spacing={1} direction="row" justifyContent="center" alignItems="center">
            <Grid item>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateRangePicker format="DD/MM/YYYY" value={dates} onChange={(newValue) => setDates(newValue)} />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ mt: 3, mb: 2 }}>
                <TextField
                  id="outlined-number"
                  label="Guest Number"
                  type="number"
                  value={guestNumber}
                  onChange={(e) => { setGuestNumber(e.target.value) }}
                  InputProps={{ inputProps: { min: 1, max: maxGuests } }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <Typography sx={{ fontWeight: 'bold' }}>Total Price: ${totalPrice}</Typography>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="warning"
            sx={{ mt: 3, mb: 2 }}
          >
            Send Request
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
