import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationCityOutlinedIcon from "@mui/icons-material/LocationCityOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React, { useEffect, useState } from "react";
import UserService from "../../services/userService";
import IconThenText from "./textWithIcon";
import RequestService from "../../services/requestService";
import FormatedDate from "./formatedDate";

export default function RequestHostView({ request }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    let requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
    };
    UserService.getUser(request.userId, setUser, requestOptions);
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleAccept = (event) => {
    RequestService.accept(event.target.getAttribute("req"));
  };

  const handleDecline = (event) => {
    RequestService.decline(event.target.getAttribute("req"));
  };

  return (
    <Card key={request.id} sx={{ minWidth: 275, display: "inline-flex", m: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent>
          <Typography variant="h6" component="div">
            <Chip label={"ID: " + request.id} />
          </Typography>

          <IconThenText
            icon={<AccountCircleIcon />}
            text={"/user" + request.userId}
          />
          <IconThenText
            icon={<LocationCityOutlinedIcon />}
            text={request.lodgeId}
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
              variant="outlined"
            />
            -
            <Chip
              label={<FormatedDate dateStr={request.reservationEnd} />}
              variant="outlined"
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
              icon={<PersonIcon />}
            />
          </div>
          {request.status}
        </CardContent>
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
      </Box>
    </Card>
  );
}
