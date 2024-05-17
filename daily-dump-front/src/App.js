import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, BrowserRouter , Navigate} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import { AuthProvider } from './components/AuthContext';

function App() {
  const token = localStorage.getItem('token');  // Directly check local storage for the token

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={token ? <Home /> : <Navigate to="/login" replace />} />
          <Route path="/login" element={token ? <Navigate to="/" replace /> : <Login />} />
          <Route path="/register" element={token ? <Navigate to="/" replace /> : <Register />} />
          <Route path="/profile" element={token ? <UserProfile /> : <Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );

}


export default App;
