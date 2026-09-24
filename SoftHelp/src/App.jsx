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
import MyJobs from './pages/engineer/MyJobs';

function App() {
  return (
    <BrowserRouter>
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
        
        {/* Specific Role Routes */}
        <Route path="/engineer/my-jobs" element={<MyJobs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
