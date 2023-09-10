import { Box, Button, Card, CardActions, CardContent, Chip, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import IconThenText from "./textWithIcon";
import PersonIcon from "@mui/icons-material/Person";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EventBusyIcon from '@mui/icons-material/EventBusy';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationCityOutlinedIcon from "@mui/icons-material/LocationCityOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UserService from "../../services/userService";
import BookingService from "../../services/requestService";
import FormatedDate from "./formatedDate";
import moment from "moment";
import LodgeCard from "../lodging/lodgeCard";
import LodgingService from "../../services/lodgeService";
import NewRating from "../rating/newRating"

export default function BookingGuestView({ booking }) {
  const [user, setUser] = useState({});
  const [cancelCount, setCancelCount] = useState(0);
  const [lodge, setLodge] = useState({});

  const canCancel = (startDate) => {
    const now = moment().startOf('day');
    const daysDifference = moment(startDate).diff(now, 'days');
    return daysDifference > 1;
  };

  const canRate = (endDate) => {
    if (booking.canceled) {return false;}
    const now = moment().startOf('day');
    const daysDifference = moment(endDate).diff(now, 'days');
    return daysDifference <= 0;
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    console.log(cancelCount);
  }, [cancelCount]);

  const handleCancel = (event) => {
    BookingService.cancel(booking.id);
    getData();
  };

  return (
    <Card key={booking.id} sx={{ minWidth: 275, display: "inline-flex", m: 2 }}>
      <LodgeCard lodge={lodge}/>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent>
          <Typography variant="h4" component="div">
            <Chip label={"ID: " + booking.id} />
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <IconThenText
                icon={<AccountCircleIcon sx={{ mr: 1, mt: 1 }} />}
                text={user ? user.username : "user" + booking.userId}
              />
            </Grid>
          </Grid>

          <IconThenText
            icon={<LocationCityOutlinedIcon sx={{ mr: 1, my: 1 }} />}
            text={"Lodge Street " + booking.lodgeId}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <CalendarMonthIcon />
            <Chip
              label={<FormatedDate dateStr={booking.reservationStart} />}
              variant="outlined"
              sx={{ mx: 1 }}
            />
            -
            <Chip
              label={<FormatedDate dateStr={booking.reservationEnd} />}
              variant="outlined"
              sx={{ ml: 1 }}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Chip
              label={booking.guestNumber}
              color="warning"
              sx={{ my: 1 }}
              icon={<PersonIcon />}
            />
            <Chip
              label={"$" + booking.totalPrice}
              color="success"
              sx={{ mx: 1 }}
              icon={<LocalAtmIcon />}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {booking.status !== "PENDING" ? (
              booking.status === "ACCEPTED" ? (
                <Typography sx={{ fontWeight: "bold" }} variant="p">
                  {booking.status}
                </Typography>
              ) : (
                <Typography variant="p">{booking.status}</Typography>
              )
            ) : (
              ""
            )}
          </div>
        </CardContent>

        {!booking.canceled && canCancel(booking.reservationStart) ? (
          <CardActions>
            <Button
              onClick={handleCancel}
              size="small"
              variant="outlined"
              color="warning"
            >
              Cancel <CheckIcon />
            </Button>
          </CardActions>
        ) : !booking.canceled ? <Typography variant="p" color='gray' sx={{mb: 2}}>You cannot cancel this</Typography> : (
          <Typography sx={{ fontWeight: "bold", mb: 2 }} variant="p">
            CANCELED
          </Typography>
        )}
        {/* <div> */}
          {canRate(booking.reservationEnd) ? (
          <div>
            <NewRating type="lodge" forId={booking.lodgeId}/>
            <NewRating type="host" forId={lodge.hostId}/>
          </div>
          ) : ""}
        {/* </div> */}
      </Box>
    </Card>
  );

  function getData() {
    let requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    UserService.getUser(booking.userId, setUser, requestOptions);
    LodgingService.getLodge(booking.lodgeId, setLodge);
  }
}
