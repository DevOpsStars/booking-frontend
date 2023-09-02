import './App.css';
import {Route, Routes} from 'react-router-dom'
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import BasePage from './pages/basePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/*' element={<BasePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
