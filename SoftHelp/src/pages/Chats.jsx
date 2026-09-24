import DashboardLayout from '../layouts/DashboardLayout';
import { useState } from 'react';
import { Search, Send, Phone, Video, MoreVertical, CheckCheck } from 'lucide-react';

const mockConversations = [
  { id: 1, name: "Amit Patel", role: "Engineer", lastMessage: "Yes, I can do this today.", time: "10:05 AM", unread: 2, online: true },
  { id: 2, name: "Rahul Sharma", role: "Client", lastMessage: "Can you send the invoice?", time: "Yesterday", unread: 0, online: false },
  { id: 3, name: "Suresh Kumar", role: "Engineer", lastMessage: "Thanks for the help!", time: "Monday", unread: 0, online: true },
  { id: 4, name: "Vikram Singh", role: "Client", lastMessage: "Location is Balaghat branch.", time: "Last week", unread: 0, online: false },
];

export default function Chats() {
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const role = userData.role || 'ENGINEER';
  
  const [activeChat, setActiveChat] = useState(mockConversations[0]);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "Hi, I saw your IT request.", sender: 'them', time: '10:00 AM' },
    { id: 2, text: "Are you available to fix it today?", sender: 'them', time: '10:01 AM' },
    { id: 3, text: "Yes, I can do this today.", sender: 'me', time: '10:05 AM' },
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setChatMessages([...chatMessages, { id: Date.now(), text: message, sender: 'me', time: 'Just now' }]);
    setMessage("");
  };

  return (
    <DashboardLayout role={role}>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 flex h-[calc(100vh-140px)] overflow-hidden">
        
        {/* Left Sidebar - Chat List */}
        <div className="w-full md:w-80 border-r border-gray-200 flex flex-col bg-gray-50/50 shrink-0">
          <div className="p-4 border-b border-gray-200 bg-white">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                  type="text" 
                  placeholder="Search chats..." 
                  className="w-full pl-9 pr-4 py-2 bg-gray-100 border-transparent rounded-xl text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {mockConversations.map(chat => (
              <div 
                key={chat.id} 
                onClick={() => setActiveChat(chat)}
                className={`p-4 border-b border-gray-100 cursor-pointer transition-colors flex gap-3 ${activeChat?.id === chat.id ? 'bg-indigo-50/70 border-l-4 border-l-indigo-600' : 'hover:bg-white border-l-4 border-l-transparent'}`}
              >
                <div className="relative shrink-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${activeChat?.id === chat.id ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                    {chat.name.charAt(0)}
                  </div>
                  {chat.online && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className={`font-bold text-sm truncate ${activeChat?.id === chat.id ? 'text-indigo-900' : 'text-gray-900'}`}>{chat.name}</h3>
                    <span className="text-[10px] text-gray-500 shrink-0">{chat.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
                </div>
                
                {chat.unread > 0 && (
                  <div className="shrink-0 flex flex-col justify-center">
                    <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{chat.unread}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Active Chat */}
        {activeChat ? (
          <div className="flex-1 flex flex-col bg-[#f0f2f5] min-w-0">
            {/* Chat Header */}
            <div className="h-16 px-6 bg-white border-b border-gray-200 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                  {activeChat.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 leading-tight">{activeChat.name}</h3>
                  <p className="text-xs text-green-600 font-medium">{activeChat.online ? 'Online' : 'Offline'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-400">
                <button className="hover:text-indigo-600 transition-colors"><Phone className="w-5 h-5" /></button>
                <button className="hover:text-indigo-600 transition-colors"><Video className="w-5 h-5" /></button>
                <button className="hover:text-gray-700 transition-colors"><MoreVertical className="w-5 h-5" /></button>
              </div>
            </div>
            
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              <div className="text-center text-xs text-gray-400 my-4 bg-gray-200/50 rounded-full px-3 py-1 self-center inline-block mx-auto">
                Negotiation Started
              </div>
              
              {chatMessages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] px-4 py-2 shadow-sm relative ${
                    msg.sender === 'me' 
                      ? 'bg-indigo-600 text-white rounded-2xl rounded-tr-sm' 
                      : 'bg-white text-gray-800 rounded-2xl rounded-tl-sm border border-gray-100'
                  }`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <div className={`text-[10px] mt-1 flex items-center justify-end gap-1 ${msg.sender === 'me' ? 'text-indigo-200' : 'text-gray-400'}`}>
                      {msg.time}
                      {msg.sender === 'me' && <CheckCheck className="w-3 h-3" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200 shrink-0">
              <form onSubmit={handleSend} className="flex gap-3 items-center">
                <input 
                  type="text" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..." 
                  className="flex-1 bg-gray-100 px-4 py-3 rounded-full text-sm outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 border border-transparent transition-all"
                />
                <button 
                  type="submit" 
                  disabled={!message.trim()}
                  className="bg-indigo-600 disabled:bg-gray-300 hover:bg-indigo-700 text-white w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors shadow-sm"
                >
                  <Send className="w-5 h-5 ml-1" />
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center text-gray-400">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-300" />
              </div>
              <p className="font-medium">Select a chat to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
