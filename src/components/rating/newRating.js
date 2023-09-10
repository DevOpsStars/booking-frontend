import { Button, Grid, Rating, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { StyledRating } from './averageRating';
import RatingService from '../../services/ratingService';
import jwtDecode from 'jwt-decode';

// export default function NewHostRating() {
//     const [value, setValue] = React.useState(2);
//   return (
//     <div>
//     <Typography component="legend">Rate this host</Typography>
//       <StyledRating
//         name="host-rating"
//         value={value}
//         onChange={(event, newValue) => {
//           setValue(newValue);
//         }}
//       />
//       <Button color='primary' variant='outlined'>Rate</Button>
//     </div>
//   )
// }

export default function NewRating({ type, forId }) {
    const [value, setValue] = useState(0);
    const [allByG, setAllByG] = useState([]);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
      let guestId = jwtDecode(localStorage.getItem("token")).id;
      RatingService.getAllByGuest(guestId, type, setAllByG);
    }, [])

    useEffect(() => {
      if (allByG && allByG.length > 0) {
        let forThis = allByG.filter(a => type == "host" ? a.hostId === forId : a.lodgeId === forId);
        if (forThis.length > 0) {
          setUpdate(true);
        } else {
          setUpdate(false);
        }
        console.log(forThis[0]?.rate);
        setValue(forThis[0]?.rate);
      }
    }, [allByG])

    const handleSubmit = (e) => {
      if (value < 1 || value > 5) {console.log('no'); return null;}
      let guestId = jwtDecode(localStorage.getItem("token")).id;
      if (update) {
        let forThis = allByG.filter(a => type == "host" ? a.hostId === forId : a.lodgeId === forId);
        RatingService.update(forThis[0]?.id, type, value);
      } else {
        RatingService.createNew(guestId, type, forId, value);
      }
    }

    const handleDelete = (e) => {
      if (value < 1 || value > 5) {console.log('no'); return null;}
      if (update) {
        let forThis = allByG.filter(a => type == "host" ? a.hostId === forId : a.lodgeId === forId);
        RatingService.delete(forThis[0]?.id, type);
      }
    }

    useEffect(() => {console.log('value: ', value)}, [])

  return (
    <Grid container justifyContent="flex-start" sx={{gap: 2}}>
    <Typography component="legend">Rate this {type}</Typography>
      <StyledRating
        name={"new-" + type + "-rating"}
        value={value}
        defaultValue={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      <Button onClick={handleSubmit} color='primary' variant='outlined'>{update? "Update" : "Rate"}</Button>
      {update? <Button onClick={handleDelete} color='error' variant='outlined'>Delete</Button> : ""}
      
    </Grid>
  )
}
