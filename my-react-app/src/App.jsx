import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';        // ← Add this
import Fotter from './components/Fotter';        // ← Add this
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';

function App() {
  return (
    <Router>
      {/* Header is always visible */}
      <Header />

      {/* This <main> grows and pushes footer down */}
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate to="/login" />} />
          {/* You can add more routes later */}
        </Routes>
      </main>

      {/* Footer is always at the bottom */}
      <Fotter />
    </Router>
  );
}

export default App;