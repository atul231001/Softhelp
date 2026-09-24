import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Bell, LogOut, Wallet, Map, Plus, X, Search, Settings, ChevronLeft, MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function DashboardLayout({ children, role }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/login');
      return;
    }
    setUserData(JSON.parse(userStr));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const onSubmitJob = (data) => {
    console.log("New Job Posted:", data);
    alert("Job Posted Successfully!");
    setIsModalOpen(false);
    reset();
  };

  const engineerMenu = [
    {
        title: "MAIN MENU",
        items: [
            { name: 'Dashboard', path: '/engineer/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
            { name: 'Nearby Requests', path: '/engineer/nearby-requests', icon: <Map className="w-5 h-5" /> },
        ]
    },
    {
        title: "WORK MODULE",
        items: [
            { name: 'My Jobs', path: '/engineer/my-jobs', icon: <FileText className="w-5 h-5" /> },
            { name: 'Messages', path: '/engineer/chats', icon: <MessageSquare className="w-5 h-5" /> },
            { name: 'Wallet', path: '/engineer/wallet', icon: <Wallet className="w-5 h-5" /> },
            { name: 'Notifications', path: '/engineer/notifications', icon: <Bell className="w-5 h-5" /> },
        ]
    }
  ];

  const officeMenu = [
    {
        title: "MAIN MENU",
        items: [
            { name: 'Dashboard', path: '/office/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
            { name: 'My Requests', path: '/office/requests', icon: <FileText className="w-5 h-5" /> },
            { name: 'Messages', path: '/office/chats', icon: <MessageSquare className="w-5 h-5" /> },
        ]
    },
    {
        title: "NOTIFICATIONS",
        items: [
            { name: 'Notifications', path: '/office/notifications', icon: <Bell className="w-5 h-5" /> },
        ]
    }
  ];

  const sidebarMenu = role === 'ENGINEER' ? engineerMenu : officeMenu;

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
      {/* Sidebar */}
      <div className="w-[280px] bg-white border-r border-gray-200 flex flex-col hidden md:flex shrink-0">
        
        {/* Logo Block */}
        <div className="p-4">
            <div className="flex items-center justify-between border border-gray-100 shadow-sm rounded-2xl p-2 bg-white">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full border border-indigo-100 flex items-center justify-center bg-indigo-50 text-indigo-700 font-black text-sm">
                        DF
                    </div>
                    <div>
                        <div className="font-black text-gray-900 tracking-tight leading-none text-[15px]">DISTRICT<span className="text-indigo-600">FIX</span></div>
                        <div className="text-[10px] font-bold text-white bg-amber-500 rounded px-1.5 py-0.5 inline-block mt-1">PRO</div>
                    </div>
                </div>
                <button className="p-1.5 bg-gray-50 text-gray-400 rounded-lg hover:bg-gray-100 hover:text-gray-600 transition-colors mr-1">
                    <ChevronLeft className="w-4 h-4" />
                </button>
            </div>
        </div>

        {/* Sidebar Search */}
        <div className="px-4 mb-2">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Search" 
                    className="w-full pl-9 pr-12 py-2 border border-gray-200 rounded-xl bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 text-[10px] bg-white border border-gray-200 rounded text-gray-400 font-sans">⌘</kbd>
                    <kbd className="px-1.5 py-0.5 text-[10px] bg-white border border-gray-200 rounded text-gray-400 font-sans">K</kbd>
                </div>
            </div>
        </div>
        
        {/* Navigation Menus */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 pt-4 pb-4">
            {sidebarMenu.map((group, idx) => (
                <div key={idx} className="mb-6">
                    <h3 className="text-[11px] font-bold text-gray-400 tracking-wider mb-2 uppercase ml-2">{group.title}</h3>
                    <div className="space-y-1">
                        {group.items.map((link) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-[14px] ${
                                        isActive
                                        ? 'bg-blue-50/70 text-indigo-700 font-semibold shadow-[0_1px_3px_rgba(0,0,0,0.02)] border border-blue-100/50'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium border border-transparent'
                                    }`}
                                >
                                    {/* Wrapping icon to apply specific stroke width or color if needed */}
                                    <div className={`${isActive ? 'text-indigo-600' : 'text-gray-400'}`}>
                                        {link.icon}
                                    </div>
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            ))}
            
            {/* System Node */}
            <div className="mb-2 border-t border-gray-100 pt-4">
                <h3 className="text-[11px] font-bold text-gray-400 tracking-wider mb-2 uppercase ml-2">SYSTEM</h3>
                <div className="space-y-1">
                    <Link to={`/${role.toLowerCase()}/profile`} className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-[14px] text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium">
                        <Settings className="w-5 h-5 text-gray-400" />
                        Settings
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-[14px] text-gray-600 hover:bg-red-50 hover:text-red-600 font-medium text-left">
                        <LogOut className="w-5 h-5 text-gray-400" />
                        Sign Out
                    </button>
                </div>
            </div>
        </div>

        {/* Floating Profile Card */}
        <div className="p-4 bg-gray-50/30">
            <Link to={`/${role.toLowerCase()}/profile`} className="flex items-center gap-3 p-3 bg-white border border-gray-200 shadow-sm rounded-2xl hover:border-indigo-300 transition-colors group cursor-pointer">
                <div className="relative">
                    <div className="h-10 w-10 rounded-xl bg-gray-900 flex items-center justify-center text-white font-bold text-lg">
                        {userData?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    {/* Online Dot */}
                    <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="overflow-hidden flex-1">
                    <div className="font-bold text-gray-900 text-[13px] truncate group-hover:text-indigo-700 transition-colors">{userData?.name || 'User Name'}</div>
                    <div className="text-[11px] text-gray-500 truncate">{userData?.email || 'email@example.com'}</div>
                </div>
            </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-gray-50">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10 sticky top-0">
          <div className="font-bold text-gray-800 text-lg">
             {role === 'ENGINEER' 
                ? engineerMenu.flatMap(g => g.items).find(l => l.path === location.pathname)?.name 
                : officeMenu.flatMap(g => g.items).find(l => l.path === location.pathname)?.name 
             || 'Dashboard'}
          </div>
          
          <div className="flex items-center gap-5">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-[0_4px_12px_rgba(79,70,229,0.25)] transition-all hover:-translate-y-0.5 active:translate-y-0 text-sm"
            >
              <Plus className="w-4 h-4" />
              Post Problem
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="w-full mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Post Problem Modal - (Unchanged) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/80">
                <h2 className="text-lg font-bold text-gray-900">Post a New Problem</h2>
                <button 
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>
            
            {/* Modal Body / Form */}
            <div className="p-6 overflow-y-auto custom-scrollbar">
                <form id="post-job-form" onSubmit={handleSubmit(onSubmitJob)} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Place Name */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">City / Place Name</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Balaghat"
                                {...register("placeName", { required: true })}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-gray-50/50"
                            />
                            {errors.placeName && <span className="text-red-500 text-xs mt-1 block">Required</span>}
                        </div>

                        {/* Company / Office Name */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Company / Office Name</label>
                            <input 
                                type="text" 
                                placeholder="e.g. ABC Bank Branch"
                                {...register("officeName", { required: true })}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-gray-50/50"
                            />
                            {errors.officeName && <span className="text-red-500 text-xs mt-1 block">Required</span>}
                        </div>
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Address</label>
                        <input 
                            type="text" 
                            placeholder="Full office address or landmark"
                            {...register("address", { required: true })}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-gray-50/50"
                        />
                        {errors.address && <span className="text-red-500 text-xs mt-1 block">Required</span>}
                    </div>

                    {/* Problem Description */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">What is the problem? (Details)</label>
                        <textarea 
                            rows="3"
                            placeholder="Describe the IT issue in detail..."
                            {...register("problem", { required: true })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none bg-gray-50/50"
                        ></textarea>
                        {errors.problem && <span className="text-red-500 text-xs mt-1 block">Required</span>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Contact Person Name */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Contact Person Name</label>
                            <input 
                                type="text" 
                                placeholder="Name of person at office"
                                {...register("contactPerson", { required: true })}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-gray-50/50"
                            />
                            {errors.contactPerson && <span className="text-red-500 text-xs mt-1 block">Required</span>}
                        </div>

                        {/* Priority */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Priority</label>
                            <select 
                                {...register("priority")}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-gray-50/50"
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                                <option value="Critical">Critical (Urgent)</option>
                            </select>
                        </div>
                    </div>

                    {/* Price / Amount */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Payment / Price Offered (₹)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                            <input 
                                type="number" 
                                placeholder="e.g. 1500"
                                {...register("price", { required: true, min: 100 })}
                                className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-gray-50/50"
                            />
                        </div>
                        {errors.price && <span className="text-red-500 text-xs mt-1 block">Minimum amount is ₹100</span>}
                    </div>

                </form>
            </div>
            
            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                    Cancel
                </button>
                <button 
                    form="post-job-form"
                    type="submit"
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    Post Problem
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
