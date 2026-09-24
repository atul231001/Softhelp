import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import OfficeDashboard from './pages/office/OfficeDashboard';
import EngineerDashboard from './pages/engineer/EngineerDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import Profile from './pages/Profile';
import Chats from './pages/Chats';

function App() {
  return (
    <BrowserRouter>
      {/* Navbar will only show on pages that do not have their own layout, but for simplicity we will render it globally. Wait, DashboardLayout has its own sidebar and header. We should hide Navbar if the route starts with /office, /engineer, or /admin. To do this, we can move Navbar into the routes that need it, or create a layout. Since we already did DashboardLayout, let's just conditionally render Navbar inside App using a wrapper, or we can just remove Navbar from here and put it in Home, Login, Register individually. */}
      
      <Routes>
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/login" element={<><Navbar /><Login /></>} />
        <Route path="/register" element={<><Navbar /><Register /></>} />
        
        {/* Protected Dashboard Routes */}
        <Route path="/office/dashboard" element={<OfficeDashboard />} />
        <Route path="/engineer/dashboard" element={<EngineerDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        
        {/* Shared Protected Routes */}
        <Route path="/office/profile" element={<Profile />} />
        <Route path="/engineer/profile" element={<Profile />} />
        <Route path="/office/chats" element={<Chats />} />
        <Route path="/engineer/chats" element={<Chats />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
