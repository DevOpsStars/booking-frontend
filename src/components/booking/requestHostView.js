import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EventBusyIcon from '@mui/icons-material/EventBusy';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationCityOutlinedIcon from "@mui/icons-material/LocationCityOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React, { useEffect, useState } from "react";
import UserService from "../../services/userService";
import IconThenText, { TextThenIcon } from "./textWithIcon";
import BookingService from "../../services/requestService";
import FormatedDate from "./formatedDate";

export default function RequestHostView({ request }) {
  const [user, setUser] = useState({});
  const [cancelCount, setCancelCount] = useState(0);

  useEffect(() => {
    let requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
    };
    UserService.getUser(request.userId, setUser, requestOptions);
    BookingService.getCancelCount(request.userId, setCancelCount);
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    console.log(cancelCount);
  }, [cancelCount]);

  const handleAccept = (event) => {
    BookingService.accept(event.target.getAttribute("req"));
  };

  const handleDecline = (event) => {
    BookingService.decline(event.target.getAttribute("req"));
  };

  return (
    <Card key={request.id} sx={{ minWidth: 275, display: "inline-flex", m: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent>
          <Typography variant="h4" component="div">
            <Chip label={"ID: " + request.id} />
          </Typography>
          <Grid container>
            <Grid item xs={6}>
            <IconThenText icon={<AccountCircleIcon sx={{mr: 1, mt: 1}} />}
            text={(user ? user.username : 'user'+request.userId)}
          />
            </Grid>
            <Grid item>
            <Chip
              label={cancelCount + ' canceled'}
              color={cancelCount == 0 ? "default":"error"}
              sx={{mr: 1, mt: 1}}
              variant="outlined"
              size="sm"
              icon={<EventBusyIcon />}
            />
              {/* <IconThenText icon={<EventBusyIcon   />} text={cancelCount}/> */}
              </Grid>
          </Grid>
          
          
          <IconThenText
            icon={<LocationCityOutlinedIcon sx={{mr: 1, my: 1}} />}
            text={"Lodge Street " + request.lodgeId}
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
              label={<FormatedDate dateStr={request.reservationStart} />}
              variant="outlined" sx={{mx: 1}}
            />
            -
            <Chip
              label={<FormatedDate dateStr={request.reservationEnd} />}
              variant="outlined" sx={{ml: 1}}
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
              label={request.guestNumber}
              color="warning"
              sx={{my: 1}}
              icon={<PersonIcon />}
            />
            <Chip
              label={"$"+request.totalPrice}
              color="success"
              sx={{mx: 1}}
              icon={<LocalAtmIcon />}
            />
          </div>
          <div style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}>
            
          {request.status != 'PENDING' ? request.status == 'ACCEPTED' ?
            (<Typography sx={{ fontWeight: 'bold' }} variant="p">
              {request.status}
            </Typography>) : 
            (<Typography variant="p">
            {request.status}
          </Typography>) : ''}
            </div>
        </CardContent>
        {request.status == 'PENDING' ? (
          <CardActions>
          <Button
            onClick={handleAccept}
            req={request.id}
            size="small"
            variant="outlined"
            color="warning"
          >
            Accept <CheckIcon />
          </Button>
          <Button
            onClick={handleDecline}
            req={request.id}
            size="small"
            variant="outlined"
            color="warning"
          >
            Decline <CloseIcon />
          </Button>
        </CardActions>
        ) : ''}
        
      </Box>
    </Card>
  );
}
