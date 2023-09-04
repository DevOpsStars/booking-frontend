import './App.css';
import {Route, Routes} from 'react-router-dom'
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import BasePage from './pages/basePage';
import RequestList from './components/booking/requestList';
import UserProfile from './components/users/userProfile';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/*' element={<BasePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/requests' element={<BasePage><RequestList/></BasePage>}/>
        <Route path='/profile' element={<BasePage><UserProfile/></BasePage>}/>
      </Routes>
    </div>
  );
}

export default App;
