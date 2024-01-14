import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AuthContext from './Context/AuthContext';
import LogIn from './Authentication/LogIn'
import Home from './Home/home';
import Signup from './Authentication/SignUp';
import Profile from './Home/Profile';

const App = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        {!authCtx.isLoggedIn && <Route path="/" element={<Signup />} />}
        {!authCtx.isLoggedIn && <Route path="/Login" element={<LogIn />} />} 
        {authCtx.isLoggedIn && <Route path="/home" element={<Home />} />}
        <Route path="/Profile" element={<Profile/>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
