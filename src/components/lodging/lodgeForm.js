
import { useState } from "react";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { Box, Container } from "@mui/system";
import {
  Avatar,
  Checkbox,
  CssBaseline,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem'; 
import LodgingService from "../../services/lodgeService";
import InputLabel from '@mui/material/InputLabel';


export default function LodgeForm() {

  const [priceType, setPriceType] = useState('');
  const [hasKitchen, setHasKitchen] = useState(false);
  const [hasWifi, setHasWifi] = useState(false);
  const [hasAC, setHasAC] = useState(false);
  const [hasFreeParking, setHasFreeParking] = useState(false);
  const [hasBalcony, setHasBalcony] = useState(false);

  const handleChange = (event) => {
    setPriceType(event.target.value);
  };
  const handleChangeHasKitchen = (event) => {
    setHasKitchen(!hasKitchen);
  };
  const handleChangeHasWifi = (event) => {
    setHasWifi(!hasWifi);
  };
  const handleChangeHasAC = (event) => {
    setHasAC(!hasAC);
  }
  const handleChangeHasFreeParking = (event) => {
    setHasFreeParking(!hasFreeParking);
  }
  const handleChangeHasBalcony = (event) => {
    setHasBalcony(!hasBalcony);
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: data.get('title'),
        isAutoApproved: data.get('isAutoApproved'),
        hostId: 1, //TODO uzmi ulogovanog
        description: data.get('description'),
        basePrice: data.get('basePrice'),
        priceType: priceType,
        country: data.get('country'),
        city: data.get('city'),
        address: data.get('address'),
        minGuests: data.get('minGuests'),
        maxGuests: data.get('maxGuests'),
        hasKitchen: hasKitchen,
        hasWifi: hasWifi,
        hasAC: hasAC,
        hasFreeParking: hasFreeParking,
        hasBalcony: hasBalcony,
      })
    }
    LodgingService.newLodge(requestOptions);
  }

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
          <AcUnitIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create New Lodge
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="title of lodge"
                  name="title"
                  fullWidth
                  id="title"
                  label="Title"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  autoComplete="Description"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  min={0}
                  step={0.1}
                  fullWidth
                  id="basePrice"
                  label="Base Price"
                  name="basePrice"
                  autoComplete="Base Price"
                />
              </Grid>
              <Grid item xs={12}>
              <FormControl fullWidth sx={{ mt: 3, mb: 2 }}>
                <InputLabel id="priceTypeSelect">Price type</InputLabel>
                <Select
                  labelId="priceTypeSelect"
                  id="priceTypeSelect"
                  value={priceType}
                  label="priceType"
                  onChange={handleChange}
                >
                  <MenuItem value={"PER_LODGE"}>Price per lodge</MenuItem>
                  <MenuItem value={"PER_PERSON"}>Price per person</MenuItem>
                </Select>
             
              </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="country"
                  label="Country"
                  name="country"
                  autoComplete="country"
                />
              </Grid>
             
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  autoComplete="city"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="Address"
                  type="address"
                  id="address"
                  autoComplete="address"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="number"
                  InputProps={{
                      inputProps: { 
                          max: 50, min: 1
                      }
                  }}
                  name="minGuests"
                  label="Minimum number of guests"
                  id="minGuests"
                  autoComplete="minGuests"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="number"
                  InputProps={{
                      inputProps: { 
                          max: 50, min: 1
                      }
                  }}
                  name="maxGuests"
                  label="Maximum number of guests"
                  id="maxGuests"
                  autoComplete="maxGuests"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <h4>Has kitchen?</h4>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Checkbox
                    label="hasKitchen"
                    value={hasKitchen}
                    onChange={handleChangeHasKitchen}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <h4>Has Wifi?</h4>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Checkbox
                    label="hasWifi"
                    value={hasWifi}
                    onChange={handleChangeHasWifi}
                  />
              </Grid>
              <Grid item xs={12} sm={6}>
               <h4>Has AC?</h4>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Checkbox
                  label="hasAC"
                  value={hasAC}
                  onChange={handleChangeHasAC}
              />
              </Grid>
              <Grid item xs={12} sm={6}>
                <h4>Has free parking?</h4>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Checkbox
                  label="hasFreeParking"
                  value={hasFreeParking}
                  onChange={handleChangeHasFreeParking}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <h4>Has balcony?</h4>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Checkbox
                    label="hasBalcony"
                    value={hasBalcony}
                    onChange={handleChangeHasBalcony}
                />
              </Grid>
            </Grid>
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="warning"
              sx={{ mt: 3, mb: 2 }}
            >
              Create lodge
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item xs={12}>
                <Link href="/lodge-search" variant="body2">
                  search ? 
                </Link>
              </Grid>
            </Grid>
        </Box>
      </Box>
    </Container>
  )
}
