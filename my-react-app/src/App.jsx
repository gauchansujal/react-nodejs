import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';        // ← Add this
import Fotter from './components/Fotter';        // ← Add this
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';

function Layout({ children}) {
  const loctaion = useLocation();

  const hideHeaderFooter = location.pathname === '/login' || location.pathname === '/register';
  return (
    <>

     {!hideHeaderFooter && <Header/>}
      <main>{children}</main>
      {!hideHeaderFooter && <Fotter/>}
      
    </>
  );
}


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate to="/login" />} />
          {/* You can add more routes later */}
        </Routes>
      </Layout>

      
    </Router>
  );
}

export default App;