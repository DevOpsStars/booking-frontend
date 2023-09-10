
import { useState } from "react";
import BungalowIcon from '@mui/icons-material/Bungalow';
import { Box, Container } from "@mui/system";
import {
  Avatar,
  Checkbox,
  CssBaseline,
  FormControl,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import LodgingService from "../../services/lodgeService";
import InputLabel from '@mui/material/InputLabel';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Link } from "react-router-dom";


export default function LodgeForm() {

  const [priceType, setPriceType] = useState('');
  const [isAutoApproved, setIsAutoApproved] = useState(false);
  const [hasKitchen, setHasKitchen] = useState(false);
  const [hasWifi, setHasWifi] = useState(false);
  const [hasAC, setHasAC] = useState(false);
  const [hasFreeParking, setHasFreeParking] = useState(false);
  const [hasBalcony, setHasBalcony] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [lodge, setLodge] = useState(null);
  const [photoTitle, setPhotoTitle] = useState("");
  const [lodgePhotos, setLodgePhotos] = useState([]);

  const handleChange = (event) => {
    setPriceType(event.target.value);
  };
  const handleIsAutoApproved = (event) => {
    setIsAutoApproved(!isAutoApproved);
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
  const fileSelectedHandler = (event) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0])
  }
  const fileUploadHandler = (event) => {
    event.preventDefault();
    const fd = new FormData();
    fd.append('file', selectedFile);

    let requestOptions = {
      method: 'POST',
      body: fd
    }

    LodgingService.uploadPhoto(requestOptions, lodge.id, photoTitle);
    LodgingService.getPhotosByLodge(lodge.id, setLodgePhotos);
    // window.location.reload(true)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: data.get('title'),
        isAutoApproved: isAutoApproved,
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
    await LodgingService.newLodge(requestOptions, setLodge);
    // window.location.reload(true)
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
          <BungalowIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create New Lodge
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                autoComplete="title of lodge"
                name="title"
                fullWidth
                id="title"
                label="Title"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                autoComplete="Description"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                type="number"
                min={0}
                step={0.1}
                fullWidth
                id="basePrice"
                label="Base Price"
                name="basePrice"
                autoComplete="Base Price"
                InputProps={{
                  endAdornment: <InputAdornment position="end">€</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="priceTypeSelect">Price type</InputLabel>
                <Select
                  required
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
                required
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
              <h4>Reservations are auto approved?</h4>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Checkbox
                label="isAutoApproved"
                value={isAutoApproved}
                onChange={handleIsAutoApproved}
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
            disabled={lodge !== null}
          >
            Create lodge
          </Button>
        </Box>
        {lodge && 
        <Box
          sx={{
            marginBottom: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container justifyContent="flex-end">
            <Grid item xs={12}>
              <h3>
                How about some photos? Upload one by one
              </h3>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                fullWidth
                id="photoTitle"
                label="Title of the photo"
                name="photoTitle"
                autoComplete="Photo title"
                value={photoTitle}
                onChange={e => setPhotoTitle(e.target.value)}
              />
              <input type="file" onChange={fileSelectedHandler} />

            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="contained"
                color="warning"
                sx={{ mt: 3, mb: 2 }}
                onClick={fileUploadHandler}>Upload</Button>
            </Grid>
            <Grid item xs={12}>
              <ImageList>
                {lodgePhotos.map((item) => (

                  <ImageListItem key={item.id}>
                    <img
                      src={`${process.env.REACT_APP_LODGING_SERVICE_PATH}/api/photo/show/id/124/124/${item.id}`}
                      alt={item.title}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      title={item.title}
                      position="below"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Grid>
            <Grid item xs={12}>
                <Link to={`/lodge-dates/${lodge.id}`} color="inherit" underline="none">
                  Next step: Availability and pricing 
                </Link>
              </Grid>
          </Grid>
        </Box>
        }
      </Box>
    </Container>
  )
}
