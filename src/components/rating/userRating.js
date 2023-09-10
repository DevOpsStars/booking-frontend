import React, { useEffect } from 'react'
import Rating from '@mui/material/Rating';
import { Grid, Typography } from '@mui/material';
import UserService from '../../services/userService';
import { display } from '@mui/system';
import { StyledRating } from './averageRating';

export default function UserRating({ userId, rate, lastUpdated }) {
    // const [value, setValue] = React.useState(rate);
    const [user, setUser] = React.useState({});

    useEffect(() => {
      let requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
      };
      UserService.getUser(userId, setUser, requestOptions);
    }, [])

  return (
    // <div style={{display: 'inline', gap: '10px', alignContent: 'left'}}>
    <Grid container justifyContent="flex-start" sx={{gap: 2}}>
      <StyledRating
        name="user-rating"
        value={rate}
        readOnly
      />
      <Typography component="legend">{user ? user?.username : "unknown"}</Typography>
      <Typography component="legend" color="gray">{lastUpdated}</Typography>
    </Grid>
    // </div>
  )
}
