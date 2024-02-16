import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import RegistrationPage from './RegistrationPage';
import MainPage from './MainPage'
import SettingPage from './SettingPage'
import EmailVerification from './emailVerification'

// Other imports

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LandingPage />} />
        <Route path="/register" element={<LandingPage />} />
        <Route path="/incomplete" element={<RegistrationPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/emailVerification/:token" element={<EmailVerification />} />
        
        {/* other routes */}
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
