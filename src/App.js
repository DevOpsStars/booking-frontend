import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import BasePage from './pages/basePage';
import RequestList from './components/booking/requestList';
import RequestForm from './components/booking/requestForm';
import { ThemeProvider, createTheme } from '@mui/material';
import BookingHostView from './components/booking/bookingList';
import UserProfile from './components/users/userProfile';
import LodgeForm from './components/lodging/lodgeForm';
import LodgeDatesForm from './components/lodging/lodgeDatesForm';
import LodgeSearch from './components/lodging/lodgeSearch';
import LodgesList from './components/lodging/lodgesList';

const defaultTheme = createTheme();


function App() {
  return (
    <div className="App">
      <ThemeProvider theme={defaultTheme}>
        <Routes>
          <Route path='/*' element={<BasePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/requests' element={<BasePage><RequestList /></BasePage>} />
          <Route path='/my-bookings' element={<BasePage><BookingHostView /></BasePage>} />
          <Route path='/new-request' element={<BasePage><RequestForm pricePerPerson={15} pricePerNight={64} maxGuests={10} lodgeId={1} /></BasePage>} />
          <Route path='/profile' element={<BasePage><UserProfile /></BasePage>} />
          <Route path='/lodge-search' element={<BasePage><LodgeSearch /></BasePage>} />
          <Route path='/new-lodge' element={<BasePage><LodgeForm /></BasePage>} />
          <Route exact path="/lodge-dates/:lodgeId" element={<BasePage><LodgeDatesForm /></BasePage>} />
          <Route exact path="/my-lodges" element={<BasePage><LodgesList /></BasePage>} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
