import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Pricing from './pages/Pricing';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';


function App() {
  const [count, setCount] = useState(0)
  const [loggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    
    const interval = setInterval(() => {
      const id = Cookies.get("UID");
      if (id) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }, 300);
    setTimeout(() => {
      return () => clearInterval(interval);
    },1201)
  }, []);

  return (
    <>
      <Router>
        {<Header isLoggedIn={loggedIn}/>}
        <Routes>
          <Route path="/" element={<Navigate to='/home' />} />
          <Route path="/home" element={<Home />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/dashboard" element={<Dashboard isLoggedIn={loggedIn}/>}/>
          <Route path="/about" element={<About />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/pricing" element={<Pricing />}/>
          <Route path="/not-found" element={<NotFound />}/>
          <Route path="*" element={<Navigate to='/not-found' />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
