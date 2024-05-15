import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import { AuthProvider } from './components/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
