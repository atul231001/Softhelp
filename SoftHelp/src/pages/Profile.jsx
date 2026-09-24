import DashboardLayout from '../layouts/DashboardLayout';
import { User, Mail, Phone, MapPin, Shield } from 'lucide-react';

export default function Profile() {
  const userData = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <DashboardLayout role={userData.role || 'OFFICE'}>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
            
            <div className="px-8 pb-8 relative">
                {/* Profile Picture */}
                <div className="absolute -top-16 left-8 h-32 w-32 rounded-full bg-white p-2">
                    <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-5xl font-bold border border-blue-200">
                        {userData?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-end pt-4 mb-8">
                    <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm">
                        Edit Profile
                    </button>
                </div>

                {/* Profile Details */}
                <div className="mt-2">
                    <h2 className="text-3xl font-bold text-gray-900">{userData.name || 'User Name'}</h2>
                    <p className="text-gray-500 font-medium flex items-center gap-2 mt-1">
                        <Shield className="w-4 h-4 text-blue-500" />
                        {userData.role === 'ENGINEER' ? 'IT Support Engineer' : 'Office User'} 
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full ml-2">Verified</span>
                    </p>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                            <Mail className="w-4 h-4" /> Email Address
                        </div>
                        <div className="font-semibold text-gray-900">{userData.email || 'email@example.com'}</div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                            <Phone className="w-4 h-4" /> Phone Number
                        </div>
                        <div className="font-semibold text-gray-900">{userData.phone || '+91 XXXXX XXXXX'}</div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 md:col-span-2">
                        <div className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                            <MapPin className="w-4 h-4" /> Location/Address
                        </div>
                        <div className="font-semibold text-gray-900">
                            {userData.role === 'ENGINEER' ? 'Not specified (Update your service area)' : 'Office Location Not Set'}
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
