import { useEffect, useState } from 'react';
import { Box, Button, Container, CssBaseline, Grid, Stack, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';

import moment from "moment";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import LodgingService from '../../services/lodgeService';
import { useNavigate } from 'react-router-dom';
import BookingService from '../../services/requestService';
import jwt from 'jwt-decode';
import LodgeSearchResult from './lodgeSearchResult';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

// var stompClient=null;

export default function LodgeSearch() {

  const navigate = useNavigate();

  const [dates, setDates] = useState([moment(), moment()]);
  const [numOfGuests, setNumOfGuests] = useState(1);
  const [lodges, setLodges] = useState([]);

  const [notifications, setNotifications] = useState([]);
  const [notification, setNotification] = useState('');
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS(process.env.REACT_APP_BOOKING_SERVICE_PATH + "/ws");
    const client = Stomp.over(socket);

    client.connect({}, () => {
      alert("Stomp client is connected");
      console.log("Stomp client is connected");
      client.subscribe('/topic/messages', (message) => {
        const receivedNotification = JSON.parse(message.body);
        setNotifications((prevNotifications) => [...prevNotifications, receivedNotification]);
      });

      client.subscribe('/topic/reqCreated', onResCreatedNotifReceived); //TODO USER ID, TODO smestiti negde drugde sve ovo
      // client.subscribe('/resCreated', onResCreatedNotifReceived); //TODO USER ID, TODO smestiti negde drugde sve ovo
      // client.subscribe('/user/1/resCreated', onResCreatedNotifReceived);
      client.subscribe('/topic/reqAccepted', onReqAcceptedNotifReceived);
    },
    onError);

    setStompClient(client);
    return () => {
      client.disconnect();
    };

  }, [])

  // const haha = () => {
  //   let Sock = new SockJS(process.env.REACT_APP_BOOKING_SERVICE_PATH + "/ws")
  //   stompClient = over(Sock);
  //   stompClient.connect({}, onConnected, onError);
  // }

  // const onConnected = () => {
  //   alert("Stomp client is connected");
  //   console.log("Stomp client is connected");
  //   stompClient.subscribe('/user/1/resCreated', onResCreatedNotifReceived); //TODO USER ID, TODO smestiti negde drugde sve ovo
  //   stompClient.subscribe('/user/1/reqAccepted', onReqAcceptedNotifReceived);
  //   //AKO NECE NOTIFIKACIJE< ONDA UNSUBSCRIBE
  // }

  const onResCreatedNotifReceived = (payload) => {
    console.log("%%%%%%%%%%%% Usli u callback")
    let payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case "CREATED":
        alert("STIGLA CREATED notifikacija, napraviti toster")
        console.log("STIGLA CREATED notifikacija, napraviti toster, moze lista na frontu, moze fetch sa beka?", payloadData)
        break;
      default: alert("Default switch created")
    }
  }

  const onReqAcceptedNotifReceived = (payload) => {
    let payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case "RESPOND":
        alert("STIGLA RESPOND notifikacija, napraviti toster")
        console.log("STIGLA RESPOND notifikacija, napraviti toster, moze lista na frontu, moze fetch sa beka?", payloadData)
        break;
      default: alert("Default switch accept")
    }
  }

  const onError = (err) => {
    console.log(err)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        country: data.get('country'),
        city: data.get('city'),
        address: data.get('address'),
        numOfGuests: numOfGuests,
        startDate: dates[0].format("YYYY-MM-DD"),
        endDate: dates[1].format("YYYY-MM-DD")
      })
    }
    LodgingService.searchLodges(requestOptions, setLodges, dates[0].format("YYYY-MM-DD"), dates[1].format("YYYY-MM-DD"));
  }

  const makeReservation = (lodgeId, totalPrice) => {
    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: localStorage.getItem("token") ? jwt(localStorage.getItem("token")).id : 1, // TODO SKLONITI 1
        lodgeId: lodgeId,
        guestNumber: numOfGuests,
        reservationStart: dates[0].format("YYYY-MM-DD"),
        reservationEnd: dates[1].format("YYYY-MM-DD"),
        totalPrice: totalPrice
      })
    }
    alert(requestOptions.body);
    BookingService.newRequest(requestOptions);
  }

  const countReservations = (lodgeId, start, end) => {
    let count = BookingService.getReservationsCount(lodgeId, start, end);
    console.log(count, typeof(count))
    return count
  }

  return (
    <Container component="main">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Grid container spacing={1} direction="row" >
            <Grid item sm={2} xs={12}>
              <TextField
                name="country"
                label="Country"
                id="country"
                autoComplete="country"
              />
            </Grid>
            <Grid item sm={2} xs={12}>
              <TextField
                name="city"
                label="City"
                id="city"
                autoComplete="city"
              />
            </Grid>
            <Grid item sm={2} xs={12}>
              <TextField
                name="address"
                label="Address"
                id="address"
                autoComplete="address"
              />
            </Grid>
            <Grid item sm={2} xs={12}>
              <TextField
                type="number"
                name="numOfGuests"
                label="Number of Guests"
                id="numOfGuests"
                autoComplete="numOfGuests"
                min={1}
                value={numOfGuests}
                onChange={e => setNumOfGuests(e.target.value)}
                InputProps={{
                  inputProps: {
                    max: 50, min: 1
                  }
                }}
              />
            </Grid>
            <Grid item >
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateRangePicker disablePast format="DD/MM/YYYY" value={dates} onChange={(newValue) => setDates(newValue)} />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="warning"
            sx={{ mt: 3, mb: 2 }}
          >
            Search
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Typography variant="h5" sx={{ mb: 3 }}>Lodges</Typography>
        <Stack>
          {lodges && lodges.length > 0 && lodges.map((l, index) => {
            console.log(l);
            return (
              <LodgeSearchResult key={index} lodge={l} numOfGuests={numOfGuests} start={dates[0].format("YYYY-MM-DD")} end={dates[1].format("YYYY-MM-DD")}/>
            )
          }
          )}
        </Stack>
      </Box>
    </Container >
  )
}
