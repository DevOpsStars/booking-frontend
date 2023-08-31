import './App.css';
import {Route, Routes} from 'react-router-dom'
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
