import DashboardLayout from '../../layouts/DashboardLayout';
import { MapPin, IndianRupee, Search, Filter, MessageCircle, Send, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';

// Generate 50 dummy requests
const problems = [
  "Camera #4 is offline", "Router not connecting to internet", "Server PC not booting", 
  "Antivirus blocking main software", "Printer paper jam error", "Biometric not syncing",
  "LAN cable broken", "Windows blue screen error", "Projector HDMI no signal", "Switch power failure"
];
const engineerNames = ["Amit Patel", "Suresh Kumar", "Rahul Sharma", "Vikram Singh", "Deepak Verma", "Ravi Tiwari"];
const phones = ["+91 98765 43210", "+91 87654 32109", "+91 76543 21098", "+91 99887 76655", "+91 98989 87878"];
const locations = ["Balaghat", "Gondia", "Seoni", "Mandla", "Bhandara"];

const mockRequests = Array.from({ length: 50 }, (_, i) => ({
  id: `REQ-2026-${1000 + i}`,
  title: problems[Math.floor(Math.random() * problems.length)],
  postedBy: engineerNames[Math.floor(Math.random() * engineerNames.length)],
  phone: phones[Math.floor(Math.random() * phones.length)],
  location: locations[Math.floor(Math.random() * locations.length)],
  distance: parseFloat((Math.random() * 24 + 0.5).toFixed(1)), // 0.5 to 24.5 km
  payment: Math.floor(Math.random() * 2500) + 300, // ₹300 to ₹2800
  priority: Math.random() > 0.8 ? "Critical" : Math.random() > 0.6 ? "High" : Math.random() > 0.3 ? "Medium" : "Low",
  timeAgo: `${Math.floor(Math.random() * 59) + 1} mins ago`
}));

export default function EngineerDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [maxDistance, setMaxDistance] = useState("all");
  const [minPayment, setMinPayment] = useState("all");
  
  // Chat state
  const [activeChat, setActiveChat] = useState(null);
  const [chatMessage, setChatMessage] = useState("");
  const [mockMessages, setMockMessages] = useState([]);

  // Reset messages when opening a new chat
  useEffect(() => {
    setMockMessages([]);
    setChatMessage("");
  }, [activeChat]);

  const filteredRequests = useMemo(() => {
    return mockRequests.filter(req => {
      // Search filter
      const matchesSearch = 
        req.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        req.postedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Distance filter
      const matchesDistance = 
        maxDistance === "all" || req.distance <= parseFloat(maxDistance);

      // Payment filter
      const matchesPayment = 
        minPayment === "all" || req.payment >= parseInt(minPayment);

      return matchesSearch && matchesDistance && matchesPayment;
    }).sort((a, b) => a.distance - b.distance); // Sort by nearest first
  }, [searchQuery, maxDistance, minPayment]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setMockMessages([...mockMessages, { id: Date.now(), text: chatMessage }]);
    setChatMessage("");
  };

  return (
    <DashboardLayout role="ENGINEER">
      {/* Nearby Requests Section */}
      <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4 md:p-6 flex flex-col h-[800px]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
                <h2 className="text-xl font-bold text-indigo-900 flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-indigo-600" /> Available Jobs Nearby
                </h2>
                <p className="text-indigo-600/70 text-sm mt-1">Showing {filteredRequests.length} requests in your area</p>
            </div>
            
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                        type="text"
                        placeholder="Search issue or engineer..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    />
                </div>
                
                <select 
                    value={maxDistance} 
                    onChange={(e) => setMaxDistance(e.target.value)}
                    className="py-2 px-3 rounded-lg border border-indigo-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white cursor-pointer"
                >
                    <option value="all">Any Distance</option>
                    <option value="5">Within 5 KM</option>
                    <option value="10">Within 10 KM</option>
                    <option value="20">Within 20 KM</option>
                </select>

                <select 
                    value={minPayment} 
                    onChange={(e) => setMinPayment(e.target.value)}
                    className="py-2 px-3 rounded-lg border border-indigo-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white cursor-pointer"
                >
                    <option value="all">Any Amount</option>
                    <option value="500">₹500+</option>
                    <option value="1000">₹1,000+</option>
                    <option value="2000">₹2,000+</option>
                </select>
            </div>
        </div>
        
        {/* Scrollable Requests List */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
            {filteredRequests.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                    <Filter className="w-12 h-12 mb-2 text-indigo-200" />
                    <p>No requests match your current filters.</p>
                </div>
            ) : (
                filteredRequests.map((req) => (
                    <div key={req.id} className="bg-white p-5 rounded-xl border border-indigo-100 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all flex flex-col md:flex-row justify-between items-center gap-4 group">
                        <div className="flex-1 w-full">
                            <div className="flex items-center gap-3 mb-2">
                                <span className={`text-xs font-bold px-2.5 py-1 rounded-full 
                                    ${req.priority === 'Critical' ? 'bg-red-100 text-red-700' : 
                                      req.priority === 'High' ? 'bg-orange-100 text-orange-700' : 
                                      req.priority === 'Medium' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                                    {req.priority}
                                </span>
                                <span className="text-gray-400 text-sm">{req.timeAgo}</span>
                                <span className="text-gray-300 text-xs ml-auto md:ml-0 font-mono">{req.id}</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">{req.title}</h3>
                            <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-gray-600">
                                <span className="font-medium text-gray-800">Posted by: {req.postedBy}</span>
                                <span>•</span>
                                <span className="font-medium">{req.phone}</span>
                                <span>•</span>
                                <span>{req.location}</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm font-medium">
                                <span className={`flex items-center gap-1 ${req.distance <= 5 ? 'text-green-600' : 'text-gray-600'}`}>
                                    <MapPin className="w-4 h-4 opacity-70" /> {req.distance} KM Away
                                </span>
                                <span className="flex items-center gap-1 text-green-700 bg-green-50 px-2 py-0.5 rounded">
                                    <IndianRupee className="w-4 h-4" /> ₹{req.payment}
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-3 w-full md:w-auto mt-2 md:mt-0">
                            <button 
                                onClick={() => setActiveChat(req)}
                                className="flex-1 md:flex-none px-4 py-2.5 bg-white border border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 text-indigo-700 font-bold rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 whitespace-nowrap"
                            >
                                <MessageCircle className="w-4 h-4" />
                                Negotiate
                            </button>
                            <button className="flex-1 md:flex-none px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors shadow-sm whitespace-nowrap">
                                Accept Job
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
      </div>

      {/* Negotiation Chat Modal */}
      {activeChat && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col h-[600px] max-h-[90vh] animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="bg-indigo-600 p-4 text-white flex justify-between items-center shadow-md z-10">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                            {activeChat.postedBy.charAt(0)}
                        </div>
                        <div>
                            <h3 className="font-bold">{activeChat.postedBy}</h3>
                            <p className="text-indigo-200 text-xs truncate max-w-[200px]">Negotiating: {activeChat.title}</p>
                        </div>
                    </div>
                    <button onClick={() => setActiveChat(null)} className="p-2 hover:bg-indigo-500 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 bg-[#f0f2f5] flex flex-col gap-3 custom-scrollbar">
                    <div className="text-center text-xs text-gray-400 my-2 bg-gray-200/50 rounded-full px-3 py-1 self-center">
                        Today
                    </div>
                    
                    {/* Mock Client Message */}
                    <div className="self-start bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-2 max-w-[80%] shadow-sm">
                        <p className="text-sm text-gray-800">Hi! I posted the job for <strong>{activeChat.title}</strong> at {activeChat.location}. The offered price is ₹{activeChat.payment}. Are you available?</p>
                        <span className="text-[10px] text-gray-400 mt-1 block">10:00 AM</span>
                    </div>

                    {/* Mock My Message */}
                    <div className="self-end bg-[#e0f2fe] border border-blue-100 text-gray-900 rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%] shadow-sm">
                        <p className="text-sm">Hi! Yes, I can do this today. But since it's {activeChat.distance} KM away, would you consider raising it to ₹{activeChat.payment + 300} for travel?</p>
                        <span className="text-[10px] text-blue-400 mt-1 block text-right">10:05 AM</span>
                    </div>

                    {/* Dynamic messages added by user */}
                    {mockMessages.map(msg => (
                        <div key={msg.id} className="self-end bg-[#e0f2fe] border border-blue-100 text-gray-900 rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%] shadow-sm">
                            <p className="text-sm">{msg.text}</p>
                            <span className="text-[10px] text-blue-400 mt-1 block text-right">Just now</span>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-3 bg-[#f0f2f5]">
                    <form onSubmit={handleSendMessage} className="flex gap-2 bg-white rounded-full p-1.5 shadow-sm border border-gray-200">
                        <input 
                            type="text" 
                            placeholder="Type a message or offer..."
                            value={chatMessage}
                            onChange={(e) => setChatMessage(e.target.value)}
                            className="flex-1 bg-transparent px-4 text-sm outline-none"
                        />
                        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-full transition-colors flex shrink-0 items-center justify-center">
                            <Send className="w-4 h-4 ml-0.5" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
      )}
    </DashboardLayout>
  );
}
