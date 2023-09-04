import './App.css';
import {Route, Routes} from 'react-router-dom'
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import BasePage from './pages/basePage';
import RequestList from './components/booking/requestList';
import RequestForm from './components/booking/requestForm';
import { ThemeProvider, createTheme } from '@mui/material';
import BookingHostView from './components/booking/bookingList';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={defaultTheme}>
      <Routes>
        <Route path='/*' element={<BasePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/requests' element={<BasePage><RequestList/></BasePage>}/>
        <Route path='/my-bookings' element={<BasePage><BookingHostView/></BasePage>}/>
        <Route path='/new-request' element={<BasePage><RequestForm pricePerPerson={15} pricePerNight={64} maxGuests={10} lodgeId={1}/></BasePage>} />
      </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
