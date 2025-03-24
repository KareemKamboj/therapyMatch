import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store/useStore';
import { ThemeProvider } from './components/ThemeProvider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SeekerProfile from './pages/SeekerProfile';
import HelperDashboard from './pages/HelperDashboard';
import SeekerPreferences from './pages/SeekerPreferences';
import Matches from './pages/Matches';
import Messages from './pages/Messages';
import Appointments from './pages/Appointments';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const user = useStore((state) => state.user);

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <ThemeProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={!user ? <Login /> : <Navigate to="/profile" />} />
                <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/profile" />} />
                <Route path="/profile" element={user ? <SeekerProfile /> : <Navigate to="/login" />} />
                <Route path="/therapist-profile" element={user ? <HelperDashboard /> : <Navigate to="/login" />} />
                <Route path="/preferences" element={user ? <SeekerPreferences /> : <Navigate to="/login" />} />
                <Route path="/matches" element={user ? <Matches /> : <Navigate to="/login" />} />
                <Route path="/messages" element={user ? <Messages /> : <Navigate to="/login" />} />
                <Route path="/appointments" element={user ? <Appointments /> : <Navigate to="/login" />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;