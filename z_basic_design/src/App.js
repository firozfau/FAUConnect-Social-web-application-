
// function App() {
//   return (
//     // <div className="App">
//     //   <header className="App-header">
//     //     <img src={logo} className="App-logo" alt="logo" />
//     //     <p>
//     //       Edit <code>src/App.js</code> and save to reload.
//     //     </p>
//     //     <a
//     //       className="App-link"
//     //       href="https://reactjs.org"
//     //       target="_blank"
//     //       rel="noopener noreferrer"
//     //     >
//     //       Learn React
//     //     </a>
//     //   </header>
//     // </div>

//     <div className="App">
//       <header className="bg-blue-500 text-white text-3xl p-6">
//         Welcome to React with Tailwind CSS!
//       </header>
//     </div>
//   );
// }


import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import RegistrationPage from './RegistrationPage';
import MainPage from './MainPage';
import SettingPage from './SettingPage'

function App() {
  return (
    <Router>
      <Route path="/" exact component={LandingPage} />
      <Route path="/register" component={RegistrationPage} />
      <Route path="/main" component={MainPage} />
      <Route path="/setting" component={SettingPage} />
    </Router>
  );
}

export default App;


