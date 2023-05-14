// import logo from './logo.svg';
import './App.css';
import Login from './pages/login.js'
import Dashboard from './pages/dashboard';
import { BrowserRouter as Router,
          Switch,
          Route,
          Link, Routes } from "react-router-dom";
import Details from './pages/details';


function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
      </Routes>
    </Router>
  );

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;
