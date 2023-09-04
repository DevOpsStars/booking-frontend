import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem'; 
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import bcrypt from "bcryptjs-react";
import UserService from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import AlertDialog from '../alertDialog';
import jwt from 'jwt-decode';
import BookingService from '../../services/requestService';

const defaultTheme = createTheme();

export default function UserProfile() {
    const navigate = useNavigate();

    const [role, setRole] = React.useState('');

    const [user, setUser] = React.useState(JSON.parse(localStorage.getItem("currentUser")));

    const [userId, setUserId] = React.useState(localStorage.getItem("token") ? jwt(localStorage.getItem("token"))?.id : 0);

    const [activeReservations, setActiveReservations] = React.useState([]);
  
    React.useEffect(() => {
      if(!JSON.parse(localStorage.getItem("currentUser")) && !localStorage.getItem("token")) 
      {navigate("/"); return;}

      BookingService.getActive(userId, setActiveReservations);
    })

    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      let requestOptions = {
        method : 'POST',
        headers: { 'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ localStorage.getItem("token")},
        body: JSON.stringify({
          userData: {
            username: data.get('username'),
            name: data.get('firstName'),
            surname: data.get('lastName'),
            address: data.get('address'),
            email: data.get('email'),
            role: role,
          },
          oldUsername: user.username
        })
      }
      let hashedPassword = data.get("password") === '' ? '' : bcrypt.hashSync(data.get("password"), 10);
      UserService.updateUser(requestOptions, hashedPassword);
    };

    const handleDelete = () => {

      if(activeReservations.length !== 0) {alert("You cannot delete your account, you still have active reservations!"); return;}

      //TODO : add checks that are lodging related 

      let requestOptions = {
        method : 'DELETE',
        headers: { 'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ localStorage.getItem("token")}
      }
      UserService.deleteUser(requestOptions, user.username);
    };
  
    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              User details
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    fullWidth
                    id="firstName"
                    // label="First Name"
                    autoFocus
                    defaultValue={user?.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="lastName"
                    // label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    defaultValue={user?.surname}
                   
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="address"
                    // label="Address"
                    name="address"
                    autoComplete="address"
                    defaultValue={user?.address}
                    
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    // label="Email Address"
                    name="email"
                    autoComplete="email"
                    defaultValue={user?.email}
                    
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="username"
                    // label="Username"
                    name="username"
                    autoComplete="username"
                    defaultValue={user?.username}
                    
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="password"
                    label="Set new password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <FormControl fullWidth sx={{ mt: 3, mb: 2 }}>
                  <InputLabel id="roleSelect">Role</InputLabel>
                  <Select
                    labelId="roleSelect"
                    id="roleSelect"
                    value={user?.role}
                    label="role"
                  >
                    <MenuItem value={"ROLE_HOST"}>Host</MenuItem>
                    <MenuItem value={"ROLE_GUEST"}>Guest</MenuItem>
                  </Select>
               
                </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="warning"
                sx={{ mt: 3, mb: 2 }}
              >
                Update my details
              </Button>
              <AlertDialog 
                title="Account deletion" 
                message="Are you sure you want to delete your account permanently?" 
                variant="contained" 
                color="error"
                btnName="Delete account"
                confirmCallback={handleDelete}/>
            </Box>
          </Box>
          
        </Container>
      </ThemeProvider>
    );
}
